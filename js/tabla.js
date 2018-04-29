function Tabla(w, h, orden)
{
	this.DOM_tabla=null;
	this.DOM_rep_listado=null;
	this.W=w;
	this.H=h;
	this.css_set='';
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
	if(set) {
		this.dim_celda=set.obtener_dim_celda();
		this.reajustar_dimensiones_tabla();
		this.css_set=set.classname;
		this.DOM_tabla.className=this.css_set;
	}
}

Tabla.prototype.reajustar_dimensiones_tabla=function() {
	this.DOM_tabla.style.width=(this.dim_celda * this.W)+'px';
}

Tabla.prototype.reajustar_tamano_celdas=function(w, h) {

	this.DOM_tabla.querySelectorAll('tr').forEach( function(_item) {
		_item.style.height=h+'px';
	});

	this.DOM_tabla.querySelectorAll('td').forEach( function(_item) {
		_item.style.minWidth=w+'px';
		_item.style.maxWidth=w+'px';
		_item.style.width=w+'px';
		_item.width=w+'px';
	});
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

Tabla.prototype.importar=function(texto) {	
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

Tabla.prototype.importar_json=function(config, datos) {

	this.importar_linea_configuracion_json(config);
	var aquello=this;
	var set=CS.obtener_set_por_css(this.css_set);
	datos.forEach(function(_item) {
		var c=aquello.obtener_celda_coordenadas(_item.x, _item.y);
		if(c) {
			var pt=_item.t;
			if(set) pt=set.traducir_inversa(pt);
			H.establecer_clase_celda_manual(c, pt);
		}
	});
}

Tabla.prototype.importar_linea_estado=function(linea) {
	var l=linea.length;
	var i=0;

	var x=0;
	var y=0;

	var set=CS.obtener_set_por_css(this.css_set);

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
	//TODO: Build in situ.
	var resultado=new Info_config_linea();
	resultado.w=parseInt(val[0], 10);
	resultado.h=parseInt(val[1], 10);
	resultado.css_set=val[2];
	resultado.orden=parseInt(val[3], 10);
	resultado.opacidad=parseInt(val[4], 10);

	return resultado;
}

Tabla.prototype.obtener_info_configuracion_de_json=function(datos) {
	var resultado=new Info_config_linea();
	resultado.w=datos.w;
	resultado.h=datos.h;
	resultado.css_set=datos.set;
	resultado.orden=datos.orden;
	resultado.opacidad=datos.opacidad;

	return resultado;
}

Tabla.prototype.importar_linea_configuracion=function(linea)
{
	var config=this.obtener_info_configuracion_de_linea(linea);
	var set=CS.obtener_set_por_css(config.css_set);
	if(set) this.escoger_set(set);
	this.cambiar_opacidad(config.opacidad);
	this.redimensionar(config.w, config.h);
	H.establecer_wh(config.w, config.h);
}

Tabla.prototype.importar_linea_configuracion_json=function(config) {
	var set=CS.obtener_set_por_css(config.css_set);
	if(set) this.escoger_set(set);
	this.cambiar_opacidad(config.opacidad);
	this.redimensionar(config.w, config.h);
	H.establecer_wh(config.w, config.h);
}

Tabla.prototype.exportar=function() {
	var texto=this.W+' '+this.H+' '+this.css_set+' '+this.orden+' '+this.opacidad+"\n";
	var filas=this.DOM_tabla.rows;
	var i=0;
	var lf=filas.length;

	var set=CS.obtener_set_por_css(this.css_set);

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
	}

	texto+="\n";
	
	return texto;
}

Tabla.prototype.exportar_json=function() {

	var resultado={'w': this.W,
		'h' : this.H,
		'set' : this.css_set,
		'orden' : this.orden,
		'opacidad' : this.opacidad,
		'celdas' : [],
	};

	var filas=this.DOM_tabla.rows;
	var i=0;
	var lf=filas.length;

	var set=CS.obtener_set_por_css(this.css_set);

	while(i < lf) {
		var celdas=filas[i].querySelectorAll('td');
		var j=0;

		while(j < celdas.length) {
			var num=celdas[j].className.replace('tipo_', '');
			if(set) num=set.traducir(num);
			resultado.celdas.push({'x': j, 'y': i, 't':num});
			j++;
		}
		i++;
	}

	return resultado;
}
