function Set_tiles()
{
	this.titulo='';
	this.H=0;
	this.W=0;
	this.traduccion='';
}

Set_tiles.prototype.obtener_dim_celda=function() {return this.H-2;}

Set_tiles.prototype.generar_cadena_css=function()
{
	var resultado="";
	var dim_celda=this.H-2;
	var total=this.W / this.H;
	var i=0;
	var x=0;

	resultado+="#tablas table."+this.titulo+" tr td {width: "+dim_celda+"px; height: "+dim_celda+"px; background-image: url(sets/"+this.titulo+".png);}\n";

	while(i < total)
	{
		resultado+="#tablas table."+this.titulo+" tr td.tipo_"+i+" {background-position: "+x+"px 0px;}\n";
		++i;
		x-=this.H;
	}

	resultado+="#herramientas #herramientas_tabla ul#listado_tiles."+this.titulo+" li {width: "+this.H+"px; height: "+this.H+"px;}\n";
	resultado+="#herramientas #herramientas_tabla ul#listado_tiles."+this.titulo+" li label {width: "+this.H+"px; height: "+this.H+"px; background-image: url(sets/"+this.titulo+".png); }\n";

	i=0;
	x=0;
	while(i < total)
	{
		resultado+="#herramientas #herramientas_tabla ul#listado_tiles."+this.titulo+" li.tipo_"+i+" label {background-position: "+x+"px 0px;}\n";
		++i;
		x-=this.H;
	}

	return resultado;
}

//Tipo a texto
Set_tiles.prototype.traducir=function(indice)
{
	if(!this.traduccion || !this.traduccion.length) return indice;
	else return this.traduccion[indice];
}

//Texto a tipo...
Set_tiles.prototype.traducir_inversa=function(texto)
{
	if(!this.traduccion || !this.traduccion.length) return texto;
	else return this.traduccion.indexOf(texto);
}

Set_tiles.prototype.rellenar_selector=function(ul)
{
	ul.className=this.titulo;

	var total=this.W / this.H;
	var i=0;

	function click_input(input, i)
	{
		input.onclick=function() {H.establecer_tipo_actual(i);}
	}

	while(i < total)
	{
		var li=document.createElement('li');
		li.className='tipo_'+i;
		ul.appendChild(li);

		var input=document.createElement('input');
		input.type='radio';
		input.name='tipo';
		input.value=i;
		input.id='selector_tile_'+i;
		li.appendChild(input);

		var label=document.createElement('label');
		label.htmlFor='selector_tile_'+i;
		li.appendChild(label);

		click_input(input, i);
		if(i==0) input.onclick();

		++i;
	}	
}
