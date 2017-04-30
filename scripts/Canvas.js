class Canvas {
	constructor() {
		
	}
	
	/*
	 * Function to reset the canvas element.
	*/
	cleanUpSpace(){
		var bc = document.getElementById('barchartcanvas');
		var lc = document.getElementById('linechartcanvas');
		var pc = document.getElementById('piechartcanvas');
		var sc = document.getElementById('stackedchartcanvas');
		var pic = document.getElementById('pivotchartcanvas');
		
		if(bc != undefined){
			bc.remove();
		}
		if(lc != undefined){
			lc.remove();
		}
		if(pc != undefined){
			pc.remove();
		}
		if(sc != undefined){
			sc.remove();
		}
		if(pic != undefined){
			pic.remove();
		}
	}
	
	/*
	 *Function to create a canvas chart element and append to the parent div.
	*/
	createCanvasElement(chartType){
		var canvas = document.createElement('canvas');
		canvas.id=chartType;
		canvas.class="chartCanvas";
		document.getElementById('childChart').appendChild(canvas);
	}
}