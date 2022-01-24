function ToDoList(){
  this.lists = {};
  this.currentId = 0;
}

ToDoList.prototype.addList = function(list) {
  list.id = this.assignId();
  this.lists[list.id] = list;
};

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

ToDoList.prototype.findList = function(id) {
  if (this.lists[id] != undefined) {
    return this.lists[id];
  }
  return false;
};

ToDoList.prototype.deleteList = function(id) {
  if (this.lists[id] === undefined) {
    return false;
  }
  delete this.lists[id];
  return true;
};

function List(time, nameDescription) {
  this.time = time;
  this.nameDescription = nameDescription;
  this.isDone = "Not Done";
}

let listsItems = new ToDoList();

function displayListItems(listToDisplay) {
  let withinList = $("ul#lists");
  let htmlForListInfo = "";
  console.log(listToDisplay)
  Object.keys(listToDisplay.lists).forEach(function(key){
  const list = listToDisplay.findList(key);
  htmlForListInfo += "<li id=" + list.id + ">" + list.nameDescription + " " + list.time + "</li>";
});
    withinList.html(htmlForListInfo);
}

function showList(listId) {
  const list = listsItems.findList(listId);
  $("#show-list").show();
  $(".nameDescription").html(list.nameDescription);
  $(".time").html(list.time);
  $(".isDone").html(list.isDone);
  let button = $("#button");
  button.empty();
  button.append("<button class='deleteButton' id=" + list.id + "> Delete </button>");
}

function attachListListeners() {
  $("ul#lists").on("click", "li", function(){
    showList(this.id);
  });

  $("#button").on("click", ".deleteButton", function(){
    listsItems.deleteList(this.id);
    $("#show-list").hide();
    displayListItems(listsItems);
  });

  $("ul#test").on("click", "li", function(){
    
    if (this.isDone === "Not Done") {
      this.isDone = "Done";
    }
    else {
      this.isDone = "Not Done";
    }
    console.log(this);
    console.log(this.isDone);

    showList(this.id);
  });
}

$(document).ready(function(){
  attachListListeners();
  $("form#new-list").submit(function(event){
    event.preventDefault();
    const inputtedItem = $("input#new-nameDescription").val();
    const inputtedTime = $("input#new-time").val();

    $("input#new-nameDescription").val("");
    $("input#new-time").val("");

    let newList = new List(inputtedTime, inputtedItem);
    listsItems.addList(newList)
    displayListItems(listsItems);
  });
});