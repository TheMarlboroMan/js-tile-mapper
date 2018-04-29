var CI=null;
var CT=null;
var CS=null;
var H=null;
var C_IMP=null;
var C_EXP=null;

window.onload=function() {
	function procesar_carga() {
		C_EXP=new Caja_exportacion();
		C_IMP=new Caja_importacion();
		C_NS=new Caja_nuevo_set();
		CI=new Controlador_input();
		H=new Herramientas_tabla();
		H.recargar_selector_tiles();
		H.recargar_listado_tiles(0);
		CT=new Controlador_tablas();
		CT.iniciar();
	}

	CS=new Controlador_sets();
	CS.iniciar(procesar_carga);
}
