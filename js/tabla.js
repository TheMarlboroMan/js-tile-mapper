//TODO: First order of business is to incorporate the model.
//TODO: We'll need to act upon "controlador_input.js" and "controlador_tablas.js"
//I think a good first step is to remove unnecesary complexity, like "iniciar"
//and the whole DOM-adjuntar-recrear fiasco (we need just two: create_DOM and
//import_model_into_DOM)...

//TODO: import_model_into_DOM could actually run through the table cells and
//ASK the model for the value (we can index the model for x-y). This way we
//avoid doing cell calculation.

function Tabla(w, h) {
	this.DOM_tabla=null;
	this.DOM_rep_listado=null;
	this.W=w;
	this.H=h;
	this.css_set='';
	this.opacidad=100;

	//TODO: Decide the anatomy of the model: {x, y, t, attr:[]}
	//TODO: Create a class for the model: Celda.
	this.celdas=[]; //The real model.

	//TODO: Fill the model.
	//TODO: Create the DOM.
	//TODO: Fill DOM with model.
}


//TODO: This should be done in the constructor.
Tabla.prototype.iniciar=function() {

	this.crear_modelo();

	//TODO: Why this redundance?. Cannot we create from the model and then
	//attach?. Sounds good to me.
	this.crear_DOM();
	//TODO: This is actually a useless function.
	this.adjuntar();
	this.recrear_DOM();
}

Tabla.prototype.clear_modelo=function() {
	//TODO: populate "this.celdas"... We already know W and H, thus
	//we can fill the array with cells having an empty type.
}

Tabla.prototype.crear_DOM=function() {
	this.DOM_tabla=document.createElement('table');

	//TODO: Use addEventHandler...
	this.DOM_tabla.onclick=function(event) 	{
		event=event ? event : window.event;
		var celda=event.target;
		//TODO: Actually, we should do something with the model here.
		CI.click_celda(event, celda);
	}
	//TODO: Use addEventHandler...
	this.DOM_tabla.onmouseover=function(event) {
		event=event ? event : window.event;
		var celda=event.target;

		if(celda.getAttribute('data-x')) {
			var x=parseInt(celda.getAttribute('data-x'), 10);
			var y=parseInt(celda.getAttribute('data-y'), 10);
			document.getElementById("navegacion").innerHTML=x+' '+y;
		}
	}

	this.DOM_rep_listado=document.createElement('li');

	//TODO Use event handlers
	this.DOM_rep_listado.onclick=() => {CT.seleccionar_tabla(this);}
}

Tabla.prototype.destruir=function() {
	//TODO: Erase handlers!!!

	//TODO: Remove model tool
	this.DOM_tabla.parentNode.removeChild(this.DOM_tabla);
	this.DOM_rep_listado.parentNode.removeChild(this.DOM_rep_listado);
}

//TODO: This is doomed.
Tabla.prototype.adjuntar=function() {
	document.getElementById('tablas').appendChild(this.DOM_tabla);
	document.getElementById('listado_tablas').appendChild(this.DOM_rep_listado);
}

//TODO: Change for a name that says "DOM".
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

//TODO: This should be called  "add cells to dom".
//TODO: Merge this crap, please.
Tabla.prototype.recrear_DOM=function() {

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
	var set=CS.obtener_set_por_css(this.css_set);
	datos.celdas.forEach((_item) => {
		//TODO: Change... for a name that says "DOM".
		var c=this.obtener_celda_coordenadas(_item.x, _item.y);
		if(c) {
			var pt=_item.t;
			H.establecer_clase_celda_manual(c, pt);
		}
	});

	//TODO We should have a function to reconstruct the DOM from the model.

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
