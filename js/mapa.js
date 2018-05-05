function Mapa() {

	var TABLA_ACTUAL=null;
	var TABLAS=Array();
	var atributos={};

	//All these functions are here so we can access the private variables above.

	this.obtener_atributos_para_mediador=() => {
		let resultado=[];

		for(let i in atributos) {
			resultado.push(new Atributo(i, atributos[i], null));
		}

		return resultado;
	}

	this.limpiar_atributos_para_mediador=() => {atributos={};}
	this.asignar_atributo_para_mediador=(_clave, _valor) => {atributos[_clave]=_valor;}
	this.obtener_atributos=() => {return atributos;}
	this.establecer_atributos=(_val) => {atributos=_val;}
	this.insertar_tabla=(t) => {TABLAS.push(t);}
	this.seleccionar_tabla=(t) => {
		if(TABLA_ACTUAL) TABLA_ACTUAL.quitar_actual();
		TABLA_ACTUAL=t;
		TABLA_ACTUAL.escoger_actual();
		H.cargar_valores_de_tabla(TABLA_ACTUAL);
	}

	this.escoger_primera_tabla=() => {this.seleccionar_tabla(TABLAS[0]);}
	this.obtener_tabla_actual=() => {return TABLA_ACTUAL;}
	this.obtener_array_tablas=() => {return TABLAS;}

	this.eliminar_tabla_actual=() => {

		if(TABLAS.length) {
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

	this.nueva_tabla();
	this.escoger_primera_tabla();
}

Mapa.prototype.volcar_modelo_en_DOM=function() {
	return this.obtener_tabla_actual().volcar_modelo_en_DOM();
}

Mapa.prototype.actualizar_modelo=function(_x, _y, _tipo) {
	this.obtener_tabla_actual().actualizar_modelo(_x, _y, _tipo);
}

Mapa.prototype.nueva_tabla=function() {

	var ancho=H.obtener_w();
	var alto=H.obtener_h();

	var T=new Tabla(ancho, alto);
	T.escoger_set(CS.obtener_set_por_indice(0));
	
	this.insertar_tabla(T);
	this.seleccionar_tabla(T);
}

Mapa.prototype.cambiar_opacidad_tabla_actual=function(val) {
	this.obtener_tabla_actual().cambiar_opacidad(val);
}

Mapa.prototype.redimensionar_tablas=function(w, h) {
	this.obtener_array_tablas().forEach((_item) => {
		_item.redimensionar(w, h);
	});
}

Mapa.prototype.generar_json_exportacion_tablas=function(_ignore_zero) {

	var resultado={
		'atributos' : this.obtener_atributos(),
		'tablas' : [],
	};

	this.obtener_array_tablas().forEach((_item) => {
		resultado.tablas.push(_item.exportar_json(_ignore_zero));
	});	

	return JSON.stringify(resultado);
}

Mapa.prototype.importar_json=function(texto) {

	this.destruir_todas_las_tablas();
	var datos=JSON.parse(texto);

	if(undefined!==datos.atributos) {
		this.establecer_atributos(datos.atributos)
	}

	if(undefined!==datos.tablas) {
		datos.tablas.forEach((_item) => {
			this.nueva_tabla();
			this.obtener_tabla_actual().importar_json(_item);
		});
	}
}

Mapa.prototype.obtener_celda_coordenadas=function(_x, _y) {

	return this.obtener_tabla_actual().obtener_celda_coordenadas(_x, _y);
}
