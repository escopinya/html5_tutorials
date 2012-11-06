var PuzzleView = function (canvas_id, width, height, imageObject){
    this.PUZZLE_HOVER_TINT = '#009900';
	this.canvas_id = canvas_id;
	this.canvasWidth = width;
	this.canvasHeight = height;
	this.img = imageObject;
	this.canvas;
	this.stage;		
	
	this.selectPieceEffect = selectPieceEffect;	
	function selectPieceEffect(_mouse, _currentPiece,_pieceWidth, _pieceHeight){
		this.stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,_pieceWidth,_pieceHeight);
		this.stage.save();
		this.stage.globalAlpha = .9;
		this.stage.drawImage(this.img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
		this.stage.restore();	
	}		
}

PuzzleView.prototype.getStage = function() {return this.stage;}

PuzzleView.prototype.getOffsetLeft = function() {return this.canvas.offsetLeft;};	

PuzzleView.prototype.getOffsetTop = function() {return this.canvas.offsetTop;};	

PuzzleView.prototype.init = function() {
	this.canvas = document.getElementById(this.canvas_id);
	this.stage = this.canvas.getContext('2d');
	this.canvas.width = this.canvasWidth;
	this.canvas.height = this.canvasHeight;
	this.canvas.style.border = "1px solid black";
	this.stage.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight);	
	this._showMessage("Click to Start Puzzle");			
}

PuzzleView.prototype.drawScenario  = function(_pieces, _pieceWidth, _pieceHeight){	
	this._clearStage();
	var i;
	var piece;
	var xPos = 0;
	var yPos = 0;
	
	for(i = 0;i < _pieces.length;i++){	
		piece = _pieces[i];
		piece.xPos = xPos;			
		piece.yPos = yPos;
		this.stage.drawImage(this.img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, xPos, yPos, _pieceWidth, _pieceHeight);
		this.stage.strokeRect(xPos, yPos, _pieceWidth,_pieceHeight);
		xPos += _pieceWidth;
		if(xPos >= this.canvasWidth){
			xPos = 0;
			yPos += _pieceHeight;
		}
	}		
	
}

PuzzleView.prototype.movePieceEffect = function(_mouse,_currentPiece,_pieces,_pieceWidth,_pieceHeight){
	var currentDropPiece = null;
	this._clearStage();
	var i;
	var piece;
	for(i = 0;i < _pieces.length;i++){
		piece = _pieces[i];
		if(piece == _currentPiece){
			continue;
		}
		this.stage.drawImage(this.img, piece.sx, piece.sy, _pieceWidth, _pieceHeight, piece.xPos, piece.yPos, _pieceWidth, _pieceHeight);
		this.stage.strokeRect(piece.xPos, piece.yPos, _pieceWidth,_pieceHeight);
		if(currentDropPiece == null){
			if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
				//NOT OVER
			}
			else{
				currentDropPiece = piece;
				this.stage.save();
				this.stage.globalAlpha = .4;
				this.stage.fillStyle = this.PUZZLE_HOVER_TINT;
				this.stage.fillRect(currentDropPiece.xPos,currentDropPiece.yPos,_pieceWidth, _pieceHeight);
				this.stage.restore();
			}
		}
	}
	this.stage.save();
	this.stage.globalAlpha = .6;
	this.stage.drawImage(this.img, _currentPiece.sx, _currentPiece.sy, _pieceWidth, _pieceHeight, _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth, _pieceHeight);
	this.stage.restore();
	this.stage.strokeRect( _mouse.x - (_pieceWidth / 2), _mouse.y - (_pieceHeight / 2), _pieceWidth,_pieceHeight);
	return currentDropPiece;
}

PuzzleView.prototype.showGameOverMessage = function() {this._showMessage("Game Over")}

//Private functions
PuzzleView.prototype._clearStage = function() {this.stage.clearRect(0,0,this.canvasWidth,this.canvasHeight);}

PuzzleView.prototype._showMessage = function(msg){
	this.stage.fillStyle = "#000000";
	this.stage.globalAlpha = .4;
	this.stage.fillRect(100,this.canvasHeight - 40,this.canvasWidth - 200,40);
	this.stage.fillStyle = "#FFFFFF";
	this.stage.globalAlpha = 1;
	this.stage.textAlign = "center";
	this.stage.textBaseline = "middle";
	this.stage.font = "20px Arial";
	this.stage.fillText(msg,this.canvasWidth / 2,this.canvasHeight - 20);
}