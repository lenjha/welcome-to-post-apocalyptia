function Scene(description, img, container){
  this.description = description;
  this.img = img;
  this.container = container;
}

function Item(name, img, use){
  this.name = name;
  this.img = img;
  this.uses = use;
}

//OBJECTS for examining. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!!
var objExamine = {
  items: [

    "CRYOTUBE1", // viewobj1

    "CRYOTUBE2", // viewobj2

    "CORPSE", //viewobj3

    "SCANNER", //viewobj4

    "DOOR"], //viewobj5

  description:[

    "You can hardly believe you crawled out of this damn thing.", //desc 1

    "You've taken the <span class='interactable'>pipe</span>, rendering this thing even more busted. There's a <span class='interactable'>corpse</span> inside. Maybe he's carrying something? You'd have to smash the glass to check.", //desc 2

    "He's dead, Jim.", //desc 3

    "A typical g-34t keycard <span class='interactable'>scanner</span>. Useless to you, unless of course you have a keycard..", //desc 4

    "A old door. Somewhat rusted, but clearly built to last. You'll need to use a KEYCARD on the <span class='interactable'>SCANNER</span> to have any hope of getting through."] // desc 5
};// end LOOK object

//OBJECTS for taking. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!
var objTake = {
  items: [],

  description: []
};// end TAKE object

//OBJECTS for using
var objUse = {
  items: [
    "DOOR",   //0

    "CRYOTUBE1",  //1

    "CRYOTUBE2",  //2

    "SCANNER"],  //3

  description: [
    "A heavy <span class='interactable'>door</span>. No way can you get through without using the <span class='interactable'>scanner</span>, but you'll need a keycard.", // 0 Door

    "No way are you getting back in this damn thing; that gunk only looks like blue raspberry Jell-O.", //1 C1

    "You can't get inside this thing with your bare hands.",
    //2 C2

    "A standard scanner that accepts a keycard."] //3
};//end USE object


//GLOBAL VARIABLES

var doorLocked = true; ///door to new area/victory, depending on time
var tubeSmashed = false; ///allows you to examine CORPSE which spawns KEYCARD in takeArray

var roomDescription = "The too-warm room you are in has two cryotubes - <span class='interactable'>cryotube1</span> and <span class='interactable'>cryotube2</span> -  and a <span class='interactable'>door</span> with a <span class='interactable'>scanner</span>. It looks like <span class='interactable'>cyrotube2</span> is damaged. You begin to perspire and think to yourself... \"<em>How do I get out of here?!</em>\"";

//SCENE DECLARATIONS
var titleScreen = new Scene ("title image", "img/title.jpg");
var introScreen = new Scene ("intro image", "img/intro.jpg");
var cryoRoom1 = new Scene ("cryo room", "img/cryoroom-default.jpg");
var cryoRoom2 = new Scene ("cryo room", "img/cryoroom-no-pipe.jpg");
var cryoRoom3 = new Scene ("cryo room", "img/cryoroom-corpse.jpg");
var cryoRoom4 = new Scene ("cryo room", "img/cryoroom-corpse-nathan.jpg");
var cryoRoom5 = new Scene ("cryo room", "img/cryoroom-taken-keycard-nathan.jpg");
var gameOver = new Scene ("game over", "img/victory.jpg");
var currentScene = titleScreen;
// INVENTORY items
var pipe = new Item("PIPE", "img/pipe.png");
var keycard = new Item("KEYCARD", "img/keycard.png");
//LIST OF ARRAYS
var inventoryArray = [];
var inventoryImages = [pipe, keycard];
// var useArray = ["DOOR", "BUTTON"]; //interaction objects.
var examineArray = ["CRYOTUBE1", "CRYOTUBE2", "CORPSE", "SCANNER", "DOOR"];    //array for reference only. these can be DESCRIBED with EXAMINE

