#!/bin/sh
rm -f movetabs.xpi
zip -r movetabs.xpi . --exclude .git\* --exclude create_xpi.sh --exclude .gitignore
