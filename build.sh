#!/bin/bash
KANGODIR="kango"
rm -R output certificates
python $KANGODIR/kango.py build ./