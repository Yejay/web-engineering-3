#!/usr/bin/env bash

set -e

host="$1"
shift
cmd="$@"

until curl -s "$host" > /dev/null; do
    echo "Waiting for $host to start"
    sleep 1
done

echo "Wait for additional time for the server to be fully up and running"
sleep 15

>&2 echo "$host is up - executing command"
bash -c "$cmd"
