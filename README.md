# js-tile-mapper

JS tile editor. A very simple distraction dated from long ago.

The original code is done in an old JS style, with lots of global state scattered throughout. 

A refactor was started in late April, 2018, but removing global state was way too much of a headache, so the refactor focused on removing useless code and functionality and improving readability.

# FAQ:

- How can a custom set be designed?.
	Just be sure that the top-left tile is "transparent", something you intepret as "nothing" in your game.
	Having transparent backgrounds helps too.
	Be sure your images are "evenly sized", that is, the reminder of img_w / cell_w or img_h / cell_h must be zero.

- Can I use custom sets if I am working online?.
	Yep, but you will need to import the set each time you want to work with the map.

- How do permanently add custom sets ? 
	Check the assets/sets.json file. You can add sets here. "titulo" is a value for the selector, "css" is a name that must be unique and you can choose, "src" is the path to your tile file, "cw" and "ch" are cell width and height in pixels.

- How can I delete an attribute from a cell?
	Just edit the attributes and leave the name and value blank.

- How am I supposed to add objects instead of tiles?.
	You cannot do that with this project. The recommended way is to create another layer and use a tileset to represent your objects, in combination with cell attributes.

# TODO: 

There's nothing left to do except fixing bugs as I find them.

# DONE 

- Add custom set loading.
- Have tiles working in arbitrary image sizes.
- Add the ability to ignore certain cell values when exporting (the first).
- Remove the exporting / importing as plain text. It is ugly.
- Remove the old XML loading style.
- Erase the cell translations.
- Erase order. It does nothing.
- Separate table view from model.
- Add custom attributes for cells.
- Add optional data to the maps: attributes.
- Import optional data too.
- Use arrow functions to preserve class scope.
- Import level from file (instead of copy / paste)

# Credits:

Background tileset from:

	-https://opengameart.org/content/generic-platformer-tileset-16x16-background
