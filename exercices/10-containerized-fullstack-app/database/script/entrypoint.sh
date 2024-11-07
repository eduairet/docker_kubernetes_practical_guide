#!/bin/bash
set -e

if [ "$1" = '/opt/mssql/bin/sqlservr' ]; then
  if [ -f /tmp/app-initialized ]; then
  	rm -f /tmp/app-initialized
  fi

  if [ ! -f /tmp/app-initialized ]; then
    function initialize_app_database() {
      sleep 15s
      /opt/mssql-tools18/bin/sqlcmd -S database -U sa -P $MSSQL_SA_PASSWORD -d master -i /tmp/setup/init.sql -C
      touch /tmp/app-initialized
    }
    initialize_app_database &
  fi
fi

exec "$@"