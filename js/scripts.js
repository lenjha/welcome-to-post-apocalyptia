objTake
function Scene(description, img){
  this.description = description;
  this.img = img;
  this.container = [];
}

var clearInput = function(){
  $("#user-input").empty();
}
//////OBJECTS for examining. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!!
var objExamine = {
  items: [

    "CRYOTUBE1", // viewobj1

    "CRYOTUBE2", // viewobj2

    // "CORPSE", //viewobj3

    "SCANNER", //viewobj4

    "DOOR"], //viewobj5

  description:[

    "You can hardly believe you crawled out of this damn thing.", //desc 1

    "You've taken the PIPE, rendering this thing even more busted. There's a CORPSE inside. Maybe he's carrying something? You'd have to smash the glass to check.", //desc 2

    // "He's dead, but he may still be useful to you. Could that be a KEYCARD sticking out of his pocket?", //desc 3

    "A typical g-34t keycard SCANNER. Useless to you, unless of course you have a KEYCARD..", //desc 4

    "A old door. Somewhat rusted, but clearly built to last. You'll need to use a KEYCARD on the SCANNER to have any hope of getting through."] // desc 5
};// end LOOK object

////////OBJECTS for taking. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!
var objTake = {
  items: [],

  description: []
};// end TAKE object

///////////OBJECTS for using
var objUse = {
  items: [
    "DOOR",   //0

    "CRYOTUBE1",  //1

    "CRYOTUBE2",  //2

    "SCANNER"],  //3

  description: [
    "A heavy DOOR. No way can you get through without using the SCANNER, but you'll need a KEYCARD.", // 0 Door

    "No way are you getting back in this damn thing.", //1 C1

    "You can't get inside this thing with your bare hands.",
    //2 C2

    "A standard SCANNER that accepts a KEYCARD."] //3
};//end USE object


//GLOBAL VARIABLES

var doorLocked = true; ///door to new area/victory, depending on time
var tubeSmashed = false; ///allows you to examine CORPSE which spawns KEYCARD in takeArray

var titleScreen = new Scene ("title image", "img/title.jpg");
var introScreen = new Scene ("this is where you learn about the premise of the game", "img/help.jpg");
var cryoRoom1 = new Scene ("cryo room", "img/cryoroom-default.jpg");
var cryoRoom2 = new Scene ("cryo room", "img/cryoroom-no-pipe.jpg");
var cryoRoom3 = new Scene ("cryo room", "img/cryoroom-corpse.jpg");
var cryoRoom4 = new Scene ("cryo room", "img/cryoroom-corpse-nathan.jpg");
var cryoRoom5 = new Scene ("cryo room", "img/cryoroom-taken-keycard-nathan.jpg");
var gameOver = new Scene ("game over", "img/victory.jpg");
var currentScene = titleScreen;
//////LIST OF ARRAYS
var inventoryArray = [];
var useArray = ["DOOR", "BUTTON"]; //interaction objects.
var examineArray = ["CRYOTUBE1", "CRYOTUBE2", "CORPSE", "SCANNER", "DOOR"];    //array for reference only. these can be DESCRIBED with EXAMINE

var takeArray = []; //these can be removed from takeArray and placed in inventoryArray
                    //objects to be added via examine: PIPE, KEYCARD

/////CHANGES SCENE
var changeScene = function(newScene){
  $("#scene-view").attr('src', newScene.img)
  currentScene = newScene;
}
// var unlock = function(useInput) {
//   debugger
//   if (useInput === "DOOR" && inventoryArray.includes("SCREWDRIVER")) {
//     alert("You manage to wriggle the door open with help from your trusty screwdriver.  SCENE CHANGE TIME!");
//   }
// }




/////FUNCTION TO CLEAR USER INPUT
// var clearInput = function() {
//   .reset();
// }

//////FUNCTION TO DECIDE WHICH USER ACTION TO USE
var theDecider = function(playerInput) {         //////SPLIT USER STRING INTO 2
  var splitInput = playerInput.split(" ");
  var splitAction = splitInput[0];
  var splitItem = splitInput[1];
  // return splitAction + " " + splitItem; //VERIFY SPLIT
  if (splitAction === "LOOK") {
    return examineFeature(splitItem);
  } else if (splitAction === "USE") {
    return useFeature(splitItem);
  } else if (splitAction === "TAKE") {
    return takeFeature(splitItem);
  } else if (splitAction === "INVENTORY") {
    return inventoryArray;
  } else {
    return "Command must be in the form of 'action object' separated by a space.";
  }


}//end split FXN


