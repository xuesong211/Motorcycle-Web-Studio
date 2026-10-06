$ErrorActionPreference = 'Stop'

$python = 'C:\Users\18811\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$script = Join-Path $PSScriptRoot '提取官方维修手册文本.py'

if (-not (Test-Path -LiteralPath $python)) {
    $python = (Get-Command python -ErrorAction Stop).Source
}

& $python $script
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

