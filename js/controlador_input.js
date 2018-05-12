function Controlador_input() {

	this.ULTIMO_CLICK_X=-1;
	this.ULTIMO_CLICK_Y=-1;

	this.dialogos=[];

	let ocultar_dialogos=(_except) => {
		this.dialogos.forEach((_item) => {
			if(!_except || _except!=_item) {
				_item.cerrar();
			}
		});
	}

	window.addEventListener('keydown', (_event) => {

//		console.log(_event);

		switch(_event.keyCode) {
			//F1
			case 112: H.intercambiar_ayuda(); 
			break
			case 27: ocultar_dialogos(); break;
			//Next and Prev Page.
			case 33: M.seleccionar_tabla_por_indice(M.obtener_indice_tabla_actual()-1);
			break;
			case 34: M.seleccionar_tabla_por_indice(M.obtener_indice_tabla_actual()+1);
			break;
			case 32: let v=H.es_visible();
				ocultar_dialogos(); 
				if(!v) H.mostrar();
			break; 
			case 76: ocultar_dialogos(C_IMP);
				C_IMP.mostrar(); 
			break;
			case 83: ocultar_dialogos(C_EXP);
				C_EXP.mostrar(); 
			break;
			case 78: M.nueva_tabla(); 
			break;
			case 65: ocultar_dialogos(CA);
				CA.mostrar(M);
			break;
			case 37:
			case 38:
			case 39:
			case 40: if(_event.ctrlKey) {
					M.trasladar(_event.keyCode-37);
				}
			break;
		}
	}, true);
}

Controlador_input.prototype.suscribir_dialogos=function(_items) {

	_items.forEach((_item) => {
		if(-1!==this.dialogos.indexOf(_item)) {
			throw new Error("Cannot subscribe the same item twice to dialogs");
		}

		if(undefined===_item.cerrar) {
			throw new Error("Cannot subscribe to dialogs when close is not implemented");
		}

		this.dialogos.push(_item);
	});
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
