function Controlador_sets() {
	this.ARRAY_SETS=Array();
	this.callback=null;
}

Controlador_sets.prototype.iniciar=function(callback) {
	this.callback=callback;

	var base=window.location.href.substr(0, window.location.href.lastIndexOf("/")+1);
	var url=base+'sets/sets.xml';
	var xml=new Lector_XML();
	xml.crear(url, this.procesar_carga, this, false);
}

Controlador_sets.prototype.procesar_carga=function(v_xml) {
	var aquello=this;
	var l=new Lector_doc(v_xml.raiz);
	var total=l.cuenta_nodos();
	var i=0;

	l.bajar(0);

	function insertar_set(t) {
		aquello.ARRAY_SETS.push(t);
	}

	function finalizar_carga(img, titulo, traduccion) {
		var t=new Set_tiles();
		t.W=img.width;
		t.H=img.height;
		t.titulo=titulo;
		t.traduccion=traduccion;
		insertar_set(t);

		if(++i < total) continuar();
		else finalizar_proceso();
	}

	function finalizar_proceso() {
		aquello.preparar_css();
		if(aquello.callback) aquello.callback();
	}

	function continuar() {
		l.avanzar();
		insertar();
	}

	function insertar() {
		var img=new Image();
		var titulo=l.atributo('titulo');
		var traduccion=l.atributo('trans');
		img.onload=function() {finalizar_carga(img, titulo, traduccion);}
		var url='sets/'+titulo+'.png';
		img.src=url;
	}

	insertar();
}

Controlador_sets.prototype.preparar_css=function() {
	var i=0;
	var l=this.ARRAY_SETS.length;
	var texto='';

	while(i<l) texto+=this.ARRAY_SETS[i++].generar_cadena_css();
	document.getElementById('estilos_inline').innerHTML=texto;
}

Controlador_sets.prototype.recargar_selector_tiles=function(select) {
	var i=0;
	var l=this.ARRAY_SETS.length;

	while(i < l)
	{
		var opt=document.createElement("option");
		opt.value=i;
		opt.text=this.ARRAY_SETS[i].titulo;
		select.add(opt, null);
		++i;
	}
}

/*
Controlador_sets.prototype.obtener_titulo_set_por_indice=function(i)
{
	if(this.ARRAY_SETS[i]) return this.ARRAY_SETS[i].titulo;
	else return '';
}
*/

Controlador_sets.prototype.obtener_set_por_titulo=function(t) {
	var l=this.ARRAY_SETS.length;
	var i=0;

	while(i < l) {
		if(this.ARRAY_SETS[i].titulo==t) return this.ARRAY_SETS[i];
		++i;
	}

	return null;
}

Controlador_sets.prototype.obtener_set_por_indice=function(i) {
	if(this.ARRAY_SETS[i]) return this.ARRAY_SETS[i];
	else return null;
}
