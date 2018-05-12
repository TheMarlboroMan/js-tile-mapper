# js-tile-mapper

JS tile editor. A very simple distraction dated from long ago.

The original code is done in an old JS style, with lots of global state scattered throughout. 

A refactor was started in late April, 2018, but removing global state was way too much of a headache, so the refactor focused on removing useless code and functionality, making the codebase less redundant, shorter and improving readability.

# FAQ:

- How can a custom set be designed?.
	Just be sure that the top-left tile is "transparent", something you intepret as "nothing" in your game.
	Having transparent backgrounds helps too.
	Be sure your images are "evenly sized", that is, the reminder of img_w / cell_w or img_h / cell_h must be zero.

- Can I use custom sets if I am working online?.
	Yep, but you will need to import the set each time you want to work with the map.

- How do permanently add custom sets ? 
	Check the assets/sets.json file. You can add sets here. "titulo" is a value for the selector, "css" is a name that must be unique and you can choose, "src" is the path to your tile file, "cw" and "ch" are cell width and height in pixels.

- I added tiles to my tileset and now everything is scrambled!.
	Yep, the tile manager assigns each tile a numeric value, and does so by measuring tiles left to right and top to bottom. If you are planning to add new tiles to your set, just extend the image vertically or relocate all tiles so they can keep their numeric values (left to right and top to bottom).

- How can I delete an attribute from a cell?
	Just edit the attributes and leave the name and value blank.

- How am I supposed to add objects instead of tiles?.
	You cannot do that with this project. The recommended way is to create another layer and use a tileset to represent your objects, in combination with cell attributes.

- How can I export my map to a file?
	Copy the contents of the export text and paste them into a file. Sorry.

# TODO: 


- Do everything in English?
- Fix how the tiles look pixel off...

If there are no lines above, then there's nothing left to do except fixing bugs as I find them.

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
- Reorder tables (set as previous, set as next).
- Nor opacity nor tilesets are chosen on importing a map.
- Changing table does not update the set selector.
- Use "ESC" to close the current dialog: should be easy with listeners and subscribers.
- Move all tiles left, right, up and so on... Mostly like "resize".
- Think about a way to export other than to copy the text to a file.

# Credits:

Background tileset from:

	-https://opengameart.org/content/generic-platformer-tileset-16x16-background