var takeArray = []; //these can be removed from takeArray and placed in inventoryArray
                    //objects to be added via examine: PIPE, KEYCARD

//CHANGES SCENE
var changeScene = function(newScene){
  $("#scene-view").attr('src', newScene.img)
  currentScene = newScene;
}







//FUNCTION TO DECIDE WHICH USER ACTION TO USE
var theDecider = function(playerInput) {         //SPLIT USER STRING INTO 2

  var splitInput = playerInput.split(" ");
  if (splitInput.includes("LOOK") && !(splitInput.includes("TAKE")) && !(splitInput.includes("USE")) )  {
    for (i = 0; i < objExamine.items.length; i++) {
      if (splitInput.includes(objExamine.items[i])) {
        return examineFeature(objExamine.items[i]);
      }
    }
    return roomDescription;
  } else if (splitInput.includes("TAKE") && !(splitInput.includes("LOOK")) && !(splitInput.includes("USE")) )  {
    for (i = 0; i < objTake.items.length; i++) {
      if (splitInput.includes(objTake.items[i])) {
        return takeFeature(objTake.items[i]);
      }
    }
    return "What are you trying to take?"
  } else if (splitInput.includes("USE") && !(splitInput.includes("LOOK")) && !(splitInput.includes("TAKE")) )  {
    for (i = 0; i < objUse.items.length; i++) {
      if (splitInput.includes(objUse.items[i])) {
        return useFeature(objUse.items[i]);
      }
    }
    return "What are you trying to use?"
  } else {
    return "Command must be in the form of <span class='interactable'>'action object'</span> separated by a space.";
  }
}//end split FXN


//LIST OF FUNCTIONS that empower USER ACTIONS
var useFeature = function(useInput) {     //USE STUFF
  for (i = 0; i < objUse.items.length; i++) {
    if ((useInput === "CRYOTUBE2") && (inventoryArray.includes("PIPE")) && (tubeSmashed === false)) {
      tubeSmashed = true;
      changeScene(cryoRoom3);
      objExamine.description[1] = "You've already smashed this tube.  Good work, hero.";
      objUse.description[2] = "You can't use this thing. It's pretty busted up, thanks to you."
      objUse.items.push("CORPSE");
      objUse.description.push("How exactly do you use a corpse?  Actually, please don't answer that.");

      return "You smash open the tube, revealing the <span class='interactable'>corpse</span> within.  This is actually not the worst piñata you've ever opened.  Funny how you know that.<br><br>There seems to be something hanging from his neck, perhaps you should take a closer look.";


    } else if ((useInput === "SCANNER") && (inventoryArray.includes("KEYCARD")) && (doorLocked === true)) {
      doorLocked = false;
      changeScene(gameOver);
      return "The scanner light remains red after you initially jam the keycard into position.  You flip the keycard by your face and blow into the cartridge before trying it again.  After a short delay, the light glows green and the heavy door squeals open.";
    } else if (objUse.items[i] === useInput) {
      return objUse.description[i];
    }
  }//end for loop
  return "What are you trying to do?";
}//end examineFeature function

var examineFeature = function(examineInput) {   ///VIEW STUFF
  debugger
  for (i = 0; i < objExamine.items.length; i++) {
    if ((examineInput === "CRYOTUBE2") && !(inventoryArray.includes("PIPE"))) {
      objTake.items.push("PIPE");

      objTake.description.push("With some effort, you manage to pry the loose <span class='interactable'>pipe</span> off of the <span class='interactable'>cryotube2</span> frame.");
      return "The cryotube looks as though it is filled with moldy cheesecake. You notice a loose <span class='interactable'>pipe</span> that you might be able to pry off. Oh, and there's a <span class='interactable'>corpse</span> in there.";
    } else if ((examineInput === "CORPSE") && !(inventoryArray.includes("KEYCARD")) && (tubeSmashed === true)) {
      objTake.items.push("KEYCARD");
      objTake.description.push("Congratulations, you've robbed the dead guy. Acquired <span class='interactable'>keycard</span>!");
      changeScene(cryoRoom4);
      return "He's dead, but he may still be useful to you. Could that be a <span class='interactable'>keycard</span> hanging around his neck?";
    } else if (objExamine.items[i] === examineInput) {
      return objExamine.description[i];
    }
  }//end for loop
  return roomDescription;
}//end examineFeature function

