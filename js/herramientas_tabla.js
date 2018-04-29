function Herramientas_tabla() {
	this.DOM_contenedor=document.getElementById('herramientas');
	this.input_w=document.getElementById('redim_w');
	this.input_h=document.getElementById('redim_h');
//	this.input_grid_w=document.getElementById('grid_w');
//	this.input_grid_h=document.getElementById('grid_h');
	this.lista_tiles=document.getElementById('listado_tiles');
	//this.lista_tablas=document.getElementById('listado_tablas');
	this.select_set=document.getElementById('select_set');
	this.btn_nueva_tabla=document.getElementById('btn_nueva_tabla');
	this.btn_eliminar_tabla=document.getElementById('btn_eliminar_tabla');
	this.input_opacidad=document.getElementById('input_opacidad');
	this.btn_tabla_anterior=document.getElementById('btn_tabla_anterior');
	this.btn_tabla_siguiente=document.getElementById('btn_tabla_siguiente');
	this.btn_redimensionar=document.getElementById('btn_redimensionar');
	this.btn_rejilla=document.getElementById('btn_rejilla');
	this.btn_importar=document.getElementById('btn_importar');
	this.btn_exportar=document.getElementById('btn_exportar');

	var aquello=this;

	this.establecer_wh=function(w, h) {
		aquello.input_w.value=w;
		aquello.input_h.value=h;
	}

	this.btn_redimensionar.onclick=function() {CT.redimensionar_tablas(aquello.obtener_w(), aquello.obtener_h());}
	this.btn_exportar.onclick=function() {
		C_IMP.ocultar();
		C_EXP.mostrar();
	}
	this.btn_importar.onclick=function() {
		C_EXP.ocultar();
		C_IMP.vaciar();
		C_IMP.mostrar();
	}
	this.btn_tabla_anterior.onclick=function() {CT.tabla_anterior();}
	this.btn_tabla_siguiente.onclick=function() {CT.tabla_siguiente();}
	this.btn_nueva_tabla.onclick=function() {CT.nueva_tabla();}
	this.btn_eliminar_tabla.onclick=function() {CT.eliminar_tabla_actual();}

	this.input_opacidad.onchange=function() {CT.cambiar_opacidad_tabla_actual(parseInt(aquello.input_opacidad.value, 10));}

	this.select_set.onchange=function()
	{
		var indice=aquello.select_set.selectedIndex;
		aquello.recargar_listado_tiles(indice);
		var s=CS.obtener_set_por_indice(indice);
		CT.obtener_tabla_actual().escoger_set(s);
	}

	var tipo_actual=0;

	this.obtener_tipo_actual=function() {return tipo_actual;}
	this.establecer_tipo_actual=function(v) {tipo_actual=v;}
}

Herramientas_tabla.prototype.intercambiar=function(event) {
	if(this.DOM_contenedor.classList.contains('oculto')) this.mostrar(event);
	else this.ocultar(event);
}

Herramientas_tabla.prototype.mostrar=function(event) {
	this.DOM_contenedor.classList.remove('oculto');
	this.DOM_contenedor.style.left=event.clientX - (this.DOM_contenedor.offsetWidth / 2)+'px';
	this.DOM_contenedor.style.top=event.clientY - (this.DOM_contenedor.offsetHeight / 2)+'px';
}

Herramientas_tabla.prototype.ocultar=function(){this.DOM_contenedor.classList.add('oculto');}
Herramientas_tabla.prototype.obtener_w=function(){return parseInt(this.input_w.value, 10);}
Herramientas_tabla.prototype.obtener_h=function(){return parseInt(this.input_h.value, 10);}
Herramientas_tabla.prototype.establecer_clase_celda=function(c){c.className='tipo_'+this.obtener_tipo_actual();}
Herramientas_tabla.prototype.establecer_clase_celda_manual=function(c, t){c.className='tipo_'+t;}
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
	while(this.lista_tiles.firstChild) 
	{
		this.lista_tiles.removeChild(this.lista_tiles.firstChild);
	}

	var s=CS.obtener_set_por_indice(indice);
	if(s) s.rellenar_selector(this.lista_tiles);
}

//TODO: Is this ever used???
Herramientas_tabla.prototype.importar_json=function(datos) {
	CT.importar_json(datos);
}
