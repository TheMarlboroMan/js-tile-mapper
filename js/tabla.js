function Tabla(w, h) {
	this.DOM_tabla=null;
	this.DOM_rep_listado=null;
	this.W=w;
	this.H=h;
	this.css_set='';
	this.opacidad=100;
}

Tabla.prototype.iniciar=function() {
	this.crear_DOM();
	this.adjuntar();
	this.recrear();
}

Tabla.prototype.crear_DOM=function() {
	this.DOM_tabla=document.createElement('table');

	//TODO: Use addEventHandler...
	this.DOM_tabla.onclick=function(event) 	{
		event=event ? event : window.event;
		var celda=event.target;
		CI.click_celda(event, celda);
	}
	//TODO: Use addEventHandler...
	this.DOM_tabla.onmouseover=function(event) {
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
	this.DOM_rep_listado.onclick=() => {CT.seleccionar_tabla(this);}
}

Tabla.prototype.destruir=function() {
	//TODO: Erase handlers!!!
	this.DOM_tabla.parentNode.removeChild(this.DOM_tabla);
	this.DOM_rep_listado.parentNode.removeChild(this.DOM_rep_listado);
}

Tabla.prototype.adjuntar=function() {
	document.getElementById('tablas').appendChild(this.DOM_tabla);
	document.getElementById('listado_tablas').appendChild(this.DOM_rep_listado);
}

Tabla.prototype.obtener_celda_coordenadas=function(x, y) {

	var row=this.DOM_tabla.rows[y];
	if(!row) {
		return null;
	}
	else {
		var celda=row.cells[x];
		if(!celda) return null;
		else return celda;
	}
}

Tabla.prototype.recrear=function() {

	//TODO: I guess I could just do it the easy way.
	while(this.DOM_tabla.rows.length) {
		this.DOM_tabla.deleteRow(0);
	}

	var y=0, x=0;

	while(y < this.H) {
		x=0
		var row=this.DOM_tabla.insertRow();

		while(x < this.W) {
			var celda=row.insertCell(-1);
			celda.className='tipo_0';
			celda.setAttribute('data-x', x);
			celda.setAttribute('data-y', y);
			++x;
		}
		
		++y;
	}

}

Tabla.prototype.escoger_set=function(set)
{
	if(set) {
		this.css_set=set.classname;
		this.DOM_tabla.className=this.css_set;
	}
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


Tabla.prototype.cambiar_opacidad=function(val) {
	this.opacidad=val;
	this.DOM_tabla.style.opacity=this.opacidad / 100;
}

Tabla.prototype.quitar_actual=function() {
	this.DOM_tabla.classList.remove('actual');
	this.DOM_rep_listado.classList.remove('actual');
}

Tabla.prototype.escoger_actual=function() {
	this.DOM_tabla.classList.add('actual');
	this.DOM_rep_listado.classList.add('actual');
}

Tabla.prototype.redimensionar=function(w, h) {
	this.W=w;
	this.H=h;
	this.recrear();
}

Tabla.prototype.importar_json=function(datos) {

	//Load config...
	var set=CS.obtener_set_por_css(datos.set);
	if(set) this.escoger_set(set);

	this.cambiar_opacidad(datos.opacidad);
	this.redimensionar(datos.w, datos.h);

	H.establecer_wh(datos.w, datos.h);

	//Load data.
	var set=CS.obtener_set_por_css(this.css_set);
	datos.celdas.forEach((_item) => {
		var c=this.obtener_celda_coordenadas(_item.x, _item.y);
		if(c) {
			var pt=_item.t;
			H.establecer_clase_celda_manual(c, pt);
		}
	});
}

Tabla.prototype.exportar_json=function(_ignore_zero) {

	var resultado={'w': this.W,
		'h' : this.H,
		'set' : this.css_set,
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
			var num=parseInt(celdas[j].className.replace('tipo_', ''));

			if(_ignore_zero && !num) {
				j++;
				continue;
			}
			else {
				resultado.celdas.push({'x': j, 'y': i, 't':num});
				j++;
			}
		}
		i++;
	}

	return resultado;
}
