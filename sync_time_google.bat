@echo off
setlocal enabledelayedexpansion

:: Script untuk sinkronisasi jam Windows dengan time.google.com
:: Dibuat untuk dijalankan setiap 5 menit via Task Scheduler

echo [%date% %time%] Memulai sinkronisasi waktu dengan time.google.com...

:: Log file untuk tracking
set LOG_FILE=%~dp0time_sync.log
echo [%date% %time%] Starting time synchronization >> "%LOG_FILE%"

:: Menggunakan PowerShell untuk mendapatkan waktu dari Google
powershell -Command "try { $response = Invoke-WebRequest -Uri 'https://time.google.com' -UseBasicParsing -TimeoutSec 10; $date_header = $response.Headers['Date']; if ($date_header) { $google_time = [DateTime]::ParseExact($date_header, 'ddd, dd MMM yyyy HH:mm:ss GMT', $null, [System.Globalization.DateTimeStyles]::AssumeUniversal); $local_time = $google_time.ToLocalTime(); $formatted_time = $local_time.ToString('HH:mm:ss'); $formatted_date = $local_time.ToString('MM/dd/yyyy'); Write-Output \"TIME:$formatted_time\"; Write-Output \"DATE:$formatted_date\"; } else { Write-Output \"ERROR: No date header found\"; exit 1; } } catch { Write-Output \"ERROR: $($_.Exception.Message)\"; exit 1; }" > temp_time.txt

:: Cek jika ada error
if %errorlevel% neq 0 (
    echo [%date% %time%] Error: Gagal mendapatkan waktu dari Google >> "%LOG_FILE%"
    echo Error: Gagal mendapatkan waktu dari Google
    del temp_time.txt 2>nul
    goto :end
)

:: Parse hasil dari PowerShell
for /f "tokens=1,2 delims=:" %%a in (temp_time.txt) do (
    if "%%a"=="TIME" set NEW_TIME=%%b
    if "%%a"=="DATE" set NEW_DATE=%%b
    if "%%a"=="ERROR" (
        echo [%date% %time%] Error: %%b >> "%LOG_FILE%"
        echo Error: %%b
        del temp_time.txt 2>nul
        goto :end
    )
)

:: Cleanup temporary file
del temp_time.txt 2>nul

:: Validasi data yang didapat
if "!NEW_TIME!"=="" (
    echo [%date% %time%] Error: Waktu tidak valid >> "%LOG_FILE%"
    echo Error: Waktu tidak valid
    goto :end
)

if "!NEW_DATE!"=="" (
    echo [%date% %time%] Error: Tanggal tidak valid >> "%LOG_FILE%"
    echo Error: Tanggal tidak valid
    goto :end
)

:: Tampilkan waktu saat ini dan waktu baru
echo Waktu saat ini: %date% %time%
echo Waktu dari Google: !NEW_DATE! !NEW_TIME!

:: Set tanggal dan waktu baru
echo [%date% %time%] Setting new time: !NEW_DATE! !NEW_TIME! >> "%LOG_FILE%"

:: Set tanggal
date !NEW_DATE! >nul 2>&1
if %errorlevel% neq 0 (
    echo [%date% %time%] Error: Gagal mengatur tanggal >> "%LOG_FILE%"
    echo Error: Gagal mengatur tanggal
    goto :end
)

:: Set waktu
time !NEW_TIME! >nul 2>&1
if %errorlevel% neq 0 (
    echo [%date% %time%] Error: Gagal mengatur waktu >> "%LOG_FILE%"
    echo Error: Gagal mengatur waktu
    goto :end
)

echo [%date% %time%] Sinkronisasi berhasil! >> "%LOG_FILE%"
echo Sinkronisasi berhasil! Waktu telah diperbarui.

:end
echo [%date% %time%] Time sync process completed >> "%LOG_FILE%"
echo.