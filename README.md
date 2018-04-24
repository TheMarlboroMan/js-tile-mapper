# js-tile-mapper

JS tile mapper. A very simple distraction dated from long ago.

The code is done in an old JS style, with lots of global state scattered throughout. 

I feel it could benefit from some refactoring and documenting but in order to do that I would have to dive into it again, which I don't feel like doing (that fact alone speaks a lot about the overall quality of the code).

# TODO: 

Even if I don't feel like diving in, I could get away with this:

- Add support for custom sets.
	- Load an image from your computer: must be a long strip.
	- Add an optional translation for each cell (cells are square, width is assumed to be same as height).
- Do it ECMA6 style.
	- We could get rid of a lot of var aquello=this;.

# Credits:

Background tileset from:

	-https://opengameart.org/content/generic-platformer-tileset-16x16-background
