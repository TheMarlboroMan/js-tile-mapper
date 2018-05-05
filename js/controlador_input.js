function Controlador_input() {

	this.ULTIMO_CLICK_X=-1;
	this.ULTIMO_CLICK_Y=-1;

	window.addEventListener('keydown', (event) => {
		switch(event.keyCode) {
			case 32: H.intercambiar(null); break; //Space to show/hide.
			case 27: H.ocultar(); break; //Esc to hide tools.
		}
	}, true);
}

Controlador_input.prototype.click_celda=function(event, celda) {

	var evento=event ? event : window.event;

	let c=H.obtener_tipo_actual();
	let x=parseInt(celda.getAttribute('data-x'), 10);
	let y=parseInt(celda.getAttribute('data-y'), 10);

	if(evento.ctrlKey) {
		let celda=M.obtener_celda_coordenadas(x, y);
		CA.mostrar(celda);
	}

	//Trazar líneas...
	else if(evento.shiftKey) {

		if(this.ULTIMO_CLICK_X < 0 || this.ULTIMO_CLICK_Y < 0)  {
			return;
		}
		else {
			if(x==this.ULTIMO_CLICK_X && y==this.ULTIMO_CLICK_Y) {
				return;
			}
			else {
				let traza_linea=(_dim, _ultimo_click, _hor) => {
					var ini=_dim < _ultimo_click ? _dim : _ultimo_click;
					var fin=_dim > _ultimo_click ? _dim : _ultimo_click;
					while(ini <= fin) {
						if(_hor) 	M.actualizar_modelo(ini++, y, c);
						else 		M.actualizar_modelo(x, ini++, c);
					}
					M.volcar_modelo_en_DOM();
				}

				if(x==this.ULTIMO_CLICK_X) {
					traza_linea(y, this.ULTIMO_CLICK_Y, false);
				}
				else if(y==this.ULTIMO_CLICK_Y) {
					traza_linea(x, this.ULTIMO_CLICK_X, true);
				}
			}
		}
	}
	//Regular click.
	else {
		M.actualizar_modelo(x, y, c);
		M.volcar_modelo_en_DOM(); //Killing flies with a flak cannon: just one changed, all are refreshed XD.
	}

	this.ULTIMO_CLICK_X=parseInt(celda.getAttribute('data-x'), 10);
	this.ULTIMO_CLICK_Y=parseInt(celda.getAttribute('data-y'), 10);
}
