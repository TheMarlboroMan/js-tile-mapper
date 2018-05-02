function Celda(_x, _y, _t) {
	this.x=_x;
	this.y=_y;
	this.tipo=_t;
	this.atributos=[];
}

function Tabla(w, h) {
	this.DOM_tabla=null;
	this.DOM_rep_listado=null;
	this.W=w;
	this.H=h;
	this.css_set='';
	this.opacidad=100;
	this.modelo=[];

	this.tabla_click_handler=null;
	this.tabla_over_handler=null;
	this.listado_click_handler=null;

	this.crear_modelo();
	this.crear_DOM();
	this.volcar_modelo_en_DOM();
}

Tabla.prototype.crear_modelo=function() {

	this.modelo.length=0;
	for(let y=0; y<this.H; y++) {
		for(let x=0; x<this.W; x++) {
			this.modelo.push(new Celda(x, y, 0));
		}
	}
}

Tabla.prototype.crear_DOM=function() {

	if(this.DOM_tabla) {
		this.DOM_tabla.parentNode.removeChild(this.DOM_tabla);
		this.DOM_rep_listado.parentNode.removeChild(this.DOM_rep_listado);

		this.DOM_tabla=null;
		this.DOM_rep_listado=null;
	}

	this.DOM_tabla=document.createElement('table');

	this.tabla_click_handler=this.DOM_tabla.addEventListener('click', (event) => {
		event=event ? event : window.event;
		CI.click_celda(event, event.target);
	}, true);

	this.tabla_over_handler=this.DOM_tabla.addEventListener('mouseover', (event) => {
		event=event ? event : window.event;
		var celda=event.target;
		document.getElementById("navegacion").innerHTML=parseInt(celda.getAttribute('data-x'), 10)+' '+parseInt(celda.getAttribute('data-y'), 10);
	}, true);

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
	this.listado_click_handler=this.DOM_rep_listado.addEventListener('click', () => {CT.seleccionar_tabla(this);}, true);

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

	return this.modelo[ (x) + (y*this.W)];
}

//!This needs a DOM cell.already.
Tabla.prototype.volcar_modelo_en_celda_DOM=function(_cmodelo, _celda) {

	_celda.className='tipo_'+_cmodelo.tipo;

	if(_cmodelo.atributos.length) {
		//TODO: Show something special on the cell.
	}
}

//This does not update the DOM cell.
Tabla.prototype.actualizar_modelo=function(_x, _y, _tipo) {

	this.obtener_celda_coordenadas(_x, _y).tipo=_tipo;
}

Tabla.prototype.destruir=function() {

	this.DOM_tabla.removeEventListener('click', this.tabla_click_handler, true);
	this.DOM_tabla.removeEventListener('mouseover', this.tabla_over_handler, true);
	this.DOM_rep_listado.removeEventListener('click', this.listado_click_handler, true);

	this.tabla_click_handler=null;
	this.tabla_over_handler=null;
	this.listado_click_handler=null;

	this.modelo.length=0;
	this.DOM_tabla.parentNode.removeChild(this.DOM_tabla);
	this.DOM_rep_listado.parentNode.removeChild(this.DOM_rep_listado);
}

Tabla.prototype.redimensionar=function(w, h) {
	this.W=w;
	this.H=h;

	//Original data is preserved.
	let copia=this.modelo.map((_item) => {return _item;});
	this.crear_modelo();

	copia.forEach((_item) => {this.actualizar_modelo(_item.x, _item.y, _item.tipo);});
	this.crear_DOM();
}

Tabla.prototype.importar_json=function(datos) {

	this.cambiar_opacidad(datos.opacidad);
	this.redimensionar(datos.w, datos.h);

	H.establecer_wh(datos.w, datos.h);

	datos.celdas.forEach((_item) => {this.actualizar_modelo(_item.x, _item.y, _item.t);});

	this.volcar_modelo_en_DOM();
	this.escoger_set(CS.obtener_set_por_css(datos.set));
}

Tabla.prototype.exportar_json=function(_ignore_zero) {

	var resultado={'w': this.W,
		'h' : this.H,
		'set' : this.css_set,
		'opacidad' : this.opacidad,
		'celdas' : [],
	};

	this.modelo.forEach((_item) => {
		if(!_ignore_zero || _item.tipo || _item.atributos.length) {
			resultado.celdas.push({'x': _item.x, 'y': _item.y, 't':_item.tipo});
		}
	});

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

Tabla.prototype.obtener_td_coordenadas=function(x, y) {

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
