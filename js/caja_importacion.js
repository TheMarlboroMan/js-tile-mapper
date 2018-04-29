function Caja_importacion()
{
	var DOM_caja=document.getElementById('caja_importar');
	var DOM_btn_cerrar=document.getElementById('btn_cerrar_importar');
	var DOM_btn_ejecutar_json=document.getElementById('btn_importar_json');
	var DOM_textarea=document.getElementById('textarea_importar');

	this.mostrar=function() {DOM_caja.classList.remove('oculto');}
	this.ocultar=function() {DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_textarea.value='';}
	
	DOM_btn_cerrar.onclick=() => {this.ocultar();}
	DOM_btn_ejecutar_json.onclick=function() {H.importar_json(DOM_textarea.value);}
}
