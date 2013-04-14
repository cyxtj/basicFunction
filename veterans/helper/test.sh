#!/bin/bash

BASE_DIR=`dirname $0`

echo $BASE_DIR

echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"

testacular start $BASE_DIR/../test/config/testacular.unit.conf.js
