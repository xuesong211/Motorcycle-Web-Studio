param(
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$webRoot = Join-Path $projectRoot 'webapp'
$runtimeRoot = Join-Path $webRoot '.runtime'
$stdoutLog = Join-Path $runtimeRoot 'server.log'
$stderrLog = Join-Path $runtimeRoot 'server-error.log'
$pidFile = Join-Path $runtimeRoot 'server.pid'
$url = 'http://127.0.0.1:45000/'
$expectedMarker = '摩托车维修知识库'

function Get-ExpectedSite {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 2
    return ($response.StatusCode -eq 200 -and $response.Content.Contains($expectedMarker))
  } catch {
    return $false
  }
}

function Get-ListenerPid {
  foreach ($line in (netstat -ano -p tcp)) {
    if ($line -match '^\s*TCP\s+127\.0\.0\.1:45000\s+\S+\s+LISTENING\s+(\d+)\s*$') {
      return [int]$Matches[1]
    }
  }
  return $null
}

function Show-LaunchError([string]$message) {
  Add-Type -AssemblyName System.Windows.Forms
  [System.Windows.Forms.MessageBox]::Show(
    $message,
    '摩托车维修知识库',
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Error
  ) | Out-Null
}

if (Get-ExpectedSite) {
  if (-not $NoBrowser) { Start-Process $url }
  exit 0
}

$occupiedPid = Get-ListenerPid
if ($occupiedPid) {
  Show-LaunchError "端口 45000 已被其他程序占用。请先关闭占用程序，再重新双击快捷方式。"
  exit 1
}

if (-not (Test-Path -LiteralPath $webRoot)) {
  Show-LaunchError "找不到 Web 项目目录：$webRoot"
  exit 1
}

New-Item -ItemType Directory -Path $runtimeRoot -Force | Out-Null

if (-not (Test-Path -LiteralPath (Join-Path $webRoot 'node_modules'))) {
  $install = Start-Process -FilePath 'npm.cmd' -ArgumentList @('install') -WorkingDirectory $webRoot -WindowStyle Hidden -Wait -PassThru
  if ($install.ExitCode -ne 0) {
    Show-LaunchError '依赖安装失败。请在 webapp 目录执行 npm install 查看错误。'
    exit 1
  }
}

$process = Start-Process -FilePath 'cmd.exe' `
  -ArgumentList @('/d', '/c', 'npm.cmd run dev') `
  -WorkingDirectory $webRoot `
  -WindowStyle Hidden `
  -RedirectStandardOutput $stdoutLog `
  -RedirectStandardError $stderrLog `
  -PassThru

Set-Content -LiteralPath $pidFile -Value $process.Id -Encoding ascii

$ready = $false
for ($attempt = 0; $attempt -lt 90; $attempt++) {
  Start-Sleep -Milliseconds 500
  if (Get-ExpectedSite) {
    $ready = $true
    break
  }
  if ($process.HasExited) { break }
}

if (-not $ready) {
  $details = if (Test-Path -LiteralPath $stderrLog) { Get-Content -LiteralPath $stderrLog -Tail 12 | Out-String } else { '' }
  Show-LaunchError "服务启动失败。日志位置：$stderrLog`r`n`r`n$details"
  exit 1
}

if (-not $NoBrowser) { Start-Process $url }
