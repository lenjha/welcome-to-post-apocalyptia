// var currentDisplay = function() {
//   show
// }
//
//
//
// function Scene(description, explanation, img, container){  //
//   this.description;
//   this.explanation;
//   this.img;
//   this.container = []
// }
//
// function Player(name){
//   this.name;
//   this.inventory = [];
//
// }
//
// var itemArray = ["a","b","c"];
//
// function Item(name, description, itemImg){
//   this.name = name;
//   this.description = description;
//   this.itemImg = itemImg;
// }
//
// var getItem = function(itemInput) {
//   if (container.includes(itemInput))
//   inventory.push(itemInput);
//   alert(inventory);
// } else alert("no such item!");
//
// Player.prototype.examine = function(){
//
// }
//
// function Problem(keyItem){
//   if (inventory.includes(keyItem){
//     return success;
//   } else
//   return failure;
// }
//
//
// Player.prototype.use = function(item){
//   if Player.inventory.includes(item){
//     return success;
//   } else
//   return failure;
// }
//
//
// titleScreen = new Scene(
//   description = "Welcome to hell";
//   explanation = "You wake up in a tube, covered with blue slime. It tastes worse than it smells"
//   img = backgroundTitle.jpg
//   container = ["book", "thing"];
// )
//







$(document).ready(function(){
  $("#use").submit(function(event){
    event.preventDefault();
    var useInput = $("#user-input").val().toUpperCase();
  });//end use function
  $("#examine").submit(function(event){
    event.preventDefault();
    var examineInput = $("#user-input").val().toUpperCase();
  });//end examine function
  $("#take").submit(function(event){
    event.preventDefault();
    var takeInput = $("#user-input").val().toUpperCase();
  });//end take function
});//end doc ready function
