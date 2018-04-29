# js-tile-mapper

JS tile mapper. A very simple distraction dated from long ago.

The code is done in an old JS style, with lots of global state scattered throughout. A refactor was started in late April, 2018, but I don't think it will end removing global state.

# TODO: 

Even if I don't feel like diving in, I could get away with this:

- Add support for custom sets.
	- Load an image from your computer: must be a long strip.
	- Add an optional translation for each cell (cells are square, width is assumed to be same as height).
- Do it ECMA6 style.
	- We could get rid of a lot of var aquello=this;.
- Add custom language strings.
- Add optional data to the maps.
- Remove the exporting / importing as plain text. It is ugly.

# DONE 

- Remove the old XML loading style.

# Credits:

Background tileset from:

	-https://opengameart.org/content/generic-platformer-tileset-16x16-background
