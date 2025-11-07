@echo off
echo Setting up time sync for "At log on any user"...

:: Path script utama
set SCRIPT_PATH=%~dp0sync_time_google.bat

:: Hapus task lama jika ada
schtasks /delete /tn "GoogleTimeSync" /f >nul 2>&1

echo Creating task with "At log on any user" trigger...

:: Buat task yang aktif saat ANY USER login + interval 5 menit
schtasks /create /tn "GoogleTimeSync" /tr "\"%SCRIPT_PATH%\"" /sc onlogon /ru "SYSTEM" /rl highest /f

if %errorlevel% neq 0 (
    echo ❌ Error: Gagal membuat task
    echo Pastikan script dijalankan sebagai Administrator
    pause
    exit /b 1
)

:: Set interval 5 menit setelah login
schtasks /change /tn "GoogleTimeSync" /ri 5 /du 9999:59

if %errorlevel% equ 0 (
    echo.
    echo ✅ SUCCESS! Task berhasil dibuat
    echo ✅ Trigger: At log on ANY USER
    echo ✅ Sinkronisasi setiap 5 menit setelah login
    echo ✅ User: SYSTEM (privilege tinggi)
    echo.
    echo 📊 DETAIL TASK:
    echo    └─ Nama: GoogleTimeSync
    echo    └─ Trigger: Saat user manapun login
    echo    └─ Interval: Setiap 5 menit
    echo    └─ Script: %SCRIPT_PATH%
    echo    └─ Log: %~dp0time_sync.log
    echo.
    echo 🔧 PERINTAH BERGUNA:
    echo    └─ Lihat status: schtasks /query /tn "GoogleTimeSync"
    echo    └─ Jalankan manual: schtasks /run /tn "GoogleTimeSync"
    echo    └─ Hapus task: schtasks /delete /tn "GoogleTimeSync" /f
    echo.
    echo ℹ️  CATATAN:
    echo    └─ Task akan aktif saat user login (siapa saja)
    echo    └─ Sinkronisasi dimulai dan berulang setiap 5 menit
    echo    └─ Cek log file untuk monitoring aktivitas
) else (
    echo ❌ Error: Gagal mengatur interval task
)

echo.
echo Testing task now...
schtasks /run /tn "GoogleTimeSync"

echo.
pause