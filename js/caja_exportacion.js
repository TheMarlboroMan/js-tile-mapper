function Caja_exportacion()
{
	var DOM_caja=document.getElementById('caja_exportar');
	var DOM_p=document.getElementById('p_exportar');
	var DOM_btn_cerrar=document.getElementById('btn_cerrar_exportar');
	var DOM_btn_ejecutar_json=document.getElementById('btn_exportar_json');
	let DOM_check_ignorar_tipo_cero=document.getElementById('check_ignorar_tipo_cero');

	var aquello=this;

	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.ocultar=function(){DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_p.innerHTML='';}
	this.rellenar=function(texto) {DOM_p.innerHTML=texto;}
	DOM_btn_ejecutar_json.onclick=function() {
		aquello.exportar_json(DOM_check_ignorar_tipo_cero.checked);
	}
	DOM_btn_cerrar.onclick=function() {aquello.ocultar(); aquello.vaciar();}
}

Caja_exportacion.prototype.exportar_json=function(_ignore_zero) {
	C_EXP.rellenar(CT.generar_json_exportacion_tablas(_ignore_zero));
}
