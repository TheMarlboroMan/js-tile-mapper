function Caja_importacion() {
	var DOM_caja=document.getElementById('caja_importar');
	var DOM_textarea=document.getElementById('textarea_importar');

	this.mostrar=function() {DOM_caja.classList.remove('oculto');}
	this.ocultar=function() {DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_textarea.value='';}

	//TODO: Use real handlers.
	document.getElementById('btn_cerrar_importar').onclick=() => {this.ocultar();}
	document.getElementById('btn_importar_json').onclick=function() {CT.importar_json(DOM_textarea.value);}
}
