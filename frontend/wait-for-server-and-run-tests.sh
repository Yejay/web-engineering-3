#!/usr/bin/env bash

set -e

host="$1"
shift
cmd="$@"

until curl -s "$host" > /dev/null; do
    echo "Waiting for $host to start"
    sleep 5
done

>&2 echo "$host is up - executing command"
bash -c "$cmd"
