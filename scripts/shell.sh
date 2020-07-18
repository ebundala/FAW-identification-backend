#!/usr/bin/env bash

docker exec -it $1  /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
