function Set_tiles(_w, _h, _cw, _ch, _titulo, _src, _classname ) {
	this.titulo=_titulo;
	this.img_h=_h;
	this.img_w=_w;
	this.celda_w=_cw;
	this.celda_h=_ch;
	this.src=_src;
	this.classname=_classname;
}

Set_tiles.prototype.generar_cadena_css=function() {

	let css_tablas="#tablas table."+this.classname+" tr td {width: "+this.celda_w+"px; height: "+this.celda_h+"px; background-image: url('"+this.src+"');}\n";
	let css_herramientas="#herramientas #herramientas_tabla ul#listado_tiles."+this.classname+" li {width: "+this.celda_w+"px; height: "+this.celda_h+"px;}\n";
	css_herramientas+="#herramientas #herramientas_tabla ul#listado_tiles."+this.classname+" li label {width: "+this.celda_w+"px; height: "+this.celda_h+"px; background-image: url('"+this.src+"'); }\n";

	let x=0, y=0, i=0;
	for(x=0; x<this.img_w; x+=this.celda_w) {
		for(y=0; y<this.img_h; y+=this.celda_h) {

			css_tablas+="#tablas table."+this.classname+" tr td.tipo_"+i+" {background-position: "+(-x)+"px "+(-y)+"px;}\n";
			css_herramientas+="#herramientas #herramientas_tabla ul#listado_tiles."+this.classname+" li.tipo_"+i+" label {background-position: "+(-x)+"px "+(-y)+"px;}\n";
			i++;
		}
	}

	return css_tablas+"\n"+css_herramientas;
}

Set_tiles.prototype.rellenar_selector=function(ul) {

	ul.className=this.classname;

	function click_input(input, i) 	{
		input.onclick=function() {H.establecer_tipo_actual(i);}
	}

	var i=0;

	while(i < (this.img_w * this.img_h) / (this.celda_w * this.celda_h)) {
		var li=document.createElement('li');
		li.className='tipo_'+i;
		ul.appendChild(li);

		var input=document.createElement('input');
		input.type='radio';
		input.name='tipo';
		input.value=i;
		input.id='selector_tile_'+i;
		li.appendChild(input);

		var label=document.createElement('label');
		label.htmlFor='selector_tile_'+i;
		li.appendChild(label);

		click_input(input, i);
		if(i==0) input.onclick();

		++i;
	}
}
