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

//////LIST OF ARRAYS
var inventoryArray = [];
var useArray = ["DOOR", "BUTTON"];
var examineArray = ["CRYOTUBE", "FLOOR"];
var takeArray = ["SCREWDRIVER", "TAPE"];

/////CHANGES SCENE
var unlock = function(useInput) {
  if (useInput === "DOOR" && inventoryArray.includes("SCREWDRIVER")) {
    alert("You manage to wriggle the door open with help from your trusty screwdriver.  SCENE CHANGE TIME!");

  }
}

////LIST OF FUNCTIONS that empower USER ACTIONS
var useFeature = function(useInput) {
  for (i = 0; i < useArray.length; i++) {
    if (useInput === "DOOR" && !(inventoryArray.includes("SCREWDRIVER"))) {
      alert("The door is locked shut.  Looks like it can be jimmied open though.");
    }
    if (useArray[i] === useInput) {
      return "YOU USED SOMETHING";
    }
  }//end for loop
  return "you used nothing";
}//end examineFeature function

var examineFeature = function(examineInput) {
  for (i = 0; i < examineArray.length; i++) {
    if (examineArray[i] === examineInput) {
      return "YOU EXAMINED SOMETHING";
    }
    if (examineInput === "CRYOTUBE") {
      return "The cryotube looks as though it is filled with blue raspberry Jell-O."
    }
  }//end for loop
  return "you examined nothing";
}//end examineFeature function

var takeFeature = function(takeInput) {
  for (i = 0; i < takeArray.length; i++) {
    if (takeArray[i] === takeInput) {
      inventoryArray.push(takeArray[i]);
      return "YOU TOOK SOMETHING";
    }
  }//end for loop
  return "you took nothing";
}//end examineFeature function




////FRONT END
$(document).ready(function(){
  $("#use").click(function(){
    // debugger
    // event.preventDefault();
    var useInput = $("#user-command").val().toUpperCase();
    var useResult = useFeature(useInput);
    alert(useResult);
    unlock(useInput);
  });//end use function
  $("#examine").click(function(){
    // event.preventDefault();
    var examineInput = $("#user-command").val().toUpperCase();
    var examineResult = examineFeature(examineInput);
    alert(examineResult);
  });//end examine function
  $("#take").click(function(){
    // event.preventDefault();
    var takeInput = $("#user-command").val().toUpperCase();
    var takeResult = takeFeature(takeInput);
    alert(takeResult);
    alert(inventoryArray);
  });//end take function
});//end doc ready function
