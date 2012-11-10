function PuzzleController(difficulty, multimediaSrcFiles, canvas_id){
	this.difficulty = difficulty;	
	this.multimediaSrcFiles = multimediaSrcFiles;
	this.canvas_id = canvas_id;
	
	this.puzzleMO;
	this.puzzleView;	
	this.imageFiles = new Array();	
	this.soundFiles = new Array();	
	this.currentPiece;
	this.currentDropPiece;
}

PuzzleController.prototype.init = function() {				
	var fncThis = this;
	
	//Load Multimedia		
	this.soundFiles["puzzleSoundPieceSelect"] = new Audio();		
	this.soundFiles["puzzleSoundPieceSelect"].src = this.multimediaSrcFiles['puzzleSoundPieceSelect'];
	
	this.soundFiles["puzzleSoundPieceDrop"] = new Audio();		
	this.soundFiles["puzzleSoundPieceDrop"].src = this.multimediaSrcFiles['puzzleSoundPieceDrop'];
	
	this.soundFiles["puzzleSoundGameStart"] = new Audio();		
	this.soundFiles["puzzleSoundGameStart"].src = this.multimediaSrcFiles['puzzleSoundGameStart'];

	this.soundFiles["puzzleSoundGameEnd"] = new Audio();		
	this.soundFiles["puzzleSoundGameEnd"].src = this.multimediaSrcFiles['puzzleSoundGameEnd'];
	
	this.imageFiles["puzzleImage"] = new Image();		
	this.imageFiles["puzzleImage"].addEventListener('load',function(){fncThis.initGame()},false);
	this.imageFiles["puzzleImage"].src = this.multimediaSrcFiles['puzzleImage'];			
}	   

PuzzleController.prototype.initGame = function() {			
	this.puzzleMO = new PuzzleMO(this.imageFiles["puzzleImage"].width, this.imageFiles["puzzleImage"].height, this.difficulty);
	this.puzzleMO.init();   		
	this.puzzleView = new PuzzleView(this.canvas_id, this.imageFiles["puzzleImage"].width, this.imageFiles["puzzleImage"].height, this.imageFiles);			
	this.puzzleView.init();				
	
	var fncThis = this;
	document.onmousedown = function(e){fncThis.startGame(e)};
}	

PuzzleController.prototype.startGame = function(e){										
	this.soundFiles["puzzleSoundGameStart"].play();	
	
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
		this.soundFiles["puzzleSoundPieceSelect"].play();	
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
	
	this.soundFiles["puzzleSoundPieceDrop"].play();	
		
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
	this.soundFiles["puzzleSoundGameEnd"].play();		
	this.puzzleView.showGameOverMessage();			
	setTimeout(function(){fncThis.initGame()},5000);
	
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


PuzzleController.prototype._loadMultimedia = function (){

}
