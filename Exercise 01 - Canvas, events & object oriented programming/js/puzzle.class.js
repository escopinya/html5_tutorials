function puzzleClass(width, height, difficulty)
{
	var _difficulty = difficulty;
	var _puzzleWidth = width;
	var _puzzleHeight = height;
	var _pieces = [];
	var _pieceWidth;
	var _pieceHeight;
	var _currentPiece;
	var _currentDropPiece;  	
	
	this.init = init;

	this.getWidth =  getWidth;
	this.getHeight = getHeight;	
	this.getPieces = getPieces;
	this.getPieceWidth =  getPieceWidth;
	this.getPieceHeight = getPieceHeight;		
	this.getPieceClicked = getPieceClicked;
	this.togglePieces = togglePieces;
	this.isOrdered = isOrdered;
	
	function getWidth() {return _puzzleWidth;};
	function getHeight() {return _puzzleHeight;};	
	function getPieces() {return _pieces;};
	function getPieceWidth() {return _pieceWidth;};	
	function getPieceHeight() {return _pieceHeight;};	
	
	
	function init(){
		_pieceWidth = Math.floor(_puzzleWidth / _difficulty);
		_pieceHeight = Math.floor(_puzzleHeight / _difficulty);
        _currentPiece = null;
        _currentDropPiece = null;				
		_buildPieces();
		_pieces = _shuffleArray(_pieces);
	}
	
	function getPieceClicked(_mouse){	
		var i;
		var piece;	
		
		for(i = 0;i < _pieces.length;i++){
			piece = _pieces[i];
			if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + _pieceWidth) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + _pieceHeight)){
				//PIECE NOT HIT
			}
			else{
				return piece;
			}
		}
		return null;		
	}

	function togglePieces (_piece1, _piece2){
		var piece1Position = _piece1.currentPosition;
		var piece2Position = _piece2.currentPosition;
		
		_pieces[piece1Position] = _piece2; 		
		_pieces[piece2Position] = _piece1; 
		_pieces[piece1Position].currentPosition = piece1Position; 
		_pieces[piece2Position].currentPosition = piece2Position; 		
	}
	
	function isOrdered(){
		var returnValue=true;
		var i=0;
		
		while (i<_pieces.length && returnValue){
			returnValue = (_pieces[i].currentPosition == _pieces[i].originalPosition);
			i++;
		}
	
		return returnValue;
	}	
	
	//Private functions
	function _buildPieces(){
		var i;
		var piece;
		var xPos = 0;
		var yPos = 0;
		for(i = 0;i < _difficulty * _difficulty;i++){
			piece = {};
			piece.sx = xPos;
			piece.sy = yPos;
			piece.originalPosition = i;
			piece.currentPosition = i;
			_pieces.push(piece);
			xPos += _pieceWidth;
			if(xPos >= _puzzleWidth){
				xPos = 0;
				yPos += _pieceHeight;
			}
		}		
	}
	
	function _shuffleArray(theArray){
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
		//for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		//return o;
	}
	
}	
	