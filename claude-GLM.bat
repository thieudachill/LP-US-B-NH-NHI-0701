@echo off
TITLE Claude Code - Z.AI (GLM)

REM --- Z.AI (GLM) CONFIG ---

REM 1. Disable Foundry Mode
SET CLAUDE_CODE_USE_FOUNDRY=0
SET ANTHROPIC_FOUNDRY_RESOURCE=
SET ANTHROPIC_FOUNDRY_API_KEY=

REM 2. Set Z.AI Endpoints (REPLACE API KEY)
SET ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic
SET ANTHROPIC_AUTH_TOKEN=849d38993c8b483f9bc6002d3cb3dfe0.vkFkDFtfJdQHgdfL

REM 3. Map Models to GLM Versions
SET ANTHROPIC_DEFAULT_SONNET_MODEL=glm-4.6
SET ANTHROPIC_DEFAULT_OPUS_MODEL=glm-4.6
SET ANTHROPIC_DEFAULT_HAIKU_MODEL=glm-4.6

REM Launch a new PowerShell window with these settings
start powershell -NoExit -Command "cls; Write-Host '🚀 Mode: Z.AI (GLM-4.6)' -ForegroundColor Cyan; claude"