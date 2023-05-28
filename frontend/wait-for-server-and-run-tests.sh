#!/usr/bin/env bash

set -e

host="$1"
shift
cmd="$@"

until curl -s "$host" > /dev/null; do
    echo "Waiting for $host to start"
    sleep 1
done

>&2 echo "$host is up - executing command"
exec $cmd
