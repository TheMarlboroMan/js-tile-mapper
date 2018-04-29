# js-tile-mapper

JS tile mapper. A very simple distraction dated from long ago.

The code is done in an old JS style, with lots of global state scattered throughout. A refactor was started in late April, 2018, but I don't think it will end removing global state.

# FAQ:

- How do I use custom sets? 
	Check the assets/sets.json file. You can add sets here. "titulo" is a value for the selector, "css" is a name that must be unique and you can choose, "src" is the path to your tile file, "cw" and "ch" are cell width and height in pixels.
	Be sure your images are "evenly sized", that is, the reminder of img_w / cell_w or img_h / cell_h must be zero.

- Can I use custom sets if I am working online?.
	So far you can't. Just download the project and use it from your computer.

# TODO: 

- Test import of multiple layers.
- Do it ECMA6 style.
	- We could get rid of a lot of var aquello=this;.
- Add custom language strings ???
- Add optional data to the maps, a form in the export. 
- Import optional data too. 

# DONE 

- Have tiles working in arbitrary image sizes.
- Add the ability to ignore certain cell values when exporting (the first).
- Remove the exporting / importing as plain text. It is ugly.
- Remove the old XML loading style.
- Erase the cell translations.

# Credits:

Background tileset from:

	-https://opengameart.org/content/generic-platformer-tileset-16x16-background
