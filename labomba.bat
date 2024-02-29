@echo off
echo Starting local server...
start cmd /k "npx http-server"
start "" "http://localhost:8080"