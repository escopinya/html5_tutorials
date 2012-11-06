function PuzzleController(difficulty, imagePuzzleSrc, canvas_id){
	this.difficulty = difficulty;	
	this.imagePuzzleSrc = imagePuzzleSrc;
	this.canvas_id = canvas_id;
	
	this.puzzleMO;
	this.puzzleView;
	this.imagePuzzle;
	this.currentPiece;
	this.currentDropPiece;
}

PuzzleController.prototype.init = function() {				
	var fncThis = this;
	
	//Load Multimedia		
	this.imagePuzzle = new Image();		
	this.imagePuzzle.addEventListener('load',function(){fncThis.initGame()},false);
	this.imagePuzzle.src = this.imagePuzzleSrc;								
}	   

PuzzleController.prototype.initGame = function() {			
	this.puzzleMO = new PuzzleMO(this.imagePuzzle.width, this.imagePuzzle.height, this.difficulty);
	this.puzzleMO.init();   		
	this.puzzleView = new PuzzleView(this.canvas_id, this.imagePuzzle.width, this.imagePuzzle.height, this.imagePuzzle);			
	this.puzzleView.init();				
	
	var fncThis = this;
	document.onmousedown = function(e){fncThis.startGame(e)};
}	

PuzzleController.prototype.startGame = function(e){									
	this.puzzleView.drawScenario(this.puzzleMO.getPieces(), this.puzzleMO.getPieceWidth(), this.puzzleMO.getPieceHeight());					
	var fncThis = this;
	document.onmousedown = function(e){fncThis.gameRun(e)};	
}	

PuzzleController.prototype.gameRun = function(e){						
	var mouse = this._getMousePosition(e); 		
	var fncThis = this;
	this.currentPiece = this.puzzleMO.getPieceClicked(mouse);
		
	if(this.currentPiece != null){
		this.puzzleView.selectPieceEffect(mouse, this.currentPiece,this.puzzleMO.getPieceWidth(), this.puzzleMO.getPieceHeight());
		document.onmousedown = null;
		document.onmousemove =  function(e){fncThis.gameRun_movePiece(e)};	
		document.onmouseup =  function(e){fncThis.gameRun_dropPiece(e)};	
	}						
}		

PuzzleController.prototype.gameRun_movePiece = function(e){
	var mouse = this._getMousePosition(e); 		
	this.currentDropPiece = this.puzzleView.movePieceEffect(mouse, this.currentPiece, this.puzzleMO.getPieces(), this.puzzleMO.getPieceWidth(), this.puzzleMO.getPieceHeight());					
}	

PuzzleController.prototype.gameRun_dropPiece = function(e){
	var endGame = false;
	var fncThis = this;
	document.onmousedown = null;
	document.onmousemove = null;
	document.onmouseup = null;

	//update puzzle with dropped piece            
	if (this.currentDropPiece!=null) this.puzzleMO.togglePieces(this.currentPiece,this.currentDropPiece);							
	this.puzzleView.drawScenario(this.puzzleMO.getPieces(), this.puzzleMO.getPieceWidth(), this.puzzleMO.getPieceHeight());			

	//check end game
	endGame = this.puzzleMO.isOrdered();
	
	if (!endGame) document.onmousedown = function(e){fncThis.gameRun(e)};			
	else this.gameOver();									
}

PuzzleController.prototype.gameOver = function(){						
	var fncThis = this;
	
	document.onmousedown = null;
	document.onmousemove = null;
	document.onmouseup = null;
	this.puzzleView.showGameOverMessage();			
	setTimeout(function(){fncThis.initGame()},2000);
}		

// Auxiliar functions
PuzzleController.prototype._getMousePosition = function(e){
	var mouse = {x:0,y:0};
	if(e.layerX || e.layerX == 0){
		mouse.x = e.layerX - this.puzzleView.getOffsetLeft();
		mouse.y = e.layerY - this.puzzleView.getOffsetTop();
	}
	else if(e.offsetX || e.offsetX == 0){
		mouse.x = e.offsetX - this.puzzleView.getOffsetLeft();
		mouse.y = e.offsetY - this.puzzleView.getOffsetTop();
	}	
	return mouse
}		
	
