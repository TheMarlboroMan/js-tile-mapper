function Caja_exportacion()
{
	var DOM_caja=document.getElementById('caja_exportar');
	var DOM_p=document.getElementById('p_exportar');
	let DOM_check_ignorar_tipo_cero=document.getElementById('check_ignorar_tipo_cero');

	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.ocultar=function(){DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_p.innerHTML='';}
	this.rellenar=function(texto) {DOM_p.innerHTML=texto;}

	document.getElementById('btn_exportar_json').addEventListener('click', () => {this.exportar_json(DOM_check_ignorar_tipo_cero.checked)}, true);
	document.getElementById('btn_cerrar_exportar').addEventListener('click', () => {this.ocultar(); this.vaciar();}, true);
}

Caja_exportacion.prototype.exportar_json=function(_ignore_zero) {
	C_EXP.rellenar(M.generar_json_exportacion_tablas(_ignore_zero));
}
