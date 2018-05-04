function Mediador_atributos() {
	
	this.atribuible=null;
}

Mediador_atributos.prototype={

	limpiar : function() {
		this.atribuible=null;
	},

	asignar_atribuible : function(_item) {

		if(undefined===_item.obtener_atributos_para_mediador) {
			throw new Error("Atribuible debe implementar obtener_atributos_para_mediador!");
		}

		if(undefined==!_item.limpiar_atributos_para_mediador) {
			throw new Error("Atribuible debe implementar limpiar_atributos_para_mediador!");
		}

		if(undefined===_item.asignar_atributo_para_mediador) {
			throw new Error("Atribuible debe implementar asignar_atributo_para_mediador!");
		}

		this.atribuible=_item;
	},

	obtener_atributos : function() {

		return this.atribuible.obtener_atributos_para_mediador();
	},

	asignar_atributos : function(_attr) {

		if(null===this.atribuible) {
			throw new Error("Se necesita un atribuible!");
		}

		this.atribuible.limpiar_atributos_para_mediador();

		_attr.forEach((_item) => {

			if(_item.valor.trim().length && _item.clave.trim().length) {
				this.atribuible.asignar_atributo_para_mediador(_item.clave.trim(), _item.valor.trim());
			}
		});
	},
}
