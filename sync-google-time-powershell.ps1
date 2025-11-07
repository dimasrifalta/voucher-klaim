# Jalankan sebagai Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "ERROR: Script harus dijalankan sebagai Administrator" -ForegroundColor Red
    pause
    exit 1
}

$TaskName = "Sync Google Time (1min)"

Write-Host "[1/4] Konfigurasi Windows Time service..." -ForegroundColor Green
try {
    Set-Service -Name w32time -StartupType Automatic -ErrorAction Stop
    Start-Service -Name w32time -ErrorAction SilentlyContinue
    & w32tm /config /manualpeerlist:"time.google.com,0x1" /syncfromflags:manual /reliable:yes /update
    Write-Host "✅ Windows Time service dikonfigurasi" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Warning: Gagal mengkonfigurasi service: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "[2/4] Sinkronisasi awal..." -ForegroundColor Green
try {
    & w32tm /resync /force
    Write-Host "✅ Sinkronisasi berhasil" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Warning: Sinkronisasi gagal" -ForegroundColor Yellow
}

Write-Host "[3/4] Menghapus task lama..." -ForegroundColor Green
try {
    # Hapus berbagai versi task lama
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue
    Unregister-ScheduledTask -TaskName "Sync Google Time (5min)" -Confirm:$false -ErrorAction SilentlyContinue
    Unregister-ScheduledTask -TaskName "Sync Google Time (10sec)" -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "✅ Task lama dihapus (jika ada)" -ForegroundColor Green
} catch {
    # Ignore error jika task tidak ada
}

Write-Host "[4/4] Membuat Scheduled Task..." -ForegroundColor Green

try {
    # Create action
    $Action = New-ScheduledTaskAction -Execute "w32tm.exe" -Argument "/resync /force"

    # Create trigger 1 - at startup
    $TriggerStartup = New-ScheduledTaskTrigger -AtStartup
    
    # Create trigger 2 - daily, repeat every 1 minute for 24 hours
    $TriggerDaily = New-ScheduledTaskTrigger -Daily -At "00:00"
    $TriggerDaily.Repetition = (New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 1) -RepetitionDuration (New-TimeSpan -Hours 23 -Minutes 59)).Repetition

    # Combine triggers
    $Triggers = @($TriggerStartup, $TriggerDaily)

    # Create settings
    $Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RunOnlyIfNetworkAvailable -MultipleInstances IgnoreNew

    # Create principal (run as SYSTEM)
    $Principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest

    # Register the task
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Triggers -Settings $Settings -Principal $Principal -Force

    Write-Host ""
    Write-Host "✅ BERHASIL! Task '$TaskName' telah dibuat." -ForegroundColor Green
    Write-Host "📅 Mulai saat startup Windows" -ForegroundColor Yellow
    Write-Host "⏰ Berjalan setiap 1 MENIT sepanjang hari" -ForegroundColor Yellow
    Write-Host "🔒 Running sebagai SYSTEM dengan privilese tertinggi" -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ Error saat membuat task dengan metode PowerShell: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Mencoba metode alternatif dengan schtasks..." -ForegroundColor Yellow
    
    # Method alternatif menggunakan schtasks
    try {
        # Hapus task jika ada
        & schtasks /delete /tn "$TaskName" /f 2>$null
        
        # Buat task baru dengan schtasks
        & schtasks /create /tn "$TaskName" /tr "w32tm.exe /resync /force" /sc minute /mo 1 /ru "SYSTEM" /rl HIGHEST /f
        
        Write-Host "✅ BERHASIL dengan metode schtasks!" -ForegroundColor Green
        
    } catch {
        Write-Host "❌ Gagal total: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test task
Write-Host ""
Write-Host "Testing task..." -ForegroundColor Green
try {
    Start-ScheduledTask -TaskName $TaskName -ErrorAction Stop
    Write-Host "✅ Task berhasil dijalankan untuk testing." -ForegroundColor Green
} catch {
    Write-Host "⚠️ Tidak bisa test task, tapi kemungkinan sudah terbuat." -ForegroundColor Yellow
}

# Show task info
Write-Host ""
Write-Host "=== INFORMASI TASK ===" -ForegroundColor Cyan
try {
    $Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction Stop
    Write-Host "Status: $($Task.State)" -ForegroundColor White
    Write-Host "Next Run: $((Get-ScheduledTask -TaskName $TaskName | Get-ScheduledTaskInfo).NextRunTime)" -ForegroundColor White
} catch {
    Write-Host "Tidak bisa mengambil info task" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== COMMANDS BERGUNA ===" -ForegroundColor Cyan
Write-Host "Cek status task:" -ForegroundColor Gray
Write-Host "  Get-ScheduledTask -TaskName '$TaskName'" -ForegroundColor White
Write-Host "Jalankan manual:" -ForegroundColor Gray
Write-Host "  Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor White
Write-Host "Hapus task:" -ForegroundColor Gray
Write-Host "  Unregister-ScheduledTask -TaskName '$TaskName'" -ForegroundColor White

Write-Host ""
Write-Host "Tekan Enter untuk menutup..." -ForegroundColor Gray
Read-Host