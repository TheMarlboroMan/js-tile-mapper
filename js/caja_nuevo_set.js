function Caja_nuevo_set()
{
	let DOM_caja=document.getElementById('caja_nuevo_set');
	let DOM_btn_cerrar=document.getElementById('btn_cerrar_nuevo_set');
	let DOM_btn_crear=document.getElementById('btn_nuevo_set');

	let input_file=document.getElementById('file_nuevo_set');
	let input_w=document.getElementById('set_celda_w');
	let input_h=document.getElementById('set_celda_h');
	let input_title=document.getElementById('input_title');
	let input_style=document.getElementById('input_style');

	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.ocultar=function(){DOM_caja.classList.add('oculto');}

	DOM_btn_crear.onclick=() => {

		if(!FileReader) {
			alert("Operation not supported!");
			return;
		}

		if(!input_file.files) return;

		var fr = new FileReader();
		fr.onload=() => {
			let img=new Image();
			img.src=fr.result;
			CS.insertar_set(img.width, img.height, parseInt(input_w.value, 10), parseInt(input_h.value, 10), input_title.value, fr.result, input_style.value);
			CS.preparar_css();
			H.recargar_selector_tiles();
			input_file.value='';
		}
		fr.readAsDataURL(input_file.files[0]);
	};

	DOM_btn_cerrar.onclick=() => {this.ocultar();;}
}
