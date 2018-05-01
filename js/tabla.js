function Celda(_x, _y, _t) {
	this.x=_x;
	this.y=_y;
	this.tipo=_y;
	this.attributos=[];
}

function Tabla(w, h) {
	this.DOM_tabla=null;
	this.DOM_rep_listado=null;
	this.W=w;
	this.H=h;
	this.css_set='';
	this.opacidad=100;

	//The real model.
	this.celdas=[];
	for(let y=0; y<this.H; y++) {
		for(let x=0; x<this.W; x++) {
			this.celdas.push(new Celda(x, y, 0));
		}
	}

	this.crear_DOM();
	this.volcar_modelo_en_DOM();
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
		document.getElementById("navegacion").innerHTML=parseInt(celda.getAttribute('data-x'), 10)+' '+parseInt(celda.getAttribute('data-y'), 10);
	}

	let y=0;
	while(y < this.H) {
		let x=0
		var row=this.DOM_tabla.insertRow();
		while(x < this.W) {
			var celda=row.insertCell(-1);
			celda.setAttribute('data-x', x);
			celda.setAttribute('data-y', y);
			++x;
		}
		
		++y;
	}

	//También, añadir el tema del listado...
	this.DOM_rep_listado=document.createElement('li');
	//TODO Use event handlers
	this.DOM_rep_listado.onclick=() => {CT.seleccionar_tabla(this);}

	document.getElementById('tablas').appendChild(this.DOM_tabla);
	document.getElementById('listado_tablas').appendChild(this.DOM_rep_listado);
}

Tabla.prototype.volcar_modelo_en_DOM=function() {

	this.DOM_tabla.querySelectorAll('td').forEach((_item) => {
	
		let x=parseInt(_item.getAttribute('data-x'), 10);
		let y=parseInt(_item.getAttribute('data-y'), 10);
		this.volcar_modelo_en_celda_DOM(this.obtener_celda_coordenadas(x, y), _item);
	});
}

Tabla.prototype.obtener_celda_coordenadas=function(x, y) {

	//TODO. Check this.
	return this.model[y*this.H, x % this.W];
}

Tabla.prototype.volcar_modelo_en_celda_DOM(_cmodelo, _celda) {

	_celda.className='tipo_'+_cmodelo.tipo;

	if(_cmodelo.atributos.length) {
		//TODO.
	}
}

Tabla.prototype.actualizar_modelo=function(_x, _y, _tipo) {

	//This does not update the DOM cell.
	this.obtener_celda_coordenadas(_x, _y).tipo=_tipo;
}

Tabla.prototype.destruir=function() {
	//TODO: Erase handlers!!!

	this.modelo.length=0;
	this.DOM_tabla.parentNode.removeChild(this.DOM_tabla);
	this.DOM_rep_listado.parentNode.removeChild(this.DOM_rep_listado);
}

Tabla.prototype.redimensionar=function(w, h) {
	this.W=w;
	this.H=h;
	//TODO: What about recreating the model and then recreating the whole
	//DOM.
	//TODO: What if we also try to preserve the existing data??? We can
	//create a new array, fill it and then copy the relevant values.
	this.recrear_DOM();
}

Tabla.prototype.importar_json=function(datos) {

	//Load config...
	var set=CS.obtener_set_por_css(datos.set);
	if(set) {
		this.escoger_set(set);
	}

	this.cambiar_opacidad(datos.opacidad);
	this.redimensionar(datos.w, datos.h);

	H.establecer_wh(datos.w, datos.h);

	//TODO: We should actually import into the model here.
	//Load data.
/*
	var set=CS.obtener_set_por_css(this.css_set);
	datos.celdas.forEach((_item) => {
		//TODO: Change... for a name that says "DOM".
		var c=this.obtener_celda_coordenadas(_item.x, _item.y);
		if(c) {
			var pt=_item.t;
			H.establecer_clase_celda_manual(c, pt);
		}
	});
*/
	this.volcar_modelo_en_DOM();
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

	//TODO: Export the model, not the view!!!!.

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
//TODO: Do not export attributes if they don't hold values.
				resultado.celdas.push({'x': j, 'y': i, 't':num});
				j++;
			}
		}
		i++;
	}

	return resultado;
}

Tabla.prototype.escoger_set=function(set) {
	if(set) {
		this.css_set=set.classname;
		this.DOM_tabla.className=this.css_set;
	}
}

Tabla.prototype.quitar_actual=function() {
	this.DOM_tabla.classList.remove('actual');
	this.DOM_rep_listado.classList.remove('actual');
}

Tabla.prototype.escoger_actual=function() {
	this.DOM_tabla.classList.add('actual');
	this.DOM_rep_listado.classList.add('actual');
}

Tabla.prototype.cambiar_opacidad=function(val) {
	this.opacidad=val;
	this.DOM_tabla.style.opacity=this.opacidad / 100;
}

/*
//TODO: Erase when not needed.

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
*/
