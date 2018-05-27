function Caja_nuevo_set()
{
	let DOM_caja=document.getElementById('caja_nuevo_set');
	let DOM_btn_cerrar=document.getElementById('btn_cerrar_nuevo_set');
	let DOM_btn_crear=document.getElementById('btn_crear_set');

	let input_file=document.getElementById('file_nuevo_set');
	let input_w=document.getElementById('set_celda_w');
	let input_h=document.getElementById('set_celda_h');
	let input_title=document.getElementById('input_title');
	let input_style=document.getElementById('input_style');

	this.mostrar=function(){DOM_caja.classList.remove('oculto');}
	this.cerrar=function(){DOM_caja.classList.add('oculto');}
	this.reiniciar=() => {
		input_file.value='';
		input_w.value=32;
		input_h.value=32;
		input_title.value='';
		input_style.value='';
	}

	DOM_btn_cerrar.onclick=() => {this.cerrar();}
	DOM_btn_crear.onclick=() => {
		if(!FileReader) {
			alert("Operation not supported!");
			return;
		}

		if(!input_file.files) {
			alert("Please, add files");
			return;
		}

		var fr = new FileReader();
		fr.onload=() => {
			let img=new Image();
			img.onload=() => {
				CS.insertar_set(img.width, img.height, parseInt(input_w.value, 10), parseInt(input_h.value, 10), input_title.value, fr.result, input_style.value);
				CS.preparar_css();
				H.recargar_selector_tiles();
				this.reiniciar();
				this.cerrar();
			}
			img.src=fr.result;

		}
		fr.readAsDataURL(input_file.files[0]);
	};
}
