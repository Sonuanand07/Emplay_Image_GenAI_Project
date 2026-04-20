@echo off
set LOCALAPPDATA=D:\DockerTemp\AppData\Local
set TEMP=D:\DockerTemp
set TMP=D:\DockerTemp
mkdir "%LOCALAPPDATA%\Docker\log\host" 2>nul
"D:\Docker Desktop Installer.exe" /INSTALLDIR="D:\Docker" /QUIET /NOCANCEL /ALLUSERS /MERGETASKS="dockerdesktopvm\wsl2vm"
echo Installation complete. Open with start "Docker Desktop"
pause
