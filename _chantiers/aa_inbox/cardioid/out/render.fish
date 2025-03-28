#!/usr/bin/env fish

for f in frame*
	echo -en "\rProcessing $f"
	cairosvg $f -o "./png/$f.png"
end


