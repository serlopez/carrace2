Race.Preloader = function(game){
  game.GAME_WIDTH = 1052;
  game.GAME_HEIGHT = 512;
};

Race.Preloader.prototype = {
  preload: function(){
    pname = document.getElementById("car").textContent;
    this.stage.backgroundColor = '#B4D9E7';
    this.loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingBar');
    this.load.setPreloadSprite(this.loadingBar);
    this.loadingBar.anchor.set(0.5, 0.5);
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    this.load.image('background', 'img/background.png');
    this.load.image('title', 'img/title.png');
    this.load.image('startButton', 'img/startButton.png');
    this.load.image('burrito', 'img/burrito.png');
    this.load.image('redLight', 'img/redLight.png');
    this.load.image('greenLight', 'img/greenLight.png');
    this.load.image('checkerFlag', 'img/checkerFlag.png');
    this.load.image('badge', 'img/badge.png');
    this.load.spritesheet('medals', 'img/medals.png', 51, 58);
    this.load.spritesheet('trees', 'img/trees.png', 155, 208);
    this.load.spritesheet('houses', 'img/houses.png', 257, 173);
    
    this.load.spritesheet('glove', 'img/glove.png', 220, 103);
    this.load.spritesheet('lastRental', 'img/lastRental.png', 268, 154, 3);
    this.load.spritesheet('laPlaca', 'img/laPlaca.png', 268, 154, 3);
    this.load.spritesheet('bookMobile', 'img/bookMobile.png', 268, 154, 3);
    
    this.load.audio('bgmusic', ['audio/cebuanaOne.mp3', 'audio/cebuanaOne.ogg']);
    this.load.audio('carPunch', ['audio/punch.mp3', 'audio/punch.ogg']);
  },
  create: function(){
    this.state.start('MainMenu');
  }
};