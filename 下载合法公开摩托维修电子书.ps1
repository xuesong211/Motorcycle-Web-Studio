$ErrorActionPreference = 'Continue'
$ProgressPreference = 'SilentlyContinue'

Add-Type -AssemblyName System.IO.Compression.FileSystem

$outRoot = Join-Path $PSScriptRoot '摩托车维修电子书_EPUB'

$books = @(
    @{ File='01_摩托车实修_TM9-879_Harley-Davidson_WLA_操作保养小修.epub'; Id=51058; Url='https://github.com/GITenberg/Motorcycle-Solo-Harley-Davidson-Model-WLA_51058/releases/download/0.1.0/book.epub' },
    @{ File='02_二冲程与汽油机原理_The_Petrol_Engine.epub'; Id=55403; Url='https://github.com/GITenberg/The-Petrol-Engine-A-Text-book-dealing-with-the-Principles-of-Design-and-Construction-with-a-S__55403/releases/download/0.1.0/book.epub' },
    @{ File='03_汽油机结构与维修_The_Gasoline_Motor.epub'; Id=45932; Url='https://github.com/GITenberg/The-Gasoline-Motor_45932/releases/download/0.1.0/book.epub' },
    @{ File='04_两冲程_化油器_点火_故障定位_Motor-car_Principles.epub'; Id=70194; Url='https://github.com/GITenberg/Motor-car-principles-the-gasoline-automobile_70194/releases/download/0.1.0/book.epub' },
    @{ File='05_发动机大修与故障诊断_The_Automobile_Owners_Guide.epub'; Id=69375; Url='https://github.com/GITenberg/The-automobile-owner-s-guide_69375/releases/download/0.1.0/book.epub' },
    @{ File='06_两冲程四冲程与化油器_Motors.epub'; Id=42369; Url='https://github.com/GITenberg/Motors_42369/releases/download/0.1.0/book.epub' },
    @{ File='07_汽油机运行与故障问答_Farm_Engines_and_How_to_Run_Them.epub'; Id=43867; Url='https://github.com/GITenberg/Farm-Engines-and-How-to-Run-ThemThe-Young-Engineer-s-Guide_43867/releases/download/0.1.0/book.epub' },
    @{ File='08_内燃机入门_Gas_and_Oil_Engines_Simply_Explained.epub'; Id=27286; Url='https://github.com/GITenberg/Gas-and-Oil-Engines-Simply-ExplainedAn-Elementary-Instruction-Book-for-Amateurs-and-Engine-At__27286/releases/download/0.1.0/book.epub' },
    @{ File='09_发动机结构运行与修理_Practical_Hand_Book_of_Engines.epub'; Id=56776; Url='https://github.com/GITenberg/Practical-Hand-Book-of-Gas-Oil-and-Steam-Engines-Stationary-Marine-Traction-Gas-Burners-Oil-B__56776/releases/download/0.1.0/book.epub' },
    @{ File='10_燃油发动机维护_Gas_and_Petroleum_Engines.epub'; Id=59311; Url='https://github.com/GITenberg/Gas-and-Petroleum-Engines_59311/releases/download/0.1.0/book.epub' }
)

New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

function Test-Epub([string]$path) {
    if (-not (Test-Path -LiteralPath $path)) { return $false }
    if ((Get-Item -LiteralPath $path).Length -lt 1024) { return $false }
    try {
        $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
        try {
            $names = $zip.Entries.FullName
            return (($names -contains 'mimetype') -and ($names -contains 'META-INF/container.xml'))
        } finally {
            $zip.Dispose()
        }
    } catch {
        return $false
    }
}

$ok = 0
$failed = 0
foreach ($book in $books) {
    $target = Join-Path $outRoot $book.File
    $partial = "$target.part"
    if (Test-Epub $target) {
        Write-Host "[跳过-已有效] $($book.File)"
        $ok++
        continue
    }

    # 只让同一下载源产生的 .part 文件参与续传，避免把不同版本的 EPUB 拼在一起。
    if (Test-Path -LiteralPath $target) {
        Remove-Item -LiteralPath $target -Force
    }

    try {
        & curl.exe --location --fail --continue-at - --retry 20 --retry-all-errors --retry-delay 2 --connect-timeout 20 --speed-time 45 --speed-limit 1024 --silent --show-error --output $partial $book.Url
        if ($LASTEXITCODE -ne 0) { throw "curl 下载失败，退出码 $LASTEXITCODE" }
        if (-not (Test-Epub $partial)) { throw '下载结果不是有效 EPUB' }
        Move-Item -LiteralPath $partial -Destination $target -Force
        $sizeMb = [math]::Round((Get-Item -LiteralPath $target).Length / 1MB, 2)
        Write-Host "[完成] $($book.File) ($sizeMb MB)"
        $ok++
    } catch {
        Write-Warning "[失败] $($book.File) :: $($_.Exception.Message)"
        $failed++
    }
}

Write-Host "下载完成：有效 $ok 本，失败 $failed 本，计划总数 $($books.Count) 本。"
if ($failed -gt 0) { exit 1 }
