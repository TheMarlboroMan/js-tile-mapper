var CI=null;
var M=null;
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
		CA=new Caja_atributos();
		H=new Herramientas_tabla();

		CI.suscribir_dialogos([H, CA, C_EXP, C_IMP, C_NS]);

		H.recargar_selector_tiles();
		H.recargar_listado_tiles(CS.obtener_set_por_indice(0).classname);
		M=new Mapa();
	}

	CS=new Controlador_sets();
	CS.iniciar(procesar_carga);
}
