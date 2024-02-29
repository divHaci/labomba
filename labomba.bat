@echo off
echo Starting local server...
start cmd /k "npx http-server"
nativefier "localhost:8080" LaBomba