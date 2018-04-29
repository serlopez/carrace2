Race.Game = function(game){
  this.player = null;
  this.burrito = null;
  this.glove = null;
  this.medals = null;
  this.medalArray = [];
  this.fontStyle = null;
  this.speed=4;
  this.burritoCounter = 0;
  this.medalPos = 800;
  this.medalFrame = 0;
  this.i=0;
  this.j=0;
  
  this.score = 0;
  Race._health = 0;
  Race._medals = null;
};
Race.Game.prototype = {
  create: function(game){
    var tag = null;
    var nickname = null;
    var car = null;
    var ask = true;
      while(ask){
	      tag = prompt ("Please enter your tag" , "");
	      if (tag === null || tag.length > 20) {//user cancelled
		      ask = false;
		      break;
	      }
	      else if (tag !== '' && isNaN(Number(tag))) {
		      break;
	      }
      }
      while(ask){
	      nickname = prompt ("Now enter your nickname" , "");
	      if (nickname === null || nickname.length > 20) {//user cancelled
		      ask = false;
		      break;
	      }
	      else if (nickname !== '' && isNaN(Number(nickname))) {
		      break;
	      }
      }
      while(ask){
	      car = prompt ("Choose your car (1, 2, 3): " , "");
	      if (car === null) {//user cancelled
		      ask = false;
		      break;
	      }
	      else if (car.length == 1 && !isNaN(parseInt(car))) {
		      break;
	      }
      }
    document.getElementById("tag").innerHTML = tag;
    document.getElementById("nickname").innerHTML = nickname;
    document.getElementById("car").innerHTML = car;
    console.log(tag);
    console.log(nickname);
    console.log(car);
    this.bg = this.add.tileSprite(0, 0, this.stage.bounds.width, this.cache.getImage('background').height, 'background');
    this.houses = this.add.sprite(this.world.randomX, 178, 'houses');
    this.trees = this.add.sprite(this.world.randomX + 300, 150, 'trees');
    this.badge = this.add.sprite(this.world.centerX, 450, 'badge');
    this.houses.frame=0;
    this.trees.frame=0;
    var scoreText = "Score: "+this.score;
    this.scoreText = game.add.text(10, 400, scoreText);
    this.scoreText.font = 'Roboto Condensed';
    this.scoreText.fontSize = 40;
    this.scoreText.backgroundColor = "white";
    var badgeText = null;
    if(car == 1){
      this.player = this.add.sprite(100, 225, 'laPlaca');
      this.badgeText = " as la plaka";
    } else if (car == 2){
      this.player = this.add.sprite(100, 225, 'bookMobile');
      this.badgeText = "'s bookmobile";
    } else if(car == 3){
      this.player = this.add.sprite(100, 225, 'lastRental');
      this.badgeText = "'s last rental";
    }
    this.badgeText = game.add.text(this.world.centerX + 150, 450, nickname + this.badgeText);
    this.badgeText.font = 'Bangers';
    this.badgeText.fontSize = 40;
    this.world.bringToTop(this.player);
    this.burrito = this.add.sprite(1300, 280, 'burrito');
    this.world.bringToTop(this.burrito);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable([this.player, this.burrito]);
    
    this.player.body.collideWorldBounds = true;
    this.camera.follow(this.player);
    this.player.animations.add('roll',[0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1], 15, true);
    this.player.animations.add('ouch',[2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2], 15, false);
    this.player.play('roll');
    this.houses.frame=0;
    this.trees.frame=0;
  },
  update: function(game){
    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      this.player.play('roll');
      this.player.x -= this.speed;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      game.physics.arcade.overlap(this.player, this.burrito, this.playerHitBurrito, null, this);
      game.physics.arcade.overlap(this.player, this.glove, this.playerHitGlove, null, this);
      this.player.play('roll');
      this.player.x += this.speed/2;
      this.burrito.x -= this.speed;
      this.houses.x -= this.speed*2;
      this.trees.x -= this.speed*2;
      this.bg.tilePosition.x -= this.speed;
      this.player.angle=-0.5;
    }
    else{
      this.player.angle=0;
      this.player.play('idle');
    }
  },
  playerHitBurrito: function(game){
    if(this.glove){
      this.glove.kill();
    }
    this.burrito.kill();
    this.glove = this.add.sprite(800, 250, 'glove');
    this.glove.frame = 1;
    this.redLight = this.add.sprite(900, 150, 'redLight');
    this.glove.animations.add('punch', [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], 15, false);
    this.game.physics.arcade.enable([this.player, this.glove]);
    this.burritoCounter += 1;
    this.gloveHitCounter = 0;
    if(this.burritoCounter > 5){
      document.getElementById("score").innerHTML = this.score;
      document.getElementById("medals").innerHTML = this.medalArray;
      this.checkerFlag = this.add.sprite(100, 100, 'checkerFlag');
      this.player.destroy();
      }
  },
  playerHitGlove: function(game, i, j){
    while(this.gloveHitCounter === 0){
      var qArray = ["q1) Out of the four options below, pick the best description of a database.", "q2) It is important to know how to develop and use keywords when using databases because", "q3) Some of these articles are quite long, It could take a long time to read a whole one to see if we can use it.", "q4) You went to the databases and found several really good articles. Since it is not feasible to do all your research in one sitting, you will need to et to your articles later , you will", "q5) Library databases come with several tools that make your research. One of the tools you will probably use the most is"];
      var aArray = ["a1) An electronic container full of data, organized under certain rules.","a2) Articles in the computer found in the library.","a3) Microsoft Access","a4) Something you have to know about to be a hacker.", "a1) databases match articles with keywords, and your keywords should describe your topic." , "a2) we cannot type whole phrases, like in Google." , "a3) it is a useful skill to have." , "a4) card catalogs are gone now." , "a1) We don’t expect you to. Article abstracts and summaries do a pretty good job at that." , "a2) In most cases, a quick scan will tell how relevant the article is to your research." , "a3) That’s why you should only cite one or two articles." , "a4) But you can ask a librarian for articles no longer than 5 pages." , "a1) email all the articles to yourself using the library database’s email feature." , "a2) bookmark them or save them on each database you visit." , "a3) search for the articles again next time you need them." , "a4) google them." , "a1) citations, automatically made for each article you find, in the more popular styles." , "a2) download articles in full text." , "a3) permalinks to the articles." , "a4) autocomplete keyword fields."];
      var question = qArray[this.i];
      this.i++;
      this.question=this.game.add.text(game.world.centerX-300, 0, question);
      this.question.font='Roboto Condensed';
      this.question.fontSize = 25;
      this.question.backgroundColor = '#f5f5dc';
      this.question.wordWrap = true;
      this.question.wordWrapWidth = 900;
      var answer1 = aArray[this.j];
      this.j++;
      var answer2 = aArray[this.j];
      this.j++;
      var answer3 = aArray[this.j];
      this.j++;
      var answer4 = aArray[this.j];
      this.j++;
      var posArray = [60, 90, 120, 150];
      
      posArray = this.shuffle(posArray);
      this.answer1=this.game.add.text(game.world.centerX-300, posArray[0], answer1);
      this.answer1.font='Roboto Condensed';
      this.answer1.fontSize = 25;
      this.answer1.backgroundColor = '#f5f5dc';
      this.answer2=this.game.add.text(game.world.centerX-300, posArray[1], answer2);
      this.answer2.font='Roboto Condensed';
      this.answer2.fontSize = 25;
      this.answer2.backgroundColor = '#f5f5dc';
      this.answer3=this.game.add.text(game.world.centerX-300, posArray[2], answer3);
      this.answer3.font='Roboto Condensed';
      this.answer3.fontSize = 25;
      this.answer3.backgroundColor = '#f5f5dc';
      this.answer4=this.game.add.text(game.world.centerX-300, posArray[3], answer4);
      this.answer4.font='Roboto Condensed';
      this.answer4.fontSize = 25;
      this.answer4.backgroundColor = '#f5f5dc';
      //find way to show answers sorted ramdomly to make answer1 always the correct one, saves on code, i think.
      this.answer1.inputEnabled = true;
      this.answer2.inputEnabled = true;
      this.answer3.inputEnabled = true;
      this.answer4.inputEnabled = true;
      this.answer1.events.onInputDown.add(this.answerSubmit, this);
      this.answer2.events.onInputDown.add(this.wrongSubmit1, this);
      this.answer3.events.onInputDown.add(this.wrongSubmit2, this);
      this.answer4.events.onInputDown.add(this.wrongSubmit3, this);
      this.gloveHitCounter++;
    }
  },
  answerSubmit: function(game){
    this.medals = this.add.sprite(this.medalPos, 25, 'medals');
    this.medals.frame = this.medalFrame;
    this.medalArray.push("<img src = img/medal"+this.medalFrame+".png>");
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, 25, 225, 20, 2000);
    this.medalPos += 25;
    this.medalFrame += 1;
    this.burrito = this.add.sprite(1300, 280, 'burrito');
    this.game.physics.arcade.enable([this.burrito]);
    this.redLight.kill();
    this.greenLight = this.add.sprite(900, 150, 'greenLight');
    this.scoreText.destroy();
    this.score += 100;
    this.scoreText = "Score: "+this.score;
    this.scoreText=this.game.add.text(10, 400, this.scoreText, this.style);
  },
  wrongSubmit1: function(game){
    var music = this.add.audio('carPunch');
    music.play();
    this.glove.play('punch');
    this.player.play('ouch');
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, 25, 225, 20, 2000);
    this.burrito = this.add.sprite(1300, 280, 'burrito');
    this.game.physics.arcade.enable([this.burrito]);
    this.redLight.kill();
    this.greenLight = this.add.sprite(900, 150, 'greenLight');
    this.scoreText.destroy();
    this.score += 90;
    this.medalFrame += 1;
    this.scoreText = "Score: "+this.score;
    this.scoreText=this.game.add.text(10, 400, this.scoreText, this.style);
  },
  wrongSubmit2: function(game){
    var music = this.add.audio('carPunch');
    music.play();
    this.glove.animations.play('punch');
    this.player.play('ouch');
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, 25, 225, 20, 2000);
    this.burrito = this.add.sprite(1300, 280, 'burrito');
    this.game.physics.arcade.enable([this.burrito]);
    this.redLight.kill();
    this.greenLight = this.add.sprite(900, 150, 'greenLight');
    this.scoreText.destroy();
    this.score += 80;
    this.medalFrame += 1;
    this.scoreText = "Score: "+this.score;
    this.scoreText=this.game.add.text(10, 400, this.scoreText, this.style);
  },
  wrongSubmit3: function(game){
    var music = this.add.audio('carPunch');
    music.play();
    this.glove.play('punch');
    this.player.play('ouch');
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, 25, 225, 20, 2000);
    this.burrito = this.add.sprite(1300, 280, 'burrito');
    this.game.physics.arcade.enable([this.burrito]);
    this.redLight.kill();
    this.greenLight = this.add.sprite(900, 150, 'greenLight');
    this.scoreText.destroy();
    this.score += 70;
    this.medalFrame += 1;
    this.scoreText = "Score: "+this.score;
    this.scoreText=this.game.add.text(10, 400, this.scoreText, this.style);
  },
  shuffle: function(array){
    var current = array.length, t, i;
    while (current){
      i = Math.floor(Math.random() * current--);
      t=array[current];
      array[current] = array[i];
      array[i] = t;
    }
    return array;
  },
};