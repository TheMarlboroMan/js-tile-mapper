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
	
	document.getElementById('btn_tabla_anterior').addEventListener('click', () => {M.tabla_anterior();}, true);
	document.getElementById('btn_tabla_siguiente').addEventListener('click', () => {M.tabla_siguiente();}, true);
	document.getElementById('btn_nueva_tabla').addEventListener('click', () => {M.nueva_tabla();}, true);
	document.getElementById('btn_eliminar_tabla').addEventListener('click', () => {M.eliminar_tabla_actual();}, true);
	document.getElementById('btn_atributos_mapa').addEventListener('click', () => {CA.mostrar(M);}, true);

	this.input_opacidad.addEventListener('change', () => {
		M.cambiar_opacidad_tabla_actual(parseInt(this.input_opacidad.value, 10));
	}, true);

	this.select_set.addEventListener('change', () => {
		var indice=this.select_set.selectedIndex;
		this.recargar_listado_tiles(indice);
		var s=CS.obtener_set_por_indice(indice);
		M.obtener_tabla_actual().escoger_set(s);
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
	this.select_set.value=t.titulo_set;
}

Herramientas_tabla.prototype.recargar_listado_tiles=function(indice) {

	var lis=this.lista_tiles.querySelectorAll('li');

	var l=lis.length;
	var i=0;

	while(i < l) lis[i++].onclick=null;
	while(this.lista_tiles.childNodes.length) {
		this.lista_tiles.removeChild(this.lista_tiles.firstChild);
	}

	var s=CS.obtener_set_por_indice(indice);
	if(s) s.rellenar_selector(this.lista_tiles);
}
