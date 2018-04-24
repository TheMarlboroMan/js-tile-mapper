function Caja_importacion()
{
	var DOM_caja=document.getElementById('caja_importar');
	var DOM_btn_cerrar=document.getElementById('btn_cerrar_importar');
	var DOM_btn_ejecutar_importacion=document.getElementById('btn_ejecutar_importacion');
	var DOM_textarea=document.getElementById('textarea_importar');
//	var DOM_check_importar_una_linea=document.getElementById('check_importar_una_linea');

	var aquello=this;

//	this.es_importar_una_linea=function() {return DOM_check_importar_una_linea.checked;}
	this.mostrar=function() {DOM_caja.classList.remove('oculto');}
	this.ocultar=function() {DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_textarea.value='';}
	
	DOM_btn_cerrar.onclick=function() {aquello.ocultar();}
	DOM_btn_ejecutar_importacion.onclick=function() {H.importar(DOM_textarea.value);}
}
