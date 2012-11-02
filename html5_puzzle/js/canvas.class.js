function canvasClass(canvas_id, width, height, imageObject)
{
	var _canvas_id = canvas_id;
	var _canvasWidth = width;
	var _canvasHeight = height;
	var _img = imageObject;
	var _canvas;
	var _stage;
		
	this.init = init;	
	this.getStage = getStage;	
	this.drawScenario = drawScenario;	
	
	function getStage()   {return _stage;};	
	
	function init(){
		_canvas = document.getElementById(canvas_id);
		_stage = _canvas.getContext('2d');
		_canvas.width = width;
		_canvas.height = height;
		_canvas.style.border = "1px solid black";
		_stage.drawImage(_img, 0, 0, _canvasWidth, _canvasHeight, 0, 0, _canvasWidth, _canvasHeight);
		_createTitle("Click to Start Puzzle");
	}
	
	function drawScenario(_pieces, _pieceWidth, _pieceHeight){	
		_stage.clearRect(0,0,_canvasWidth,_canvasHeight);
		var i;
		var piece;
		var xPos = 0;
		var yPos = 0;
		
		for(i = 0;i < _pieces.length;i++){
			piece = _pieces[i];
			piece.xPos = xPos;
			alert(piece.xPos);
			piece.yPos = yPos;
			_stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
			_stage.strokeRect(xPos, yPos, _pieceWidth,_pieceHeight);
			xPos += _pieceWidth;
			if(xPos >= _canvasWidth){
				xPos = 0;
				yPos += _pieceHeight;
			}
		}
		
	}
		
		
		
		
		
		
		
	//Private functions
	function _createTitle(msg){
		_stage.fillStyle = "#000000";
		_stage.globalAlpha = .4;
		_stage.fillRect(100,_canvasHeight - 40,_canvasWidth - 200,40);
		_stage.fillStyle = "#FFFFFF";
		_stage.globalAlpha = 1;
		_stage.textAlign = "center";
		_stage.textBaseline = "middle";
		_stage.font = "20px Arial";
		_stage.fillText(msg,_canvasWidth / 2,_canvasHeight - 20);
	}
}	
	