////LIST OF FUNCTIONS that empower USER ACTIONS
var useFeature = function(useInput) {     ///USE STUFF
  for (i = 0; i < objUse.items.length; i++) {
    if ((useInput === "CRYOTUBE2") && (inventoryArray.includes("PIPE")) && (tubeSmashed === false)) {
      tubeSmashed = true;
      changeScene(cryoRoom3);
      objExamine.description[1] = "You've already smashed this tube.";
      objUse.description[2] = "You can't use this thing. It's pretty busted up, thanks to you."
      objUse.items.push("CORPSE");
      objUse.description.push("How exactly do you use a corpse? Actually, please don't answer that.");
      return "You smash open the tube, revealing the CORPSE within";

    } else if ((useInput === "SCANNER") && (inventoryArray.includes("KEYCARD")) && (doorLocked === true)) {
      doorLocked = false;
      changeScene(gameOver);
      return "After a short delay, the heavy door manages to creak open.";
    } else if (objUse.items[i] === useInput) {
      return objUse.description[i];
    }
  }//end for loop
  return "What are you trying to do?";
}//end examineFeature function

var examineFeature = function(examineInput) {   ///VIEW STUFF
  for (i = 0; i < objExamine.items.length; i++) {
    if ((examineInput === "CRYOTUBE2") && !(inventoryArray.includes("PIPE"))) {
      objTake.items.push("PIPE");

      objTake.description.push("With some effort, you manage to pry the loose PIPE off of the CRYOTUBE2 frame.");
      return "The cryotube looks as though it is filled with blue raspberry Jell-O. You notice a loose PIPE that you might be able to pry off. Oh, and there's a CORPSE in there.";
    } else if ((examineInput === "CORPSE") && !(inventoryArray.includes("KEYCARD")) && (tubeSmashed === true)) {
      objTake.items.push("KEYCARD");
      objTake.description.push("Congratulations, you've robbed the dead guy. Acquired KEYCARD!");
      changeScene(cryoRoom4);
      return "He's dead, but he may still be useful to you. Could that be a <span class='interactable'>KEYCARD</span> hanging around his neck?";
    } else if (objExamine.items[i] === examineInput) {
      return objExamine.description[i];

    }
  }//end for loop
  return "There's nothing of interest here.";
}//end examineFeature function

var takeFeature = function(takeInput) {    ///TAKE STUFF
  for (i = 0; i < objTake.items.length; i++) {
    if ((objTake.items[i] === takeInput) && !(inventoryArray.includes(objTake.items[i]))) {
      inventoryArray.push(objTake.items[i]);
      if (objTake.items[i] === "PIPE"){
        changeScene(cryoRoom2);
        objUse.items.push("PIPE");
        objUse.description.push("You can't use a PIPE on itself, but perhaps it will let you smash something?");
      } else if (objTake.items[i] === "KEYCARD"){
        changeScene(cryoRoom5);
        objUse.items.push("KEYCARD");
        objUse.description.push("KEYCARD can't be used on itself. Maybe it will allow you to use something else?");
      }
      // var removeItem = takeInput;
      // takeArray.splice( $.inArray(removeItem,takeArray) ,1 ); //jquery remove from takeArray
      // takeArray.splice(takeArray.indexOf(takeInput),1); //javascript remove from takeArray
      return objTake.description[i];
    }
  }//end for loop
  return "You can't take that.";
}//end examineFeature function



////FRONT END
$(document).ready(function(){

  //TITLE SCREEN START BUTTON
  $('#start-button').click(function(){

    $('#start-button').hide();
    changeScene(cryoRoom1);
  });

  //CLOSE TEXTUAL DESCRIPTION PANE
  $("#close-pane").click(function() {
    $("#description-pane").hide();
  });

  //WHEN USER PRESSES ENTER TO SUBMIT TEXT COMMAND
  $("#user-input").submit(function(event){
    event.preventDefault();
    var playerInput = $("#user-command").val().toUpperCase();
    var playerResult = theDecider(playerInput);
    $("#description-text").text("");
    $("#description-text").append(playerResult);
    $("#description-pane").show();
    $("form").trigger("reset");
  });//end user submit fxn

  $("#use").click(function(){
    var useInput = $("#user-command").val().toUpperCase();
    var useResult = useFeature(useInput);
    alert(useResult);

  });//end use function
  $("#examine").click(function(){

    var examineInput = $("#user-command").val().toUpperCase();
    var examineResult = examineFeature(examineInput);
    $("#description-text").text("");
    $("#description-text").append(examineResult);
    $("#description-pane").show();

  });//end examine function
  $("#take").click(function(){
    var takeInput = $("#user-command").val().toUpperCase();
    var takeResult = takeFeature(takeInput);
    $("#description-text").text("");
    $("#description-text").append(takeResult + "<p>Your inventory: " + inventoryArray + "</p>");
    $("#description-pane").show();
  });//end take function
  $('#help').click(function(){
    $("#description-text").text("");
    $("#description-text").append("In this area there are things you can <span class='interactable'>look</span> at. If you find an item you may <span class='interactable'>take</span> it for your inventory, you may also <span class='interactable'>use</span> features in this environment.");
    $("#description-pane").show();
  });


});//end doc ready function
