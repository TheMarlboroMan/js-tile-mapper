function Controlador_tablas()
{
	var TABLA_ACTUAL=null;
	var TABLAS=Array();
	var aquello=this;

	this.insertar_tabla=function(t){TABLAS.push(t);}
	this.seleccionar_tabla=function(t) 
	{
		if(TABLA_ACTUAL) TABLA_ACTUAL.quitar_actual();
		TABLA_ACTUAL=t;
		TABLA_ACTUAL.escoger_actual();
		H.cargar_valores_de_tabla(TABLA_ACTUAL);
	}

	this.escoger_primera_tabla=function() {this.seleccionar_tabla(TABLAS[0]);}
	this.obtener_tabla_actual=function() {return TABLA_ACTUAL;}
	this.obtener_array_tablas=function() {return TABLAS;}
	this.obtener_total_tablas=function() {return TABLAS.length;}

	this.eliminar_tabla_actual=function() 
	{
		if(aquello.obtener_total_tablas() > 1)
		{
			var indice=TABLAS.indexOf(TABLA_ACTUAL);
			if(indice==TABLAS.length-1) return;
			else 
			{
				TABLAS[indice].destruir();
				delete TABLAS[indice];
				TABLAS.splice(indice, 1);
				aquello.seleccionar_tabla(TABLAS[0]);
			}
		}
	}

	this.destruir_todas_las_tablas=function() 
	{
		var l=TABLAS.length;
		var i=0;

		while(i < l)
		{
			TABLAS[i].destruir();
			delete TABLAS[i];			
			++i;
		}

		TABLAS.length=0;
		TABLA_ACTUAL=null;
	}

	this.tabla_siguiente=function()
	{
		var indice=TABLAS.indexOf(TABLA_ACTUAL);
		if(indice==TABLAS.length-1 || indice==-1) return;
		else aquello.seleccionar_tabla(TABLAS[indice+1]);
	}

	this.tabla_anterior=function()
	{
		var indice=TABLAS.indexOf(TABLA_ACTUAL);
		if(indice==0 || indice==-1) return;
		else aquello.seleccionar_tabla(TABLAS[indice-1]);
	}

}

Controlador_tablas.prototype.obtener_celda_coordenadas=function(x, y)
{
	var TABLA_ACTUAL=this.obtener_tabla_actual();
	return TABLA_ACTUAL.obtener_celda_coordenadas(x, y);
}

Controlador_tablas.prototype.nueva_tabla=function()
{
	var ancho=H.obtener_w();
	var alto=H.obtener_h();
	var orden=this.obtener_total_tablas() * 10;

	var T=new Tabla(ancho, alto, orden);
	T.iniciar();
	T.escoger_set(CS.obtener_set_por_indice(0));
	this.insertar_tabla(T);
	this.seleccionar_tabla(T);
}

Controlador_tablas.prototype.cambiar_opacidad_tabla_actual=function(val)
{
	this.obtener_tabla_actual().cambiar_opacidad(val);
}

Controlador_tablas.prototype.redimensionar_tablas=function(w, h)
{
	var total=this.obtener_total_tablas();
	var AT=this.obtener_array_tablas();
	var i=0;

	while(i < total) AT[i++].redimensionar(w, h);
}

Controlador_tablas.prototype.reajustar_tamano_celdas=function(w, h) {
	var total=this.obtener_total_tablas();
	var AT=this.obtener_array_tablas();
	var i=0;

	while(i < total) {
		AT[i++].reajustar_tamano_celdas(w, h);
	}
}

Controlador_tablas.prototype.generar_texto_exportacion_tablas=function()
{
	var total=this.obtener_total_tablas();
	var AT=this.obtener_array_tablas();
	var i=0;

	var resultado=total+"\n";
	
	while(i < total)
	{
		resultado+=AT[i].exportar();
		++i;
	}

	return resultado;
}

Controlador_tablas.prototype.importar=function(texto)
{
	//Eliminar todas las tablas...
	this.destruir_todas_las_tablas();

	//Leer la primera línea para crear la tabla...
	var lineas=texto.split("\n");

	var total=parseInt(lineas[0], 10);
	var cl=lineas.length;
	var i=1;

	while(i < cl)
	{
		var linea_config=lineas[i++];
		var config=Tabla.prototype.obtener_info_configuracion_de_linea(linea_config);
		var t=linea_config+"\n";
		var j=0;

		//Realmente el código de importación hace que esto no importe, creo...
//		var separador=C_IMP.es_importar_una_linea() ? '' : '\n';
		var separador='\n';

		while(j < config.h)
		{
			t+=lineas[i++]+separador;
			++j;
		}
	
		this.nueva_tabla();
		this.obtener_tabla_actual().importar(t);
	}
}

Controlador_tablas.prototype.iniciar=function()
{
	this.nueva_tabla();
	this.escoger_primera_tabla();
}
