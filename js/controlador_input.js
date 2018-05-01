function Controlador_input() {
	this.ULTIMO_CLICK_X=-1;
	this.ULTIMO_CLICK_Y=-1;

	window.onclick=function(event) 	{
		if (!event) var event=window.event;
		if(event.ctrlKey)
		{
			H.intercambiar(event);
			event.preventDefault();
			return false;
		}
	}

	window.onkeydown=function(event) {
		switch(event.keyCode) {
			case 27: H.ocultar(); break;
		}
	}
}

Controlador_input.prototype.click_celda=function(event, celda) {
	var evento=event ? event : window.event;

	let c=H.obtener_tipo_actual();

	if(!evento.shiftKey) {
		let x=parseInt(celda.getAttribute('data-x'), 10);
		let y=parseInt(celda.getAttribute('data-y'), 10);
		CT.actualizar_modelo(x, ini++, c):
		//TODO: Killing flies with a flak cannon.
		CT.volcar_modelo_en_DOM();
	}
	else {
		if(this.ULTIMO_CLICK_X < 0 || this.ULTIMO_CLICK_Y < 0)  {
			return;
		}
		else {
			var x=parseInt(celda.getAttribute('data-x'), 10);
			var y=parseInt(celda.getAttribute('data-y'), 10);

			if(x==this.ULTIMO_CLICK_X && y==this.ULTIMO_CLICK_Y) {
				return;
			}
			else {
				if(x==this.ULTIMO_CLICK_X) {
					var ini=y < this.ULTIMO_CLICK_Y ? y : this.ULTIMO_CLICK_Y;
					var fin=y > this.ULTIMO_CLICK_Y ? y : this.ULTIMO_CLICK_Y;

					while(ini <= fin) {
						CT.actualizar_modelo(x, ini++, c):
					}
					CT.volcar_modelo_en_DOM();

				}
				else if(y==this.ULTIMO_CLICK_Y) {
					var ini=x < this.ULTIMO_CLICK_X ? x : this.ULTIMO_CLICK_X;
					var fin=x > this.ULTIMO_CLICK_X ? x : this.ULTIMO_CLICK_X;

					while(ini <= fin) {
						CT.actualizar_modelo(ini++, y, c);
					}
					CT.volcar_modelo_en_DOM();
				}
			}
		}
	}

	this.ULTIMO_CLICK_X=parseInt(celda.getAttribute('data-x'), 10);
	this.ULTIMO_CLICK_Y=parseInt(celda.getAttribute('data-y'), 10);
}
