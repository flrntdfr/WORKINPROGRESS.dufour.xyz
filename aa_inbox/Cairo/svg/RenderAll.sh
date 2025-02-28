#!/bin/bash

for f in *.svg
do
	echo -e "Processing $f"
	cairosvg "$f" -o "$f-rendered.pdf"
done
