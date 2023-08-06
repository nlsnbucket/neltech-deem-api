#!/bin/bash

setup() {
    yarn
    docker compose up -d
    sleep 2
    npx prisma migrate dev
}

cleanup() {
    docker compose down
}

test() {
    npx jest --runInBand
}

trap cleanup EXIT
setup
test
cleanup
