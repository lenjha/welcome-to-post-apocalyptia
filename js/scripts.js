
//////OBJECTS for examining. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!!
var ObjExamine = {
  "items": [
    "CRYOTUBE", //item 1
     "FLOOR"], //item 2

  "description":[
    "The cryotube looks as though it is filled with blue raspberry Jell-O.", //desc 1
     "Believe it or not, it's a floor"] //desc 2
};

//////LIST OF ARRAYS
var inventoryArray = [];
var useArray = ["DOOR", "BUTTON"];
var examineArray = ["CRYOTUBE", "FLOOR"];    //this array is for reference only!!
var takeArray = ["SCREWDRIVER", "TAPE", "DOGFOOD"];

////LIST OF FUNCTIONS that empower USER ACTIONS
var useFeature = function(useInput) {
  for (i = 0; i < useArray.length; i++) {
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
});//end doc ready function
