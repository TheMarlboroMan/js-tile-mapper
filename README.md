# js-tile-mapper

JS tile mapper. A very simple distraction dated from long ago.

The original code is done in an old JS style, with lots of global state scattered throughout. 

A refactor was started in late April, 2018, but removing global state was way too much of a headache, so the refactor focused on removing useless code and functionality and improving readability.

# FAQ:

- How can a custom set be designed?.
	Just be sure that the top-left tile is "transparent", something you intepret as "nothing" in your game.

- Can I use custom sets if I am working online?.
	Yep, but you will need to import the set each time you want to work with the map.

- How do permanently add custom sets ? 
	Check the assets/sets.json file. You can add sets here. "titulo" is a value for the selector, "css" is a name that must be unique and you can choose, "src" is the path to your tile file, "cw" and "ch" are cell width and height in pixels.
	Be sure your images are "evenly sized", that is, the reminder of img_w / cell_w or img_h / cell_h must be zero.


# TODO: 

- Test import of multiple layers.
- Do it ECMA6 style.
	- We could get rid of a lot of var aquello=this;.
- Add optional data to the maps, a form in the export. 
- Import optional data too. 

# DONE 

- Add custom set loading.
- Have tiles working in arbitrary image sizes.
- Add the ability to ignore certain cell values when exporting (the first).
- Remove the exporting / importing as plain text. It is ugly.
- Remove the old XML loading style.
- Erase the cell translations.
- Erase order. It does nothing.

# Credits:

Background tileset from:

	-https://opengameart.org/content/generic-platformer-tileset-16x16-background
