function Caja_exportacion()
{
	var DOM_caja=document.getElementById('caja_exportar');
	var DOM_p=document.getElementById('p_exportar');
	let DOM_check_ignorar_tipo_cero=document.getElementById('check_ignorar_tipo_cero');
	this.DOM_link=document.getElementById('link_exportar');
	this.DOM_txt=document.getElementById('txt_exportar');

	this.DOM_txt.addEventListener('change', () => {
		this.DOM_link.setAttribute('download', this.DOM_txt.value);
	}, true);

	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.ocultar=function(){DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_p.innerHTML='';}

	this.rellenar=function(texto) {DOM_p.innerHTML=texto; DOM_p.select();}
	this.url_generada=null;

	document.getElementById('btn_exportar_json').addEventListener('click', () => {this.exportar_json(DOM_check_ignorar_tipo_cero.checked)}, true);
	document.getElementById('btn_cerrar_exportar').addEventListener('click', () => {this.cerrar();}, true);
}

Caja_exportacion.prototype.exportar_json=function(_ignore_zero) {

	let text=M.generar_json_exportacion_tablas(_ignore_zero);
	C_EXP.rellenar(text);

	var data=new Blob([text], {'type': 'text/plain'});
	if(this.url_generada) {
		window.URL.revokeObjectUrl(this.url_generada);
	}

	this.url_generada=window.URL.createObjectURL(data);
	this.DOM_link.href=this.url_generada;
	this.DOM_link.classList.remove('oculto');
	this.DOM_txt.classList.remove('oculto');
}

Caja_exportacion.prototype.cerrar=function() {
	this.DOM_link.href='';
	this.DOM_link.classList.add('oculto');
	this.DOM_txt.value='map.json';
	this.DOM_txt.classList.add('oculto');
	this.url_generada=null;
	this.ocultar(); 
	this.vaciar()
}
