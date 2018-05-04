function Celda(_x, _y, _t) {
	this.x=_x;
	this.y=_y;
	this.tipo=_t;
	this.atributos={};
}

Celda.prototype={

	obtener_atributos_para_mediador : function() {
		let resultado=[];

		for(let i in this.atributos) {
			resultado.push(new Atributo(i, this.atributos[i], null));
		}

		return resultado;
	},

	limpiar_atributos_para_mediador : function() {
		this.atributos={};
	},

	asignar_atributo_para_mediador : function(_clave, _valor) {

		this.atributos[_clave]=_valor;
	}
}