var takeFeature = function(takeInput) {    ///TAKE STUFF
  for (i = 0; i < objTake.items.length; i++) {
    if ((objTake.items[i] === takeInput) && !(inventoryArray.includes(objTake.items[i]))) {
      inventoryArray.push(objTake.items[i]);
      if (objTake.items[i] === "PIPE"){
        changeScene(cryoRoom2);
        //add pipe image to INVENTORY DISPLAY
        $("#inv1").attr('src', inventoryImages[0].img);
        $("#inv1").attr('alt', "pipe");
        objUse.items.push("PIPE");
        objUse.description.push("You can't use a <span class='interactable'>pipe</span> on itself, but perhaps it will let you bust something open?");
      } else if (objTake.items[i] === "KEYCARD"){
        changeScene(cryoRoom5);
        $("#inv2").attr('src', inventoryImages[1].img);
        $("#inv2").attr('alt', "keycard");
        objUse.items.push("KEYCARD");
        objUse.description.push("<span class='interactable'>Keycard</span> can't be used on itself. Maybe it will allow you to use something else.");
      }

      return objTake.description[i];
    }
  }//end for loop
  return "You can't take that.";
}//end examineFeature function



//FRONT END
$(document).ready(function(){
  //TITLE SCREEN START BUTTON
  $('#start-button').click(function(){
    $('#start-button').hide();
    changeScene(cryoRoom1);
    $(".footer").css("visibility", "visible");
    $("#description-text").text("");
    $("#description-text").append("<p>Your thoughts, your dreams, puerile fantasies, all thought of individuality...</p>" +

      "<p>All sight and sound meld into a thick slurry of memory.  As if someone had taken cement dust and injected it into your cranium, bloodflow allowing it to never fully coagulate but preventing you from holding onto any thought all the same.</p><br><p>You vaguely recall being ushered into a bunker after news of something falling, but beyond that are mental holes that ebb and flow with the muck of recollection.  Vignettes come and go, slipping capture.  White jackets, alarming monitors.  Red lights, blaring sirens.  Cacophany.</p><br>" +

      "<p>But it is quiet now.</p><br>" +

      "<p>The faint sound of mechanical hissing gradually swells, cutting into your ear as warmth tickles your skin.  Your consciousness is alert to the sharp panic of having forgotten something important.</p>" +

      "<p>Something very important.</p>");
    $("#description-pane").show();
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
    $("#user-command").val("use ");
  });//end use function

  $("#examine").click(function(){
    $("#user-command").val("look ");
  });//end examine function

  $("#take").click(function(){
    $("#user-command").val("take ");
  });//end take function

  $('#help').click(function(){
    $("#description-text").text("");

    $("#description-text").append("<p>This game relies on a text command interface. To take actions in this world, you must enter commands of at least two words, like \"look at <span class=\"interactable\">cryotube1</span>.\" </p><br>" +
    "<p><span class='interactable'>LOOK</span>ing at an object will give you more information about that object.</p><br>" +
    "<p>If you find an <span class='interactable'>ITEM</span> you may be able to <span class='interactable'>TAKE</span> it and keep it in your inventory.</p><br>" +
    "<p><span class='interactable'>USE</span> will allow you to either use an item from your inventory or an object in the environment (e.g. \"Use <span class='interactable'>key</span> on <span class='interactable'>lock</span>\").</p><br>" +
    "<p>The general pattern is 'action + object'.</p>");

    $("#description-pane").show();
  });
});//end doc ready function
