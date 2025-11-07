@echo off
echo ============================================================
echo    Test Schedulers dengan Custom Time - Shopee Voucher
echo ============================================================
echo.

REM Input waktu dari user
set /p TIME_INPUT="Masukkan waktu target (19:59:59:700): "

if "%TIME_INPUT%"=="" (
    echo ❌ Waktu tidak boleh kosong!
    pause
    exit /b 1
)

echo.
echo 🕐 Waktu target yang diset: %TIME_INPUT%
echo.
echo Pilih mode test:
echo 1. Test Voucher 1 saja
echo 2. Test Voucher 2 saja  
echo 3. Test Voucher 3 saja
echo 4. Test semua voucher (bersamaan)
echo.
set /p CHOICE="Pilih (1-4): "

REM Set lokasi script
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"

echo [%date% %time%] Test Custom Time Started: %TIME_INPUT% >> test_custom_time.log

if "%CHOICE%"=="1" (
    echo 🎯 Testing Voucher 1 pada waktu %TIME_INPUT%...
    node voucher_1_scheduler.js --once --time=%TIME_INPUT%
) else if "%CHOICE%"=="2" (
    echo 🎯 Testing Voucher 2 pada waktu %TIME_INPUT%...
    node voucher_2_scheduler.js --once --time=%TIME_INPUT%
) else if "%CHOICE%"=="3" (
    echo 🎯 Testing Voucher 3 pada waktu %TIME_INPUT%...
    node voucher_3_scheduler.js --once --time=%TIME_INPUT%
) else if "%CHOICE%"=="4" (
    echo 🎯 Testing SEMUA Voucher pada waktu %TIME_INPUT%...
    echo.
    echo Memulai Voucher 1...
    start "Voucher 1 - Custom Time" node voucher_1_scheduler.js --once --time=%TIME_INPUT%
    
    timeout /t 1 /nobreak > nul
    
    echo Memulai Voucher 2...
    start "Voucher 2 - Custom Time" node voucher_2_scheduler.js --once --time=%TIME_INPUT%
    
    timeout /t 1 /nobreak > nul
    
    echo Memulai Voucher 3...
    start "Voucher 3 - Custom Time" node voucher_3_scheduler.js --once --time=%TIME_INPUT%

    timeout /t 1 /nobreak > nul
    echo Memulai Voucher 4...
    start "Voucher 4 - Custom Time" node voucher_4_scheduler.js --once --time=%TIME_INPUT%
    
    echo.
    echo ✅ Semua scheduler telah dimulai dengan waktu target: %TIME_INPUT%
    echo 📊 Cek log file individual untuk monitoring hasil.
) else (
    echo ❌ Pilihan tidak valid!
    pause
    exit /b 1
)

echo.
echo [%date% %time%] Test Custom Time Finished >> test_custom_time.log
echo ✅ Test selesai!
pause
