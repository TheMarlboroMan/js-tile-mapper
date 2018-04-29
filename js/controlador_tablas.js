function Controlador_tablas()
{
	var TABLA_ACTUAL=null;
	var TABLAS=Array();

	//All these functions are here so we can access the private variables above.

	this.insertar_tabla=(t) => {TABLAS.push(t);}
	this.seleccionar_tabla=(t) => {
		if(TABLA_ACTUAL) TABLA_ACTUAL.quitar_actual();
		TABLA_ACTUAL=t;
		TABLA_ACTUAL.escoger_actual();
		H.cargar_valores_de_tabla(TABLA_ACTUAL);
	}

	this.escoger_primera_tabla=function() {this.seleccionar_tabla(TABLAS[0]);}
	this.obtener_tabla_actual=function() {return TABLA_ACTUAL;}
	this.obtener_array_tablas=function() {return TABLAS;}
	this.obtener_total_tablas=function() {return TABLAS.length;}

	this.eliminar_tabla_actual=() => {
		if(this.obtener_total_tablas() > 1)
		{
			var indice=TABLAS.indexOf(TABLA_ACTUAL);
			if(indice==TABLAS.length-1) return;
			else 
			{
				TABLAS[indice].destruir();
				delete TABLAS[indice];
				TABLAS.splice(indice, 1);
				this.seleccionar_tabla(TABLAS[0]);
			}
		}
	}

	this.destruir_todas_las_tablas=() => {

		TABLAS.forEach((_item) => {_item.destruir();});
		TABLAS.length=0;
		TABLA_ACTUAL=null;
	}

	this.tabla_siguiente=() => {
		var indice=TABLAS.indexOf(TABLA_ACTUAL);
		if(indice==TABLAS.length-1 || indice==-1) return;
		else this.seleccionar_tabla(TABLAS[indice+1]);
	}

	this.tabla_anterior=() => {
		var indice=TABLAS.indexOf(TABLA_ACTUAL);
		if(indice==0 || indice==-1) return;
		else this.seleccionar_tabla(TABLAS[indice-1]);
	}
}

Controlador_tablas.prototype.obtener_celda_coordenadas=function(x, y) {
	return this.obtener_tabla_actual().obtener_celda_coordenadas(x, y);
}

Controlador_tablas.prototype.nueva_tabla=function() {

	var ancho=H.obtener_w();
	var alto=H.obtener_h();
	var orden=this.obtener_total_tablas() * 10;

	var T=new Tabla(ancho, alto, orden);
	T.iniciar();
	T.escoger_set(CS.obtener_set_por_indice(0));
	
	this.insertar_tabla(T);
	this.seleccionar_tabla(T);
}

Controlador_tablas.prototype.cambiar_opacidad_tabla_actual=function(val) {
	this.obtener_tabla_actual().cambiar_opacidad(val);
}

Controlador_tablas.prototype.redimensionar_tablas=function(w, h) {
	this.obtener_array_tablas().forEach((_item) => {
		_item.redimensionar(w, h);
	});
}

Controlador_tablas.prototype.reajustar_tamano_celdas=function(w, h) {
	this.obtener_array_tablas().forEach( (_item) => {
		_item.reajustar_tamano_celdas(w, h);
	});
}

Controlador_tablas.prototype.generar_json_exportacion_tablas=function(_ignore_zero) {

	var resultado={
		'total' : this.obtener_total_tablas(),
		'tablas' : [],
	};

	this.obtener_array_tablas().forEach((_item) => {
		resultado.tablas.push(_item.exportar_json(_ignore_zero));
	});	

	return JSON.stringify(resultado);
}

Controlador_tablas.prototype.importar_json=function(texto) {

	//Eliminar todas las tablas...
	this.destruir_todas_las_tablas();

	var datos=JSON.parse(texto);

	var total=datos.total;
	var aquello=this;

	datos.tablas.forEach(function(_item) {
		aquello.nueva_tabla();
		aquello.obtener_tabla_actual().importar_json(_item);
	});
}

Controlador_tablas.prototype.iniciar=function() {
	this.nueva_tabla();
	this.escoger_primera_tabla();
}
