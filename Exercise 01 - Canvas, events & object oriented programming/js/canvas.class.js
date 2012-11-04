function canvasClass(canvas_id, width, height, imageObject)
{
    const PUZZLE_HOVER_TINT = '#009900';
	var _canvas_id = canvas_id;
	var _canvasWidth = width;
	var _canvasHeight = height;
	var _img = imageObject;
	var _canvas;
	var _stage;
		
	this.init = init;	
	this.getStage = getStage;	
	this.drawScenario = drawScenario;	
	this.getOffsetLeft = getOffsetLeft;
	this.getOffsetTop = getOffsetTop;
	this.selectPieceEffect = selectPieceEffect;
	this.movePieceEffect = movePieceEffect;
	this.showGameOverMessage = showGameOverMessage;
		
	function getStage()   {return _stage;};	
	function getOffsetLeft()   {return _canvas.offsetLeft;};	
	function getOffsetTop()   {return _canvas.offsetTop;};	
	
	function init(){
		_canvas = document.getElementById(canvas_id);
		_stage = _canvas.getContext('2d');
		_canvas.width = width;
		_canvas.height = height;
		_canvas.style.border = "1px solid black";
		_stage.drawImage(_img, 0, 0, _canvasWidth, _canvasHeight, 0, 0, _canvasWidth, _canvasHeight);	
		_showMessage("Click to Start Puzzle");			
	}
	
	function drawScenario(_pieces, _pieceWidth, _pieceHeight){	
		_clearStage();
		var i;
		var piece;
		var xPos = 0;
		var yPos = 0;
		
		for(i = 0;i < _pieces.length;i++){	
			piece = _pieces[i];
			piece.xPos = xPos;			
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
	
	function selectPieceEffect(_mouse, _currentPiece,_pieceWidth, _pieceHeight){
		_stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,_pieceWidth,_pieceHeight);
		_stage.save();
		_stage.globalAlpha = .9;
		_stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
		_stage.restore();		
	}		

    function movePieceEffect(_mouse,_currentPiece,_pieces,_pieceWidth,_pieceHeight){
		var currentDropPiece = null;
		_clearStage();
		var i;
		var piece;
		for(i = 0;i < _pieces.length;i++){
			piece = _pieces[i];
			if(piece == _currentPiece){
				continue;
			}
			_stage.drawImage(_img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
			_stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
			if(currentDropPiece == null){
				if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
					//NOT OVER
				}
				else{
					currentDropPiece = piece;
					_stage.save();
					_stage.globalAlpha = .4;
					_stage.fillStyle = PUZZLE_HOVER_TINT;
					_stage.fillRect(currentDropPiece.xPos,currentDropPiece.yPos,_pieceWidth, _pieceHeight);
					_stage.restore();
				}
			}
		}
		_stage.save();
		_stage.globalAlpha = .6;
		_stage.drawImage(_img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
		_stage.restore();
		_stage.strokeRect( _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth,_pieceHeight);
		return currentDropPiece;
    }
	
	function showGameOverMessage (){_showMessage("Game Over")}
	
	//Private functions
	function _clearStage() {_stage.clearRect(0,0,_canvasWidth,_canvasHeight);}
	
	function _showMessage(msg){
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
	