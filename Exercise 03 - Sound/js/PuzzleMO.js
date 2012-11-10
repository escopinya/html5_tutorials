var PuzzleMO = function (width, height, difficulty){
	this.difficulty = difficulty;
	this.puzzleWidth = width;
	this.puzzleHeight = height;
	this.pieces = [];
	this.pieceWidth;
	this.pieceHeight;
}

PuzzleMO.prototype.init = function() {
		this.pieceWidth = Math.floor(this.puzzleWidth / this.difficulty);
		this.pieceHeight = Math.floor(this.puzzleHeight / this.difficulty);		
		this._buildPieces();
		this.pieces = this._shuffleArray(this.pieces);
}

PuzzleMO.prototype.getWidth = function() {return this.puzzleWidth;};

PuzzleMO.prototype.getHeight = function() {return this.puzzleHeight;};	

PuzzleMO.prototype.getPieces = function() {return this.pieces;};

PuzzleMO.prototype.getPieceWidth = function() {return this.pieceWidth;};	

PuzzleMO.prototype.getPieceHeight = function() {return this.pieceHeight;};	
		
PuzzleMO.prototype.getPieceClicked = function(_mouse){	
	var i;
	var piece;	
	
	for(i = 0;i < this.pieces.length;i++){
		piece = this.pieces[i];
		if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + this.pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + this.pieceHeight)){
			//PIECE NOT HIT
		}
		else{
			return piece;
		}
	}
	return null;		
}

PuzzleMO.prototype.togglePieces = function(_piece1, _piece2){
	var piece1Position = _piece1.currentPosition;
	var piece2Position = _piece2.currentPosition;
	
	this.pieces[piece1Position] = _piece2; 		
	this.pieces[piece2Position] = _piece1; 
	this.pieces[piece1Position].currentPosition = piece1Position; 
	this.pieces[piece2Position].currentPosition = piece2Position; 		
}
	
PuzzleMO.prototype.isOrdered = function(){
	var returnValue=true;
	var i=0;
	
	while (i<this.pieces.length && returnValue){
		returnValue = (this.pieces[i].currentPosition == this.pieces[i].originalPosition);
		i++;
	}

	return returnValue;
}	
	
//Private functions
PuzzleMO.prototype._buildPieces = function (){
	var i;
	var piece;
	var xPos = 0;
	var yPos = 0;
	for(i = 0;i < this.difficulty * this.difficulty;i++){
		piece = {};
		piece.sx = xPos;
		piece.sy = yPos;
		piece.originalPosition = i;
		piece.currentPosition = i;
		this.pieces.push(piece);
		xPos += this.pieceWidth;
		if(xPos >= this.puzzleWidth){
			xPos = 0;
			yPos += this.pieceHeight;
		}
	}		
}
	
PuzzleMO.prototype._shuffleArray = function(theArray){
	var len = theArray.length;
	var i = len;
	 while (i--) {
		var p = parseInt(Math.random()*len);
		var t = theArray[i];
		theArray[i] = theArray[p];
		theArray[p] = t;
		//update current position
		theArray[i].currentPosition = i;
		theArray[p].currentPosition = p;			
	}		
	return theArray;
}
	