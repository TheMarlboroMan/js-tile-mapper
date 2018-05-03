function Atributo_celda(_c, _v, _dom) {
	this.clave=_c;
	this.valor=_v;

	let crear_input=(_val, _k) => {
		let input=document.createElement('input');
		input.type='text';
		input.value=_val;

		let ev=input.addEventListener('change', () => {
			if(null!==_k) {
				this[_k]=input.value;
			}
		}, true);

		return {'input': input, 'event': ev};
	};

	this.DOM_li=document.createElement('li');
	this.par_clave=crear_input(_c, 'clave');
	this.par_valor=crear_input(_v, 'valor');

	_dom.appendChild(this.DOM_li);
	this.DOM_li.appendChild(this.par_clave.input);
	this.DOM_li.appendChild(this.par_valor.input);
}

Atributo_celda.prototype.destruir=function() {
	
	this.par_clave.input.removeEventListener('change', this.par_clave.event, true);
	this.par_valor.input.removeEventListener('change', this.par_valor.event, true);

	this.par_clave.input.parentNode.removeChild(this.par_clave.input);
	this.par_valor.input.parentNode.removeChild(this.par_valor.input);
	this.DOM_li.parentNode.removeChild(this.DOM_li);
}

function Caja_atributos_celda() {

	this.atributos=[];
	this.celda=null;

	this.DOM_atributos=document.getElementById('listado_atributos');
	var DOM_caja=document.getElementById('caja_atributos_celda');

	this.ocultar=function() {DOM_caja.classList.add('oculto');}
	this.mostrar=(_celda) => {
		this.celda=_celda;
		this.limpiar();
		DOM_caja.classList.remove('oculto');
		this.cargar_datos_celda(_celda);
	}

	document.getElementById('btn_cerrar_atributos_celda').addEventListener('click', () => {
		this.limpiar();
		this.ocultar();
		this.celda=null;
		this.atributos.length=0;
	}, true);

	document.getElementById('btn_guardar_atributos_celda').addEventListener('click', () => {
		this.guardar();
		this.limpiar();
		//Refrescar tabla...
		CT.volcar_modelo_en_DOM();
		this.celda=null;
		this.atributos.length=0;
		this.ocultar();
	}, true);

	document.getElementById('btn_nuevo_atributo_celda').addEventListener('click', () => {
		this.nuevo_atributo('', '');
	}, true);
}

Caja_atributos_celda.prototype.limpiar=function() {

	this.atributos.forEach((_item) => {_item.destruir();});
}

Caja_atributos_celda.prototype.guardar=function() {

	this.celda.atributos={};
	this.atributos.forEach((_item) => {
		if(_item.valor.length && _item.clave.length) {
			this.celda.atributos[_item.clave.trim()]=_item.valor.trim();
		}
	});

	console.log(this.celda);
}

Caja_atributos_celda.prototype.cargar_datos_celda=function(_celda) {

	for(let i in _celda.atributos) {
		this.nuevo_atributo(i, _celda.atributos[i]);
	}
}

Caja_atributos_celda.prototype.nuevo_atributo=function(_clave, _valor) {

	this.atributos.push(new Atributo_celda(_clave, _valor, this.DOM_atributos));
}
