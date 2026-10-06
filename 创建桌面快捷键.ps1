$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktop = [Environment]::GetFolderPath('Desktop')
$powerShell = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
$shell = New-Object -ComObject WScript.Shell

$startShortcut = $shell.CreateShortcut((Join-Path $desktop '启动摩托车维修知识库.lnk'))
$startShortcut.TargetPath = $powerShell
$startShortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$(Join-Path $projectRoot '启动摩托车维修知识库.ps1')`""
$startShortcut.WorkingDirectory = $projectRoot
$startShortcut.IconLocation = "$env:SystemRoot\System32\imageres.dll,14"
$startShortcut.Description = '启动摩托车维修知识库并打开浏览器'
$startShortcut.Save()

$stopShortcut = $shell.CreateShortcut((Join-Path $desktop '停止摩托车维修知识库.lnk'))
$stopShortcut.TargetPath = $powerShell
$stopShortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$(Join-Path $projectRoot '停止摩托车维修知识库.ps1')`""
$stopShortcut.WorkingDirectory = $projectRoot
$stopShortcut.IconLocation = "$env:SystemRoot\System32\imageres.dll,93"
$stopShortcut.Description = '停止摩托车维修知识库本地服务'
$stopShortcut.Save()

Write-Output (Join-Path $desktop '启动摩托车维修知识库.lnk')
Write-Output (Join-Path $desktop '停止摩托车维修知识库.lnk')
