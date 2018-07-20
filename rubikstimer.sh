#!/bin/bash
date1=`date +%s`; while true; do 
echo -ne "$(date -u --date @$((`date +%s` - $date1)) +%M:%S)\r";
   done
read -s -n 1 key

if [[ $key = "" ]]; then
    echo 'Enter pressed'
fi

# TODO: echo/log time
