Race.MainMenu = function(game){};
Race.MainMenu.prototype = {
  create: function(){
    this.bg=this.add.tileSprite(0, 0, this.stage.bounds.width, this.cache.getImage('background').height, 'background');
    this.title=this.add.sprite(this.world.centerX, 200, 'title');
    this.title.anchor.set(0.5, 0.5);
    this.add.button(this.world.centerX, 400, 'startButton', this.startGame, this);
  },
  update: function(){
    this.bg.tilePosition.x -= 1;
  },
  startGame: function(){
    this.state.start('Game');
  }
};