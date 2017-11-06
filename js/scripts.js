function Scene(description, explanation, img, container){
  this.description;
  this.explanation;
  this.img;
  this.container = []
}

function Player(name, inventory, action){
  this.name;
  this.inventory = [];
  this.action;
}

function Item(name, description, itemImg){
  this.name = name;
  this.description = description;
  this.itemImg = itemImg;
}

Player.prototype.takeItem = function(item) {
  inventory.push(item)
  this.container.pop()
}

Player.prototype.examine = function(){

}

function Problem(keyItem){
  if (inventory.includes(keyItem){
    return success;
  } else
  return failure;
}


Player.prototype.use = function(item){
  if Player.inventory.includes(item){
    return success;
  } else
  return failure;
}

titleScreen = new Scene(
  description = "Welcome to hell";
  explanation = "You wake up in a tube, covered with blue slime. It tastes worse than it smells"
  img = backgroundTitle.jpg
  container = ["book", "thing"];
)
