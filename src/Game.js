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
    this.bg = this.add.tileSprite(0, 0, this.stage.bounds.width, this.cache.getImage('background').height, 'background');
    this.houses = this.add.sprite(700, 178, 'houses');
    this.trees = this.add.sprite(400, 150, 'trees');
    
    var style={font: "24px Arial", fill: "#ff0044", align: "center"};
    var scoreText = "Score: "+this.score;
    this.scoreText=game.add.text(10, 400, scoreText, this.style);
    
    this.player = this.add.sprite(25, 220, 'lastRental');
    this.burrito = this.add.sprite(1300, 280, 'burrito');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable([this.player, this.burrito]);
    
    this.player.body.collideWorldBounds = true;
    this.camera.follow(this.player);
    this.player.animations.add('idle',[0, 0, 0, 3, 3, 3, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 3], 15, true);
    this.player.animations.add('roll',[0, 1, 2, 3], 15, true);
    this.player.animations.play('idle');
    this.houses.frame=0;
    this.trees.frame=0;
  },
  update: function(game){
    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      this.player.animations.play('roll');
      this.player.x -= this.speed;
    }
    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      game.physics.arcade.overlap(this.player, this.burrito, this.playerHitBurrito, null, this);
      game.physics.arcade.overlap(this.player, this.glove, this.playerHitGlove, null, this);
      this.player.animations.play('roll');
      this.player.x += this.speed/2;
      this.burrito.x -= this.speed;
      this.houses.x -= this.speed;
      this.trees.x -= this.speed;
      this.bg.tilePosition.x -= this.speed;
      this.player.angle=-0.5;
    }
    else{
      this.player.angle=0;
      this.player.animations.play('idle');
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
    this.glove.animations.add('punch', [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1], 15, false);
    this.game.physics.arcade.enable([this.player, this.glove]);
    this.burritoCounter += 1;
    console.log(this.score);
    this.gloveHitCounter = 0;
    if(this.burritoCounter > 5){
      document.getElementById("finscore").innerHTML = this.score;
      document.getElementById("finmedals").innerHTML = this.medalArray;
      this.checkerFlag = this.add.sprite(800, 250, 'checkerFlag');
      var goodBye = "Game Over";
      this.goodBye = this.game.add.text(10, 400, scoreText, this.style);
    }
  },
  playerHitGlove: function(game, i, j){
    while(this.gloveHitCounter === 0){
      var qArray = ["The information you pull from research databases, the library catalog, or even the web, is only as good as the (blank) you use.", "What are some of the ways you can limit your database search results to find information closer to what you need?", "One of the quickest ways to determine if an article could potentially have the information you need is:", "You found some really good articles for your research paper, how can you put them all in one place, ready to get to when you need them?", "What two database features could make your research a lot easier?"];
      var aArray = ["Keywords","Passwords","Browser","Computer", "Results limited by Full text availability, Peer review, and publication date" , "Results limited by Audience, content and writing style" , "Whether the search results are books, articles or websites" , "Results limited by artice’s font style, font size and number of pages" , "Read the article’s abstract or summary" , "Any old article will do" , "Ask your teacher" , "Read the article from beginning to end" , "Use the database’s email tool to send the articles to myself" , "Print them out" , "Commit them to memory" , "When I need the articles, I can just search for them again" , "Email article to self and citation builder features" , "Fill-in-the-blank citation templates and consultations with data bassists" , "Citation tutorials and auto-filled bibliographies" , "Databases only have articles"];
      var question = qArray[this.i];
      this.i++;
      this.question=this.game.add.text(game.world.centerX-300, 0, question, this.style);
      var answer1 = aArray[this.j];
      this.j++;
      var answer2 = aArray[this.j];
      this.j++;
      var answer3 = aArray[this.j];
      this.j++;
      var answer4 = aArray[this.j];
      this.j++;
      var posArray = [30, 60, 90, 120];
      
      posArray = this.shuffle(posArray);
      this.answer1=this.game.add.text(game.world.centerX-300, posArray[0], answer1, this.style);
      this.answer2=this.game.add.text(game.world.centerX-300, posArray[1], answer2, this.style);
      this.answer3=this.game.add.text(game.world.centerX-300, posArray[2], answer3, this.style);
      this.answer4=this.game.add.text(game.world.centerX-300, posArray[3], answer4, this.style);
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
    this.medalArray.push(this.medalFrame);
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, 25, 220, 20, 2000);
    this.medalPos += 15;
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
    this.glove.animations.play('punch');
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, this.player.x, 220, 20, 2000);
    this.game.physics.arcade.moveToXY(this.player, 25, 220, 20, 2000);
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
    this.glove.animations.play('punch');
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, this.player.x, 220, 20, 2000);
    this.game.physics.arcade.moveToXY(this.player, 25, 220, 20, 2000);
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
    this.glove.animations.play('punch');
    this.question.destroy();
    this.answer1.destroy();
    this.answer2.destroy();
    this.answer3.destroy();
    this.answer4.destroy();
    this.game.physics.arcade.moveToXY(this.player, this.player.x, 220, 20, 2000);
    this.game.physics.arcade.moveToXY(this.player, 25, 220, 20, 2000);
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