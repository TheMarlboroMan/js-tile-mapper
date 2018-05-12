function Caja_importacion() {
	var DOM_caja=document.getElementById('caja_importar');
	var DOM_textarea=document.getElementById('textarea_importar');

	this.mostrar=function() {DOM_caja.classList.remove('oculto');}
	this.cerrar=function() {DOM_caja.classList.add('oculto');}
	this.vaciar=function() {DOM_textarea.value='';}

	let input_file=document.getElementById('file_importar');
	
	document.getElementById('btn_cerrar_importar').addEventListener('click', () => {this.cerrar();}, true);
	document.getElementById('btn_importar_json').addEventListener('click', () => {

		if(DOM_textarea.value.length) {
			M.importar_json(DOM_textarea.value);
			this.cerrar();
		}
		else if(input_file.files) {
			if(!FileReader) {
				alert("Import operation not supported!");
				this.cerrar();
			}

			var fr = new FileReader();
			fr.onload=() => {
				M.importar_json(fr.result);
				this.cerrar();
			};
			fr.readAsText(input_file.files[0]);
		}
	}, true);
}
