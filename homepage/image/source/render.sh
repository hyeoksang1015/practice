#!/usr/bin/env bash
# kmong.html 의 각 화면을 2배 해상도 PNG 로 ../ 에 저장한다. 사용법: bash render.sh
set -euo pipefail
cd "$(dirname "$0")"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
[ -x "$EDGE" ] || EDGE="/c/Program Files/Microsoft/Edge/Application/msedge.exe"
URL="file:///$(cygpath -m "$PWD")/kmong.html"
PROFILE="$(mktemp -d)"
names=(main p1 p2 p3 p4 p5)
files=(00_main 01_service-intro 02_tech-stack 03_services 04_process 05_portfolio)
for i in "${!names[@]}"; do
  id=${names[$i]}
  h=$("$EDGE" --headless=new --user-data-dir="$PROFILE" --window-size=652,1000 --virtual-time-budget=3000 --dump-dom "$URL#$id" 2>/dev/null | grep -o 'data-h="[0-9]*"' | grep -o '[0-9]*')
  [ -n "$h" ] || { echo "높이를 못 읽음: $id" >&2; exit 1; }
  "$EDGE" --headless=new --user-data-dir="$PROFILE" --hide-scrollbars --force-device-scale-factor=2 --window-size=652,"$h" --virtual-time-budget=3000 --screenshot="$(cygpath -w "$PWD/../${files[$i]}.png")" "$URL#$id" 2>/dev/null
  echo "${files[$i]}.png  652x$h (저장 1304x$((h*2)))"
done
