var CI=null;
var CT=null;
var CS=null;
var H=null;
var C_IMP=null;
var C_EXP=null;

function Set_tiles()
{
	this.titulo='';
	this.H=0;
	this.W=0;
	this.traduccion='';
}

Set_tiles.prototype.obtener_dim_celda=function() {return this.H-2;}

Set_tiles.prototype.generar_cadena_css=function()
{
	var resultado="";
	var dim_celda=this.H-2;
	var total=this.W / this.H;
	var i=0;
	var x=0;

	resultado+="#tablas table."+this.titulo+" tr td {width: "+dim_celda+"px; height: "+dim_celda+"px; background-image: url(sets/"+this.titulo+".png);}\n";

	while(i < total)
	{
		resultado+="#tablas table."+this.titulo+" tr td.tipo_"+i+" {background-position: "+x+"px 0px;}\n";
		++i;
		x-=this.H;
	}

	resultado+="#herramientas #herramientas_tabla ul#listado_tiles."+this.titulo+" li {width: "+this.H+"px; height: "+this.H+"px;}\n";
	resultado+="#herramientas #herramientas_tabla ul#listado_tiles."+this.titulo+" li label {width: "+this.H+"px; height: "+this.H+"px; background-image: url(sets/"+this.titulo+".png); }\n";

	i=0;
	x=0;
	while(i < total)
	{
		resultado+="#herramientas #herramientas_tabla ul#listado_tiles."+this.titulo+" li.tipo_"+i+" label {background-position: "+x+"px 0px;}\n";
		++i;
		x-=this.H;
	}

	return resultado;
}

//Tipo a texto
Set_tiles.prototype.traducir=function(indice)
{
	if(!this.traduccion || !this.traduccion.length) return indice;
	else return this.traduccion[indice];
}

//Texto a tipo...
Set_tiles.prototype.traducir_inversa=function(texto)
{
	if(!this.traduccion || !this.traduccion.length) return texto;
	else return this.traduccion.indexOf(texto);
}

