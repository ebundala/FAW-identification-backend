#APP = ${1?Error:App must be specified}

docker exec -it $1  /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"
