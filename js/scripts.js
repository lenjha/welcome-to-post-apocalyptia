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

var useArray = ["door", "button"];
var examineArray = ["cryotube", "floor"];
var takeArray = ["screwdriver", "tape"];

var useFeature = function(useInput) {
  for (i = 0; i <= useArray.length; i++) {
    if (usableArray(i) === useInput) {
      return alert("YOU USED SOMETHING");
    } else {
      return alert("you used nothing");
    }
  }//end for loop
}//end examineFeature function

var examineFeature = function(examineInput) {
  for (i = 0; i <= examineArray.length; i++) {
    if (stuffArray(i) === examineInput) {
      return alert("YOU EXAMINED SOMETHING");
    } else {
      return alert("you examined nothing");
    }
  }//end for loop
}//end examineFeature function

var takeFeature = function(takeInput) {
  for (i = 0; i <= takeArray.length; i++) {
    if (takeArray(i) === takeInput) {
      return alert("YOU TOOK SOMETHING");
    } else {
      return alert("you took nothing");
    }
  }//end for loop
}//end examineFeature function





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
