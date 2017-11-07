
//////OBJECTS for examining. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!!
var ObjExamine = {
  "items": [
    "CRYOTUBE", //item 1
     "CORPSE"], //item 2

  "description":[
    "The cryotube looks as though it is filled with blue raspberry Jell-O. It looks like it's falling apart, and the guy inside looks none too happy. You notice a loose pipe that you might be able to pry off", //desc 1
     "He's dead, but he may still be useful to you. Could he be carrying something?"] //desc 2
};



//////LIST OF ARRAYS
var inventoryArray = [];
var useArray = ["DOOR", "BUTTON"]; //interaction objects
var examineArray = ["CRYOTUBE", "FLOOR"];    //array for reference only. these can be described
var takeArray = ["SCREWDRIVER", "TAPE", "DOGFOOD"]; //these can be removed from enviro

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
  for (i = 0; i < ObjExamine.items.length; i++) {
    if (ObjExamine.items[i] === examineInput) {
      return ObjExamine.description[i];
    }
  }//end for loop
  return "you examined nothing";
}//end examineFeature function

var takeFeature = function(takeInput) {
  for (i = 0; i < takeArray.length; i++) {
    if ((takeArray[i] === takeInput) && !(inventoryArray.includes(takeArray[i]))) {
      inventoryArray.push(takeArray[i]);
      // var removeItem = takeInput;
      // takeArray.splice( $.inArray(removeItem,takeArray) ,1 );
      takeArray.splice(takeArray.indexOf(takeInput),1); //javascript remove from takeArray
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
    alert(takeArray);
  });//end take function
  $('#help').click(function(){
    $('.card').show();
    $(".card-text").text("In this area there are things you can 'look' at. If you find an item you may 'take' it for your inventory, you may also 'use' your items on certain features in this area.");
  });
  $('.card').click(function(){
    $('.card').hide();
  });
});//end doc ready function
