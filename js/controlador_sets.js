function Controlador_sets() {
	this.ARRAY_SETS=Array();
	this.callback=null;
}

Controlador_sets.prototype.iniciar=function(callback) {
	this.callback=callback;

	var base=window.location.href.substr(0, window.location.href.lastIndexOf("/")+1);

	fetch(base+'sets/sets.json')
	.then((_res) => {return _res.json();})
	.then((_res) => {return this.procesar_carga(_res);});
}

Controlador_sets.prototype.insertar_set=function(_w, _h, _titulo, _traduccion, _src, _css) {
	this.ARRAY_SETS.push(new Set_tiles(_w, _h, _titulo, _traduccion, _src, _css));
}

Controlador_sets.prototype.procesar_carga=function(_json) {

	let total=_json.sets.length;
	let cargados=0;

	let loadcb=(_img, _titulo, _traduccion, _src, _css) => {

		this.insertar_set(_img.width, _img.height, _titulo, _traduccion, _src, _css);
		if(++cargados==total) {
			this.preparar_css();
			if(this.callback) this.callback();
		}
	};

	_json.sets.forEach((_item) => {

		let traduccion=undefined !== _item.trans ? _item.trans : null;

		let img=new Image();
		img.onload=() => {loadcb(img, _item.titulo, traduccion, _item.src, _item.css);}
		img.onerror=() => {throw new Error("Fallo al cargar "+_item.titulo+", src:"+ _item.src);}
		img.src=_item.src;
	});
}

Controlador_sets.prototype.preparar_css=function() {
	document.getElementById('estilos_inline').innerHTML=this.ARRAY_SETS.reduce((_acc, _item) => {
		return _acc+_item.generar_cadena_css();
	}, '');
}

Controlador_sets.prototype.recargar_selector_tiles=function(select) {

	this.ARRAY_SETS.forEach((_item, _index) => {
		var opt=document.createElement("option");
		opt.value=_index;
		opt.text=_item.titulo;
		select.add(opt, null);
	});
}

Controlador_sets.prototype.obtener_set_por_css=function(t) {

	let i=0;
	while(i < this.ARRAY_SETS.length) {
		if(this.ARRAY_SETS[i].classname==t) {
			return this.ARRAY_SETS[i];
		}
		++i;
	};

	return null;
}

Controlador_sets.prototype.obtener_set_por_indice=function(i) {
	if(this.ARRAY_SETS[i]) return this.ARRAY_SETS[i];
	else return null;
}
