$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$libraryRoot = Join-Path $PSScriptRoot '品牌官方公开资料'
$qjRoot = Join-Path $libraryRoot '钱江_QJMOTOR\官方RMI维修手册'
$apiRoot = 'https://api-rmi.qjmotorlink.com/rmi-gateway/sea-rmi-center/internal/model'

function Test-PdfFile([string]$path) {
    if (-not (Test-Path -LiteralPath $path)) { return $false }
    if ((Get-Item -LiteralPath $path).Length -lt 1024) { return $false }
    $stream = [System.IO.File]::OpenRead($path)
    try {
        $bytes = New-Object byte[] 4
        [void]$stream.Read($bytes, 0, 4)
        return ([System.Text.Encoding]::ASCII.GetString($bytes) -eq '%PDF')
    } finally {
        $stream.Dispose()
    }
}

function Save-OfficialPdf([string]$url, [string]$target) {
    $folder = Split-Path -Parent $target
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    if (Test-PdfFile $target) {
        Write-Host "[跳过-已有效] $target"
        return
    }

    if (Test-Path -LiteralPath $target) {
        Remove-Item -LiteralPath $target -Force
    }
    $partial = "$target.part"
    & curl.exe --location --fail --continue-at - --retry 15 --retry-all-errors --retry-delay 2 --connect-timeout 20 --speed-time 45 --speed-limit 1024 --silent --show-error --output $partial $url
    if ($LASTEXITCODE -ne 0) { throw "curl 下载失败，退出码 $LASTEXITCODE" }
    if (-not (Test-PdfFile $partial)) { throw "下载结果不是有效 PDF：$target" }
    Move-Item -LiteralPath $partial -Destination $target -Force
    $sizeMb = [math]::Round((Get-Item -LiteralPath $target).Length / 1MB, 2)
    Write-Host "[完成] $target ($sizeMb MB)"
}

# QJMOTOR 官方 RMI：枚举当前公开的巡航和踏板车型，只下载 Maintenance/Workshop/Service manual。
$typeFolders = @{
    Cruiser = '巡航'
    Scooter = '踏板'
}

$qjCount = 0
foreach ($type in $typeFolders.Keys) {
    $models = (Invoke-RestMethod -Uri "$apiRoot/findModelByTypes?type=$type").data
    foreach ($model in $models) {
        $modelEncoded = [uri]::EscapeDataString($model)
        $figures = (Invoke-RestMethod -Uri "$apiRoot/findFigureByModel?model=$modelEncoded").data
        foreach ($figure in $figures) {
            $request = @{
                figure   = $figure
                vin      = $null
                language = 'en'
                pageSize = 50
                pageNum  = 1
            } | ConvertTo-Json
            $resources = (Invoke-RestMethod -Method Post -Uri "$apiRoot/findFilePageByFigure" -ContentType 'application/json' -Body $request).data.resource
            $manualResources = $resources |
                Where-Object { $_.fileName -match '(?i)maintenance|workshop|service' -and $_.fileName -notmatch '(?i)user' } |
                Select-Object -First 1
            foreach ($resource in $manualResources) {
                $safeModel = $model -replace '[^A-Za-z0-9_-]', '_'
                $safeFigure = $figure -replace '[^A-Za-z0-9_-]', '_'
                $fileName = "${safeModel}_${safeFigure}_官方维修手册_英文.pdf"
                $target = Join-Path (Join-Path $qjRoot $typeFolders[$type]) $fileName
                Save-OfficialPdf -url $resource.filePath -target $target
                $qjCount++
            }
        }
    }
}

# 升仕官网新增公开的 ZT703-T 维修保养手册。
$zontesTarget = Join-Path $libraryRoot '升仕_ZONTES\ADV_维修手册\703T_2026维修保养手册.pdf'
Save-OfficialPdf -url 'https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260209085022163.pdf' -target $zontesTarget

Write-Host "完成：钱江 RMI 维修手册 $qjCount 份；升仕新增手册 1 份。"
