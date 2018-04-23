Race.Preloader = function(game){
  game.GAME_WIDTH = 1052;
  game.GAME_HEIGHT = 512;
};
Race.Preloader.prototype = {
  preload: function(){
    this.stage.backgroundColor = '#B4D9E7';
    this.loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingBar');
    this.load.setPreloadSprite(this.loadingBar);
    this.loadingBar.anchor.set(0.5, 0.5);
    this.load.image('background', 'img/background.png');
    this.load.image('title', 'img/title.png');
    this.load.image('startButton', 'img/startButton.png');
    this.load.image('burrito', 'img/burrito.png');
    this.load.image('redLight', 'img/redLight.png');
    this.load.image('greenLight', 'img/greenLight.png');
    this.load.image('checkerFlag', 'img/checkerFlag.png');
    this.load.spritesheet('medals', 'img/medals.png', 51, 58);
    this.load.spritesheet('trees', 'img/trees.png', 155, 208);
    this.load.spritesheet('houses', 'img/houses.png', 257, 173);
    
    this.load.spritesheet('glove', 'img/glove.png', 220, 103);
    this.load.spritesheet('lastRental', 'img/lastRental.png', 293, 145);
    this.load.spritesheet('tacoTruck', 'img/tacoTruck.png', 290, 145);
    this.load.spritesheet('schoolBus', 'img/schoolBus.png', 290, 145);
  },
  create: function(){
    this.state.start('MainMenu');
  }
};