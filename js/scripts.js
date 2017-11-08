
function Scene(description, img){
  this.description = description;
  this.img = img;
  this.container = [];
}

var clearInput = function(){
  $("#user-input").empty();
}
//////OBJECTS for examining. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!!
var ObjExamine = {
  items: [

    "CRYOTUBE1", // viewobj1

    "CRYOTUBE2", // viewobj2

    // "CORPSE", //viewobj3

    "SCANNER", //viewobj4

    "DOOR"], //viewobj5

  description:[

    "The cryotube looks even more broken without the PIPE attached", //desc 1

    "Another cryotube. There's a CORPSE inside. Maybe he's carrying something? You'd have to smash the glass to check.", //desc 2

    // "He's dead, but he may still be useful to you. Could that be a KEYCARD sticking out of his pocket?", //desc 3

    "A typical g-34t keycard SCANNER. Useless to you, unless of course you have a KEYCARD..", //desc 4

    "A old door. Somewhat rusted, but clearly built to last. You'll need to use a KEYCARD on the SCANNER to have any hope of getting through."] // desc 5
};// end LOOK object

////////OBJECTS for taking. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!
var ObjTake = {
  items: [],

  description: []
};// end TAKE object

///////////OBJECTS for using
var ObjUse = {
  items: [
    "DOOR",   //1
    "CRYOTUBE1",  //2
    "CRYOTUBE2",  //3
    "CORPSE",  //4
    "SCANNER",  //5
    "PIPE",  //6
    "KEYCARD"],  //7
  description: [
    "A heavy DOOR. No way can you get through without using the SCANNER, but you'll need a KEYCARD.", // 1

    "No way are you getting back in this damn thing.", //2

    "Nothing left to do to this.", //3

    "How exactly do you use a corpse? Actually, please don't answer that.",  //4

    "A standard SCANNER that accepts a KEYCARD.", //5

    "You can't use a pipe on itself, but perhaps it will let you smash something?", //5

    "KEYCARD can't be used on itself. Maybe it will allow you to use something else?"]
}


//GLOBAL VARIABLES
var titleScreen = new Scene ("title image", "img/title.jpg")
var introScreen = new Scene ("this is where you learn about the premise of the game", "img/help.jpg")
var cryoRoom1 = new Scene ("cryo room", "img/cryoroom-default.jpg")
var cryoRoom2 = new Scene ("cryo room", "img/cryoroom-no-pipe.jpg")
var cryoRoom3 = new Scene ("cryo room", "img/cryoroom-corpse.jpg")
var cryoRoom4 = new Scene ("cryo room", "img/cryoroom-corpse-nathan.jpg")
var cryoRoom5 = new Scene ("cryo room", "img/cryroom-taken-keycard-nathan.jpg")
var gameOver = new Scene ("victory?", "img/placeholder1.jpg")
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


////CRYO ROOM BOOLEANS
var doorLocked = true; ///door to new area/victory, depending on time
var tubeSmashed = false; ///allows you to examine CORPSE which spawns KEYCARD in takeArray

/////FUNCTION TO CLEAR USER INPUT
// var clearInput = function() {
//   .reset();
// }

//////FUNCTIONS TO DECIDE WHICH USER ACTION TO USE
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
  for (i = 0; i < useArray.length; i++) {
    if ((useInput === "CRYOTUBE2") && (inventoryArray.includes("PIPE")) && (tubeSmashed === false)) {
      tubeSmashed = true;
      changeScene(cryoRoom3);
      ObjExamine.description[1] = "You've already smashed this tube.";
      return "You smash open the tube, revealing the CORPSE within";

    } else if ((useInput === "SCANNER") && (inventoryArray.includes("KEYCARD")) && (doorLocked === true)) {
      doorLocked = false;
      changeScene(gameOver);
      return "After a short delay, the heavy door manages to creak open.";
    }

    else if (useArray[i] === useInput) {
      return "TEMPORARY CONFIRMATION MESSAGE (but no change in world)";
    }
  }//end for loop
  return "nothing you can do";
}//end examineFeature function

var examineFeature = function(examineInput) {   ///VIEW STUFF
  for (i = 0; i < ObjExamine.items.length; i++) {
    if ((examineInput === "CRYOTUBE1") && !(inventoryArray.includes("PIPE"))) {
      ObjTake.items.push("PIPE");
      ObjTake.description.push("With some effort, you manage to pry the loose PIPE off of the CRYOTUBE1 frame.");
      return "The cryotube looks as though it is filled with blue raspberry Jell-O. You notice a loose PIPE that you might be able to pry off.";
    } else if ((examineInput === "CORPSE") && !(inventoryArray.includes("KEYCARD")) && (tubeSmashed === true)) {
      ObjTake.items.push("KEYCARD");
      ObjTake.description.push("Congratulations, you've robbed the dead guy. Acquired KEYCARD!");
      changeScene(cryoRoom4);
      return "He's dead, but he may still be useful to you. Could that be a <span class='interactable'>KEYCARD</span> hanging around his neck?";
    } else if (ObjExamine.items[i] === examineInput) {
      return ObjExamine.description[i];
    }
  }//end for loop
  return "nothing noteworthy";
}//end examineFeature function

var takeFeature = function(takeInput) {    ///TAKE STUFF
  for (i = 0; i < ObjTake.items.length; i++) {
    if ((ObjTake.items[i] === takeInput) && !(inventoryArray.includes(ObjTake.items[i]))) {
      inventoryArray.push(ObjTake.items[i]);
      // var removeItem = takeInput;
      // takeArray.splice( $.inArray(removeItem,takeArray) ,1 ); //jquery remove from takeArray
      // takeArray.splice(takeArray.indexOf(takeInput),1); //javascript remove from takeArray
      return ObjTake.description[i];
    }
  }//end for loop
  return "you took nothing";
}//end examineFeature function



////FRONT END
$(document).ready(function(){
  $('#start-button').click(function(){
    $('#start-button').hide();
    changeScene(cryoRoom1);
  });
  var descPane = document.getElementById("description-pane");
  var closePane = document.getElementById("close-pane");
  var span = document.getElementsByClassName("close-pane")[0];
  $("#close-pane").click(function() {
    $("#description-pane").hide();
  });

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
    // debugger
    // event.preventDefault();
    var useInput = $("#user-command").val().toUpperCase();
    var useResult = useFeature(useInput);
    alert(useResult);
    // unlock(useInput);
  });//end use function
  $("#examine").click(function(){
    // event.preventDefault();
    var examineInput = $("#user-command").val().toUpperCase();
    var examineResult = examineFeature(examineInput);
    $("#description-text").text("");
    $("#description-text").append(examineResult);
    $("#description-pane").show();
    // alert(examineResult);
  });//end examine function
  $("#take").click(function(){
    // event.preventDefault();
    var takeInput = $("#user-command").val().toUpperCase();
    var takeResult = takeFeature(takeInput);
    $("#description-text").text("");
    $("#description-text").append(takeResult + "<p>Your inventory: " + inventoryArray + "</p>");
    $("#description-pane").show();
  });//end take function
  $('#help').click(function(){
    // changeScene(introScreen);
    // $('.card').show();
    // $(".card-text").text("In this area there are things you can 'look' at. If you find an item you may 'take' it for your inventory, you may also 'use' your items on certain features in this area.");
  });
  $('.card').click(function(){
    $('.card').hide();
  });
});//end doc ready function
