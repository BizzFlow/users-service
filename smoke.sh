#!/bin/bash
#
#
# e2e.sh - API endpoints
#
# Author: 	Rodrigo Alvares de Souza
# 					rsouza01@gmail.com
#
#
# History:
# Version 0.1: 2021/01/14 (rsouza01) - First version
#


#FUNCTIONS DEFINITIONS

print2stringslncolor () {
        echo -e "\e[0m$1\e[1;34m$2\e[0m\n"
}


print2stringslncolorERROR () {
        echo -e "\e[0m$1\e[1;91m$2\e[0m\n"
}

printlncolor () {
        echo -e "\e[1;34m$1\e[0m\n"
}

printlncolorERROR () {
        echo -e "\e[1;91m$1\e[0m\n"
}
#END FUNCTIONS DEFINITIONS

#MAIN PROGRAM

USE_MESSAGE="
Usage: $(basename "$0") [OPTION]

OPTIONS:
  -l, --local          Run tests against 'localhost'.
  -e, --external       Run tests against external address.

  -h, --help           Show this help screen and exits
  -V, --version        Show program version and exits
"

_VERSION=$(grep '^# Version ' "$0" | tail -1 | cut -d : -f 1 | tr -d \#)

_API_ADDRESS=""

#Command line arguments
while test -n "$1"
do
        case "$1" in

		-l | --local)
                        shift
                        _API_ADDRESS="localhost:3000"
                ;;

		-e | --external)
                        shift
                        _API_ADDRESS="localhost:3000"
                ;;

		-h | --help)
			echo "$USE_MESSAGE"
			exit 0
		;;

		-V | --version)
			echo -n $(basename "$0")
                        echo " ${_VERSION}"
			exit 0
		;;

		*)
			echo Invalid option: $1
			exit 1
		;;
	esac

	shift
done

if [ -z "$_API_ADDRESS" ]
then
	_API_ADDRESS="localhost:3000"
#     _API_ADDRESS="https://rsouza01-bizzflow-users-service-vw655pw2w4j6-3000.githubpreview.dev"
fi

clear

printlncolor "\n\n________________________________________"
printlncolor "Command line tester  ${_VERSION} --------------"
printlncolor '------------------------------------------------'

printlncolor "Tests will be performed against '${_API_ADDRESS}'."

printlncolor "Checking for cURL installation."

if ! [ -x "$(command -v curl)" ]; then
  printlncolorERROR 'Error: cUrl is not installed. Please install and run this script again.' >&2
  exit 1
else
  printlncolor 'cURL installed..'
fi

printlncolor "Starting the tests."

# apiVersion='v1'
apiVersion=''

# endpoint='health'
# printlncolor '----------------------------------------------------------------------------------------------------------'
# printlncolor "/health"
# printlncolor "Endpoint: ${_API_ADDRESS}/${apiVersion}/${endpoint}"
# printlncolor "Expected HTTP STATUS: 200 (OK)"
# printlncolor '----------------------------------------------------------------------------------------------------------'
# curl -i -H "Content-Type: application/json" -X GET ${_API_ADDRESS}/${apiVersion}/${endpoint}
# echo


endpoint='user'
printlncolor '------------------------------------------------'
printlncolor $endpoint
printlncolor "Endpoint: ${_API_ADDRESS}/${endpoint}"
printlncolor "Expected HTTP STATUS: 200 (OK)"
printlncolor '------------------------------------------------'
curl -i -H "Content-Type: application/json" -X POST ${_API_ADDRESS}/${endpoint} -d '{"name":"user1", "password":"password_user_1"}'
echo

printlncolor '------------------------------------------------'
printlncolor $endpoint
printlncolor "Endpoint: ${_API_ADDRESS}/${endpoint}"
printlncolor "Expected HTTP STATUS: 200 (OK)"
printlncolor '------------------------------------------------'
curl -i -H "Content-Type: application/json" -X GET ${_API_ADDRESS}/${endpoint}
echo


endpoint='login'
printlncolor '------------------------------------------------'
printlncolor $endpoint
printlncolor "Endpoint: ${_API_ADDRESS}/${endpoint}"
printlncolor "Expected HTTP STATUS: 200 (OK)"
printlncolor '------------------------------------------------'
curl -i -H "Content-Type: application/json" -X POST ${_API_ADDRESS}/${endpoint} -d '{"name":"user1", "password":"password_user_1"}'
echo


echo





echo
printlncolor "Done."
exit 0

