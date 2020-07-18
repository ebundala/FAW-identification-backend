#!/usr/bin/env bash
CMD=${1?Error: no command given}
APP=${2:-faw-identification-backend_app_1}
    case $CMD in 
    'deploy')
     ./scripts/deploy.sh
     ./scripts/restart.sh
    ;;   
    'up')
    echo $CMD
    ./scripts/up.sh
    ;; 
     'down')
    echo $CMD
    ./scripts/down.sh
    ;;  
     'restart')
    echo $CMD
    ./scripts/restart.sh
    ;;  
     'shell')
      echo $CMD
      ./scripts/shell.sh "$APP"
    ;;
    'log')
    ./scripts/logs.sh "$APP"
    ;;
    *)
     echo "no command found"
    ;;
   esac
   
