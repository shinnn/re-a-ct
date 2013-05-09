#!/bin/bash

for elm in $(ls -p | grep -v "/")
do
  name=${elm%.*}
  openssl base64 -in $elm -out "base64/"$name".js"
done