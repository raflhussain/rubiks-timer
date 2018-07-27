#!/bin/bash
BEGIN=$(date +%s)

echo Starting Rubiks Timer for $USER...
echo Solve cube, press any key when finished.
echo

while true; do
    NOW=$(date +%s)
    let DIFF=$(($NOW - $BEGIN))
    let MINS=$(($DIFF / 60))
    let SECS=$(($DIFF % 60))
    let TIME=$((($MINS * 60) + $SECS))

    # \r  is a "carriage return" - returns cursor to start of line
    printf "\r%02d:%02d" $MINS $SECS

    # In the following line -t for timeout, -N for just 1 character
    read -t 0.25 -N 1 input
    # Any key pressed (except spacebar/enter)
    if [[ $input  ]]; then
        
        # format duration for post request
        MINS=$(printf %02d $MINS)
        SECS=$(printf %02d $SECS)
        DURATION=$MINS:$SECS

        # curl HTTP POST request
        curl -d "username=$USER&duration=$MINS:$SECS" -X POST http://localhost:3000/addTime
        # Reintroduce prompt on new line
        echo
        echo Time added to database for $USER: $MINS minutes, $SECS seconds
        echo
        break 
    fi
done