Set_tiles.prototype.rellenar_selector=function(ul)
{
	ul.className=this.titulo;

	var total=this.W / this.H;
	var i=0;

	function click_input(input, i)
	{
		input.onclick=function() {H.establecer_tipo_actual(i);}
	}

	while(i < total)
	{
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

/******************************************************************************/

function Controlador_sets()
{
	this.ARRAY_SETS=Array();
	this.callback=null;
}

Controlador_sets.prototype.iniciar=function(callback)
{
	this.callback=callback;

	var base=window.location.href.substr(0, window.location.href.lastIndexOf("/")+1);
	var url=base+'sets/sets.xml';
	var xml=new Lector_XML();
	xml.crear(url, this.procesar_carga, this, false);
}

Controlador_sets.prototype.procesar_carga=function(v_xml)
{
	var aquello=this;
	var l=new Lector_doc(v_xml.raiz);
	var total=l.cuenta_nodos();
	var i=0;

	l.bajar(0);

	function insertar_set(t)
	{
		aquello.ARRAY_SETS.push(t);
	}

	function finalizar_carga(img, titulo, traduccion)
	{
		var t=new Set_tiles();
		t.W=img.width;
		t.H=img.height;
		t.titulo=titulo;
		t.traduccion=traduccion;
		insertar_set(t);

		if(++i < total) continuar();
		else finalizar_proceso();
	}

	function finalizar_proceso()
	{
		aquello.preparar_css();
		if(aquello.callback) aquello.callback();
	}

	function continuar()
	{
		l.avanzar();
		insertar();
	}

	function insertar()
	{
		var img=new Image();
		var titulo=l.atributo('titulo');	
		var traduccion=l.atributo('trans');
		img.onload=function() {finalizar_carga(img, titulo, traduccion);}
		var url='sets/'+titulo+'.png';
		img.src=url;
	}

	insertar();
}

Controlador_sets.prototype.preparar_css=function()
{
	var i=0;
	var l=this.ARRAY_SETS.length;
	var texto='';

	while(i<l) texto+=this.ARRAY_SETS[i++].generar_cadena_css();
	document.getElementById('estilos_inline').innerHTML=texto;
}

Controlador_sets.prototype.recargar_selector_tiles=function(select)
{
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

Controlador_sets.prototype.obtener_set_por_titulo=function(t)
{
	var l=this.ARRAY_SETS.length;
	var i=0;

	while(i < l)
	{
		if(this.ARRAY_SETS[i].titulo==t) return this.ARRAY_SETS[i];
		++i;
	}

	return null;
}

Controlador_sets.prototype.obtener_set_por_indice=function(i)
{
	if(this.ARRAY_SETS[i]) return this.ARRAY_SETS[i];
	else return null;
}

/******************************************************************************/

function Controlador_input()
{
	this.ULTIMO_CLICK_X=-1;
	this.ULTIMO_CLICK_Y=-1;

	window.onclick=function(event)
	{
		if (!event) var event=window.event;
		if(event.ctrlKey)
		{
			H.intercambiar(event);
			event.preventDefault();
			return false;
		}
	}

	window.onkeydown=function(event)
	{
		switch(event.keyCode)
		{
			case 27: H.ocultar(); break;
		}
	}
}

Controlador_input.prototype.click_celda=function(event, celda)
{
	var evento=event ? event : window.event;

	if(!evento.shiftKey)
	{
		H.establecer_clase_celda(celda);
	}
	else
	{
		if(this.ULTIMO_CLICK_X < 0 || this.ULTIMO_CLICK_Y < 0) 
		{
			return;
		}
		else
		{

			var x=parseInt(celda.getAttribute('data-x'), 10);
			var y=parseInt(celda.getAttribute('data-y'), 10);

			if(x==this.ULTIMO_CLICK_X && y==this.ULTIMO_CLICK_Y)
			{
				return;
			}
			else
			{
				if(x==this.ULTIMO_CLICK_X)
				{
					var ini=y < this.ULTIMO_CLICK_Y ? y : this.ULTIMO_CLICK_Y;
					var fin=y > this.ULTIMO_CLICK_Y ? y : this.ULTIMO_CLICK_Y;

					while(ini <= fin)
					{
						var c=CT.obtener_celda_coordenadas(x, ini++);
						if(c) H.establecer_clase_celda(c);
					}
				}
				else if(y==this.ULTIMO_CLICK_Y)
				{
					var ini=x < this.ULTIMO_CLICK_X ? x : this.ULTIMO_CLICK_X;
					var fin=x > this.ULTIMO_CLICK_X ? x : this.ULTIMO_CLICK_X;

					while(ini <= fin)
					{
						var c=CT.obtener_celda_coordenadas(ini++, y);
						if(c) H.establecer_clase_celda(c);
					}
				}
			}
		}
	}

	this.ULTIMO_CLICK_X=parseInt(celda.getAttribute('data-x'), 10);
	this.ULTIMO_CLICK_Y=parseInt(celda.getAttribute('data-y'), 10);
}

/******************************************************************************/

function Herramientas_tabla()
{
	this.DOM_contenedor=document.getElementById('herramientas');
	this.input_w=document.getElementById('redim_w');
	this.input_h=document.getElementById('redim_h');
	this.input_grid_w=document.getElementById('grid_w');
	this.input_grid_h=document.getElementById('grid_h');
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

	this.establecer_wh=function(w, h)
	{
		aquello.input_w.value=w;
		aquello.input_h.value=h;
	}

	this.btn_rejilla.onclick=function() 
	{
		var w=parseInt(aquello.input_grid_w.value, 10);
		var h=parseInt(aquello.input_grid_h.value, 10);

		var txt="#tablas table tr:nth-child("+h+"n+1) {border-top: 1px solid #55A;}\n";
		txt+="#tablas table tr td:nth-child("+w+"n+1) {border-left: 1px solid #55A;}";
		document.getElementById('estilos_inline_rejilla').innerHTML=txt;
	}
	this.btn_redimensionar.onclick=function() {CT.redimensionar_tablas(aquello.obtener_w(), aquello.obtener_h());}
	this.btn_exportar.onclick=function() 
	{
		C_IMP.ocultar();
		C_EXP.mostrar();
	}
	this.btn_importar.onclick=function() 
	{
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

Herramientas_tabla.prototype.intercambiar=function(event)
{
	if(this.DOM_contenedor.classList.contains('oculto')) this.mostrar(event);
	else this.ocultar(event);
}

Herramientas_tabla.prototype.mostrar=function(event)
{
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

Herramientas_tabla.prototype.cargar_valores_de_tabla=function(t)
{
	this.input_opacidad.value=t.opacidad;
	this.select_set.value=t.titulo_set;
}

Herramientas_tabla.prototype.recargar_listado_tiles=function(indice)
{
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

Herramientas_tabla.prototype.importar=function(texto) 
{
	CT.importar(texto);
}
	
/******************************************************************************/

function Info_config_linea()
{
	this.w=0;
	this.h=0;
	this.titulo_set='';
	this.orden=0;
	this.opacidad=0;
};

/******************************************************************************/

function Tabla(w, h, orden)
{
	this.DOM_tabla=null;
	this.DOM_rep_listado=null;
	this.W=w;
	this.H=h;
	this.titulo_set='';
	this.dim_celda=0;

//TODO: El orden debería usarse para dar también un zindex. No está comprobado que esto no de fallos.

	this.orden=orden;
	this.opacidad=100;
}

Tabla.prototype.iniciar=function()
{
	this.crear_DOM();
	this.adjuntar();
	this.recrear();
}

Tabla.prototype.crear_DOM=function()
{
	this.DOM_tabla=document.createElement('table');
	this.DOM_tabla.onclick=function(event)
	{
		event=event ? event : window.event;
		var celda=event.target;
		CI.click_celda(event, celda);		
	}
	this.DOM_tabla.onmouseover=function(event)
	{
		event=event ? event : window.event;
		var celda=event.target;

		if(celda.getAttribute('data-x'))
		{
			var x=parseInt(celda.getAttribute('data-x'), 10);
			var y=parseInt(celda.getAttribute('data-y'), 10);
			document.getElementById("navegacion").innerHTML=x+' '+y;
		}
	}

	
	this.DOM_rep_listado=document.createElement('li');

	var aquello=this;
	this.DOM_rep_listado.onclick=function() {CT.seleccionar_tabla(aquello);}
}

Tabla.prototype.destruir=function()
{
	this.DOM_tabla.parentNode.removeChild(this.DOM_tabla);
	this.DOM_rep_listado.parentNode.removeChild(this.DOM_rep_listado);
}

Tabla.prototype.adjuntar=function()
{
	document.getElementById('tablas').appendChild(this.DOM_tabla);
	document.getElementById('listado_tablas').appendChild(this.DOM_rep_listado);
}

Tabla.prototype.obtener_celda_coordenadas=function(x, y)
{
	var row=this.DOM_tabla.rows[y];
	if(!row)
	{
		return null;
	}
	else
	{
		var celda=row.cells[x];
		if(!celda) return null;
		else return celda;
	}
}

Tabla.prototype.recrear=function()
{

	var tr=this.DOM_tabla.rows.length;
	var i=0;
	while(i < tr)
	{
		this.DOM_tabla.deleteRow(0);
		++i;
	}

	var y=0, x=0;

//	function click_celda(celda)
//	{
//		celda.onclick=function(event) {CI.click_celda(event, celda);}
//	}

	while(y < this.H)
	{
		x=0
		var row=this.DOM_tabla.insertRow();

		while(x < this.W)
		{
			var celda=row.insertCell(-1);
//			click_celda(celda);	
			celda.className='tipo_0';
			celda.setAttribute('data-x', x);
			celda.setAttribute('data-y', y);
			++x;
		}		
		
		++y;
	}

	this.reajustar_dimensiones_tabla();
}

Tabla.prototype.escoger_set=function(set)
{
	if(set)
	{
		this.dim_celda=set.obtener_dim_celda();
		this.reajustar_dimensiones_tabla();
		this.titulo_set=set.titulo;
		this.DOM_tabla.className=this.titulo_set;
	}
}

Tabla.prototype.reajustar_dimensiones_tabla=function()
{
	this.DOM_tabla.style.width=(this.dim_celda * this.W)+'px';
}

Tabla.prototype.cambiar_opacidad=function(val) 
{
	this.opacidad=val;
	var v=this.opacidad / 100;
	this.DOM_tabla.style.opacity=v;
}

Tabla.prototype.quitar_actual=function() 
{
	this.DOM_tabla.classList.remove('actual');
	this.DOM_rep_listado.classList.remove('actual');
}

Tabla.prototype.escoger_actual=function() 
{
	this.DOM_tabla.classList.add('actual');
	this.DOM_rep_listado.classList.add('actual');
}

Tabla.prototype.redimensionar=function(w, h)
{
	this.W=w;
	this.H=h;
	this.recrear();
}

Tabla.prototype.importar=function(texto)
{	
	var filas=texto.split("\n");
	var total=filas.length;

	this.importar_linea_configuracion(filas[0]);

//	if(total==2)
//	{
//		this.importar_linea_estado(filas[1]);
//	}
//	else
//	{
	var i=1;
	var cadena_final='';
	while(i < total) 
	{
		cadena_final+=(filas[i++]+"\n");
	}
	this.importar_linea_estado(cadena_final);
//	}
}

Tabla.prototype.importar_linea_estado=function(linea)
{
	var l=linea.length;
	var i=0;

	var x=0;
	var y=0;

	var set=CS.obtener_set_por_titulo(this.titulo_set);

	while(i < l)
	{
		var pt=linea[i++];

		if(pt=='\n')
		{
			x=0;
			++y;
		}
		else
		{
			var c=this.obtener_celda_coordenadas(x, y);
			if(c) 
			{
				if(set) pt=set.traducir_inversa(pt);
				H.establecer_clase_celda_manual(c, pt);
			}
			++x;
		}
	}
}

Tabla.prototype.obtener_info_configuracion_de_linea=function(linea)
{
	var val=linea.split(" ");
	var resultado=new Info_config_linea();
	resultado.w=parseInt(val[0], 10);
	resultado.h=parseInt(val[1], 10);
	resultado.titulo_set=val[2];
	resultado.orden=parseInt(val[3], 10);
	resultado.opacidad=parseInt(val[4], 10);

	return resultado;
}

Tabla.prototype.importar_linea_configuracion=function(linea)
{
	var config=this.obtener_info_configuracion_de_linea(linea);
	var set=CS.obtener_set_por_titulo(config.titulo_set);
	if(set) this.escoger_set(set);
	this.cambiar_opacidad(config.opacidad);
	this.redimensionar(config.w, config.h);
	H.establecer_wh(config.w, config.h);
}

Tabla.prototype.exportar=function()
{
	var texto=this.W+' '+this.H+' '+this.titulo_set+' '+this.orden+' '+this.opacidad+"\n";
	var filas=this.DOM_tabla.rows;
	var i=0;
	var lf=filas.length;

	var set=CS.obtener_set_por_titulo(this.titulo_set);

	//La exportación se realiza en una sóla línea.
	while(i < lf)
	{
		var fila=filas[i++];
		var celdas=fila.querySelectorAll('td');
		var lc=celdas.length;

		var j=0;

		while(j < lc)
		{
			var clase=celdas[j++].className;
			var num=clase.replace('tipo_', '');
			if(set) num=set.traducir(num);
			texto+=num;
		}

		texto+="\n";
//		if(!C_EXP.es_exportar_una_linea()) texto+="\n";
	}

	texto+="\n";
	
	return texto;
}

/******************************************************************************/

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

/******************************************************************************/

function Caja_exportacion()
{
	var DOM_caja=document.getElementById('caja_exportar');
	var DOM_p=document.getElementById('p_exportar');
	var DOM_btn_cerrar=document.getElementById('btn_cerrar_exportar');
	var DOM_btn_ejecutar_exportacion=document.getElementById('btn_ejecutar_exportacion');
//	var DOM_check_exportar_una_linea=document.getElementById('check_exportar_una_linea');

	var aquello=this;	

//	this.es_exportar_una_linea=function() {return DOM_check_exportar_una_linea.checked;}
	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.ocultar=function(){DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_p.innerHTML='';}
	this.rellenar=function(texto) {DOM_p.innerHTML=texto;}
	DOM_btn_ejecutar_exportacion.onclick=function() {aquello.exportar();}	
	DOM_btn_cerrar.onclick=function() {aquello.ocultar(); aquello.vaciar();}
}

Caja_exportacion.prototype.exportar=function()
{
	var texto=CT.generar_texto_exportacion_tablas();
	C_EXP.rellenar(texto);
}

/******************************************************************************/

function Caja_importacion()
{
	var DOM_caja=document.getElementById('caja_importar');
	var DOM_btn_cerrar=document.getElementById('btn_cerrar_importar');
	var DOM_btn_ejecutar_importacion=document.getElementById('btn_ejecutar_importacion');
	var DOM_textarea=document.getElementById('textarea_importar');
//	var DOM_check_importar_una_linea=document.getElementById('check_importar_una_linea');

	var aquello=this;

//	this.es_importar_una_linea=function() {return DOM_check_importar_una_linea.checked;}
	this.mostrar=function() {DOM_caja.classList.remove('oculto');}
	this.ocultar=function() {DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_textarea.value='';}
	
	DOM_btn_cerrar.onclick=function() {aquello.ocultar();}
	DOM_btn_ejecutar_importacion.onclick=function() {H.importar(DOM_textarea.value);}
}

/******************************************************************************/

window.onload=function()
{
	function procesar_carga()
	{
		C_EXP=new Caja_exportacion();
		C_IMP=new Caja_importacion();
		CI=new Controlador_input();
		H=new Herramientas_tabla();
		H.recargar_selector_tiles();
		H.recargar_listado_tiles(0);
		CT=new Controlador_tablas();
		CT.iniciar();
	}
	CS=new Controlador_sets();
	CS.iniciar(procesar_carga);
}

/******************************************************************************/
