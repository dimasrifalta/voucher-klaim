@echo off
setlocal
set "TASKNAME=Sync Google Time (10min)"

echo [1/3] Mengaktifkan Windows Time service & set server ke time.google.com...
net start w32time >nul 2>&1
w32tm /config /manualpeerlist:"time.google.com" /syncfromflags:manual /update >nul 2>&1

echo [2/3] Sinkronisasi awal...
w32tm /resync >nul 2>&1

echo [3/3] Mendaftarkan Scheduled Task (tiap 10 menit, run as SYSTEM, no window)...
schtasks /create ^
  /tn "%TASKNAME%" ^
  /sc minute /mo 10 ^
  /ru "SYSTEM" ^
  /rl HIGHEST ^
  /tr "cmd /c net start w32time ^>nul 2^>^&1 && w32tm /resync ^>nul 2^>^&1" ^
  /f

echo.
echo Selesai. Task terpasang: %TASKNAME%
echo Cek detail: schtasks /query /tn "%TASKNAME%" /v /fo list
endlocal
