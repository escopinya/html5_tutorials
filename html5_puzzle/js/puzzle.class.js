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
			_pieces.push(piece);
			xPos += _pieceWidth;
			if(xPos >= _puzzleWidth){
				xPos = 0;
				yPos += _pieceHeight;
			}
		}		
	}
	
	function _shuffleArray(o){
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
}	
	
	/*
	var _img_src = img_src;		
	var _difficulty = difficulty;
	var _img;
	var _pieces;
	var _puzzleWidth;
	var _puzzleHeight;
	var _pieceWidth;
	var _pieceHeight;
	var _currentPiece;
	var _currentDropPiece;  	
	
	this.init = init;
	this._onImage = _onImage;
	this.getWidth =  getWidth;
	this.getHeight = getHeight;
	
	function init(){
		_img = new Image();
		_img.addEventListener('load',_onImage,false);
		_img.src = _img_src;	
		
	}

	function getWidth() {return _puzzleWidth};
	function getHeight() {return _puzzleHeight};
		
	function _onImage(e){
		_pieceWidth = Math.floor(_img.width / _difficulty)
		_pieceHeight = Math.floor(_img.height / _difficulty)
		_puzzleWidth = _pieceWidth * _difficulty;
		_puzzleHeight = _pieceHeight * _difficulty;				
	}
*/	
/*   
   this.SetText = SetText;
    this.ShowText = DisplayText; 

    function DisplayText()
    {
        alert( m_text );
        return;
    }

    function SetText( myText ) 
    {
        m_text = myText;
    }
	*/
