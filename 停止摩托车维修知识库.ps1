$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = if ($env:MOTORCYCLE_KB_PORT) { [int]$env:MOTORCYCLE_KB_PORT } else { 45000 }
$runtimeRoot = Join-Path $projectRoot 'webapp\.runtime'
$pidFile = Join-Path $runtimeRoot 'server.pid'
$url = "http://127.0.0.1:$port/"

function Get-ListenerPid {
  $escapedPort = [regex]::Escape([string]$port)
  foreach ($line in (netstat -ano -p tcp)) {
    if ($line -match "^\s*TCP\s+127\.0\.0\.1:$escapedPort\s+\S+\s+LISTENING\s+(\d+)\s*$") {
      return [int]$Matches[1]
    }
  }
  return $null
}

$isExpectedSite = $false
try {
  $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 2
  $isExpectedSite = $response.StatusCode -eq 200 -and $response.Content.Contains('摩托车维修知识库')
} catch {}

if (-not $isExpectedSite) {
  Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
  exit 0
}

$listenerPid = Get-ListenerPid
if (-not $listenerPid) { exit 0 }

$serverProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$listenerPid"
$expectedPath = [regex]::Escape((Join-Path $projectRoot 'webapp'))
if (-not $serverProcess -or $serverProcess.CommandLine -notmatch 'vinext' -or $serverProcess.CommandLine -notmatch $expectedPath) {
  throw "为避免误停其他程序，未结束无法确认身份的 $port 端口进程。"
}

$allProcesses = @(Get-CimInstance Win32_Process)
$rootPid = $listenerPid
if (Test-Path -LiteralPath $pidFile) {
  $candidateRoot = [int](Get-Content -LiteralPath $pidFile -Raw)
  if ($allProcesses.ProcessId -contains $candidateRoot) {
    $rootPid = $candidateRoot
  }
}

$tree = [System.Collections.Generic.List[int]]::new()
$queue = [System.Collections.Generic.Queue[int]]::new()
$queue.Enqueue($rootPid)
while ($queue.Count -gt 0) {
  $currentPid = $queue.Dequeue()
  $tree.Add($currentPid)
  foreach ($child in ($allProcesses | Where-Object { $_.ParentProcessId -eq $currentPid })) {
    $queue.Enqueue([int]$child.ProcessId)
  }
}

for ($index = $tree.Count - 1; $index -ge 0; $index--) {
  Stop-Process -Id $tree[$index] -Force -ErrorAction SilentlyContinue
}

if (Test-Path -LiteralPath $pidFile) {
  Remove-Item -LiteralPath $pidFile -Force
}
