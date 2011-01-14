#!/bin/sh
rm movetabs.xpi
zip -r movetabs.xpi . --exclude .git\* --exclude create_xpi.sh
