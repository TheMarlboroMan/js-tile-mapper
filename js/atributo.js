function Atributo(_c, _v, _dom) {
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

	this.con_dom=null!==_dom;

	if(_dom) {
		this.DOM_li=document.createElement('li');
		this.par_clave=crear_input(_c, 'clave');
		this.par_valor=crear_input(_v, 'valor');

		_dom.appendChild(this.DOM_li);
		this.DOM_li.appendChild(this.par_clave.input);
		this.DOM_li.appendChild(this.par_valor.input);
	}
}

Atributo.prototype.destruir=function() {

	if(!this.con_dom) {
		return;
	}

	this.par_clave.input.removeEventListener('change', this.par_clave.event, true);
	this.par_valor.input.removeEventListener('change', this.par_valor.event, true);

	this.par_clave.input.parentNode.removeChild(this.par_clave.input);
	this.par_valor.input.parentNode.removeChild(this.par_valor.input);
	this.DOM_li.parentNode.removeChild(this.DOM_li);
}
