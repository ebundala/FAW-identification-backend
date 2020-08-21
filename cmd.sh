#!/usr/bin/env bash
CMD=${1?Error: no command given}
APP=${2:-faw-identification-backend_app_1}
    case $CMD in 
    'deploy')
      chmod +x ./scripts/*.sh
     ./scripts/deploy.sh
     chmod +x cmd.sh
     chmod +x ./scripts/*.sh
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
    'services')
    cp ./scripts/services/*.service /etc/systemd/system/
    ;;
    'webhook-start')
     service webhookd start
    ;;
    'webhook-restart')
     service webhookd stop
     service webhookd start
    ;;
    'webhook-status')
     service webhookd status
    ;;
    'webhook-stop')
     service webhookd stop
    ;;
    *)
     echo "no command found"
    ;;
   esac
   
