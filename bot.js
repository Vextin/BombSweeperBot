var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(" ");
        var cmd = args[0];
       
        //args = args.splice(1);
        switch(cmd) {
            // !newgame
            case 'newgame':
			
				if(args[1] >= 5 && args[1] <= 12) {
					console.log(args[1]);
					gameMessage = createNewGameMessage(args[1]);
				} else if(args[1] > 12) {
					gameMessage = "Too big! 12 is the maximum game size."
				}else {
					gameMessage = createNewGameMessage(5);
				}
				
                bot.sendMessage({
                    to: channelID,
                    message: gameMessage
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});

function createNewGameMessage(boardSize){
	var maxDimensions = boardSize;
	var gameMessage = "";
	var boardArray = [[]];	
	for(var x = 0; x<=maxDimensions; x++){
		boardArray[x] = [];
		for(var y = 0; y<=maxDimensions; y++){
			boardArray[x][y] = 0;
		}
	}
	var row;
	var column;
	var numBombs = boardSize;
	for(var i = 0; i <= numBombs; i++){		
		var x = Math.round(Math.random() * maxDimensions);
		var y = Math.round(Math.random() * maxDimensions);
		
		
		boardArray[x][y] = 10;
	}
	
	for(var x=0; x<boardArray.length; x++) {
		for(var y=0; y<boardArray[0].length; y++) {
			thisTile = 0;
			
			for(var xadd=-1; xadd<=1; xadd++){
				for(var yadd=-1; yadd<=1; yadd++){
				
					if(xadd==0 && yadd == 0) continue;
					if(y+yadd < 0 || x+xadd < 0 || y+yadd > maxDimensions || x+xadd > maxDimensions) continue;
					if(boardArray[x][y] == 10) continue;
					if(boardArray[x+xadd][y+yadd] == 10) thisTile++;
				}
			}
			if(boardArray[x][y] == 0) boardArray[x][y] = thisTile;
		}
	}
	console.log(boardArray);
	
	for(row=0; row<maxDimensions; row++) {
		for(column=0; column<maxDimensions; column++) {
			switch(boardArray[row][column]){
				
				//assign emojis to each number and add them all to the final message string
				case 0: gameMessage += "|| :zero: ||  "; break;
				case 1: gameMessage += "|| :one: ||  "; break;
				case 2: gameMessage += "|| :two: ||  "; break;
				case 3: gameMessage += "|| :three: ||  "; break;
				case 4: gameMessage += "|| :four: ||  "; break;
				case 5: gameMessage += "|| :five: ||  "; break;
				case 6: gameMessage += "|| :six: ||  "; break;
				case 7: gameMessage += "|| :seven: ||  "; break;
				case 8: gameMessage += "|| :eight: ||  "; break;
				case 10: gameMessage += "|| :boom: ||  "; break;
				
			}
				
		}
		gameMessage += "\n \n";
	}
				
	return gameMessage;
}

/*
358
2 7
146
*/

