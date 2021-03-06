function Caja_atributos() {

	this.atributos=[];
	this.mediador=new Mediador_atributos();

	this.DOM_atributos=document.getElementById('listado_atributos');
	this.DOM_caja=document.getElementById('caja_atributos');

	this.ocultar=function() {this.DOM_caja.classList.add('oculto');}

	document.getElementById('btn_cerrar_atributos').addEventListener('click', () => {
		this.cerrar();
	}, true);

	document.getElementById('btn_guardar_atributos').addEventListener('click', () => {
		this.mediador.asignar_atributos(this.atributos);
		M.volcar_modelo_en_DOM(); //May or may not be neccesary.
		this.cerrar();

	}, true);

	document.getElementById('btn_nuevo_atributo').addEventListener('click', () => {
		this.nuevo_atributo('', '');
	}, true);
}

Caja_atributos.prototype.cerrar=function() {

	this.limpiar();
	this.ocultar();
	this.mediador.limpiar();
	this.atributos.length=0;
}

Caja_atributos.prototype.mostrar=function(_item) {

	this.mediador.limpiar();
	this.limpiar();
	this.mediador.asignar_atribuible(_item);
	this.DOM_caja.classList.remove('oculto');
	this.cargar_datos();
}

Caja_atributos.prototype.limpiar=function() {

	this.atributos.forEach((_item) => {_item.destruir();});
}

Caja_atributos.prototype.cargar_datos=function() {

	this.mediador.obtener_atributos().forEach((_item) => {
		this.nuevo_atributo(_item.clave, _item.valor);
	});
}

Caja_atributos.prototype.nuevo_atributo=function(_clave, _valor) {

	this.atributos.push(new Atributo(_clave, _valor, this.DOM_atributos));
}
