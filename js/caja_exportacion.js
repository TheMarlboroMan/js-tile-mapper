function Caja_exportacion()
{
	var DOM_caja=document.getElementById('caja_exportar');
	var DOM_p=document.getElementById('p_exportar');
	var DOM_btn_cerrar=document.getElementById('btn_cerrar_exportar');
	var DOM_btn_ejecutar_exportacion=document.getElementById('btn_ejecutar_exportacion');
//	var DOM_check_exportar_una_linea=document.getElementById('check_exportar_una_linea');

	var aquello=this;	

//	this.es_exportar_una_linea=function() {return DOM_check_exportar_una_linea.checked;}
	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.ocultar=function(){DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_p.innerHTML='';}
	this.rellenar=function(texto) {DOM_p.innerHTML=texto;}
	DOM_btn_ejecutar_exportacion.onclick=function() {aquello.exportar();}	
	DOM_btn_cerrar.onclick=function() {aquello.ocultar(); aquello.vaciar();}
}

Caja_exportacion.prototype.exportar=function()
{
	var texto=CT.generar_texto_exportacion_tablas();
	C_EXP.rellenar(texto);
}

