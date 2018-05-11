function Herramientas_tabla() {

	this.DOM_contenedor=document.getElementById('herramientas');
	this.input_w=document.getElementById('redim_w');
	this.input_h=document.getElementById('redim_h');
	this.lista_tiles=document.getElementById('listado_tiles');
	this.select_set=document.getElementById('select_set');
	this.input_opacidad=document.getElementById('input_opacidad');

	this.establecer_wh=(w, h) => {
		this.input_w.value=w;
		this.input_h.value=h;
	}

	document.getElementById('btn_tabla_frente').addEventListener('click', () => {
		M.reordenar_tabla_actual(1);
	}, true);

	document.getElementById('btn_tabla_atras').addEventListener('click', () => {
		M.reordenar_tabla_actual(-1);
	}, true);

	document.getElementById('btn_nuevo_set').addEventListener('click', () => {
		C_IMP.ocultar();
		C_EXP.ocultar();
		C_NS.mostrar();
	}, true);

	document.getElementById('btn_redimensionar').addEventListener('click', () => {
		M.redimensionar_tablas(this.obtener_w(), this.obtener_h());
	}, true);

	document.getElementById('btn_exportar').addEventListener('click', () => {
		C_IMP.ocultar();
		C_NS.ocultar();
		C_EXP.mostrar();
	}, true);

	document.getElementById('btn_importar').addEventListener('click', () => {
		C_EXP.ocultar();
		C_NS.ocultar();
		C_IMP.vaciar();
		C_IMP.mostrar();
	}, true);
	
	document.getElementById('btn_nueva_tabla').addEventListener('click', () => {M.nueva_tabla();}, true);
	document.getElementById('btn_eliminar_tabla').addEventListener('click', () => {M.eliminar_tabla_actual();}, true);
	document.getElementById('btn_atributos_mapa').addEventListener('click', () => {CA.mostrar(M);}, true);

	this.input_opacidad.addEventListener('change', () => {
		M.cambiar_opacidad_tabla_actual(parseInt(this.input_opacidad.value, 10));
	}, true);

	this.select_set.addEventListener('change', () => {

		this.recargar_listado_tiles(this.select_set.value);
		M.obtener_tabla_actual().escoger_set(CS.obtener_set_por_css(this.select_set.value));
	}, true);

	var tipo_actual=0;

	this.obtener_tipo_actual=function() {return tipo_actual;}
	this.establecer_tipo_actual=function(v) {tipo_actual=v;}
}

Herramientas_tabla.prototype.intercambiar=function() {
	if(this.DOM_contenedor.classList.contains('oculto')) this.mostrar();
	else this.ocultar();
}

Herramientas_tabla.prototype.mostrar=function(event) {
	this.DOM_contenedor.classList.remove('oculto');
}

Herramientas_tabla.prototype.ocultar=function(){this.DOM_contenedor.classList.add('oculto');}
Herramientas_tabla.prototype.obtener_w=function(){return parseInt(this.input_w.value, 10);}
Herramientas_tabla.prototype.obtener_h=function(){return parseInt(this.input_h.value, 10);}
Herramientas_tabla.prototype.recargar_selector_tiles=function() {CS.recargar_selector_tiles(this.select_set);}

Herramientas_tabla.prototype.cargar_valores_de_tabla=function(t) {
	this.input_opacidad.value=t.opacidad;
	this.select_set.value=t.css_set;
	this.recargar_listado_tiles(t.css_set);
}

Herramientas_tabla.prototype.recargar_listado_tiles=function(_css) {

	//TODO: Use real events.
	this.lista_tiles.querySelectorAll('li').forEach((_item) => {
		_item.onclick=null;
		_item.parentNode.removeChild(_item);
	});
	console.log(_css);

	console.log(CS);
	CS.obtener_set_por_css(_css).rellenar_selector(this.lista_tiles);
}
