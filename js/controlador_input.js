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

	if(!evento.shiftKey) {
		//TODO: Act upon the model, let the model attack the cell.
		H.establecer_clase_celda(celda);
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
						//TODO: Change for something that says DOM... 
						//or maybe not, this is the origin.
						var c=CT.obtener_celda_coordenadas(x, ini++);
						//TODO: Act upon the model, have the model attack the cell.
						if(c) H.establecer_clase_celda(c);
					}
				}
				else if(y==this.ULTIMO_CLICK_Y) {
					var ini=x < this.ULTIMO_CLICK_X ? x : this.ULTIMO_CLICK_X;
					var fin=x > this.ULTIMO_CLICK_X ? x : this.ULTIMO_CLICK_X;

					while(ini <= fin) {
						//TODO: The DOM thing.
						var c=CT.obtener_celda_coordenadas(ini++, y);
						//TODO: Act upon the model.
						if(c) H.establecer_clase_celda(c);
					}
				}
			}
		}
	}

	this.ULTIMO_CLICK_X=parseInt(celda.getAttribute('data-x'), 10);
	this.ULTIMO_CLICK_Y=parseInt(celda.getAttribute('data-y'), 10);
}
