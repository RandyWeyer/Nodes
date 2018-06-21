//https://stackoverflow.com/questions/21864989/draw-lines-between-2-elements-in-html-page
var newCanvas;
var lineId = [];
var selectedObjects = [];
var uniqueId = 0;

const cardHtml = (
  '<div class="card">'  +
  '<div class = "input-form">'+
        '<div class="form-group">'+
        '<label for="input-title">Title</label>'+
        '<input type="text" class="form-control" id="input-title">'+
      '</div>'+
      '<div class="form-group">'+
        '<label for="input-note">Note:</label>'+
        '<textarea type="text" lines="8" class="form-control" id="input-note"></textarea>'+
        '</div>'+
      '<button id="add-image" class="btn btn-primary onclick="addImage()">Add Pic</button>'+
      '<div id="output-image-1">'+
      '</div>'+
      '<button class="btn btn-primary save-card">Save</button>'+
    '</div>'+
    '<div class="card-body">'+
      '<h5 id="output-title">5</h5>'+
      '<p id="output-note">9</p>'+
      '<div id="output-image-2">'+
      '</div>'+
      '<button class="btn btn-primary edit-card">Edit</button>'+
      '<button class="btn btn-primary remove-card">Remove</button>'+
    '</div>'+
  '</div>'
);

$(function(){
  newCanvas = new Canvas("canvas");
  //Start Drag
  $(".draggable").dblclick(function()
  {
    addId(this);
  });

  $("#add-card").click(function()
  {
    //Requires style position absolution reason:unkown glich (possibly jquery)
    var createDivWrap = $('<div id="'+uniqueId+'" class="draggable" style="position: absolute;"></div>');
    uniqueId++;
    createDivWrap.html($("#card-default").html());
    addEventsToElement(createDivWrap);
    $("#input-card").append(createDivWrap);
  });

  $("#btn-color").click(function(event)
  {
    event.preventDefault();
    var hex = $("#color-selection").val();
    $("#current-color").html(hex);

    $('#input-card').find('div').each(function(){
      if ($(this).hasClass('card-selected')){
        $(this).css("background-color", $("#color-selection").val())
      };
    });

  });
});

function addEventsToElement(tempElement)
{
  tempElement.draggable(
  {
    // event handlers
    start: noop(),
    drag:  function(){
      newCanvas.connect();
    },
    stop:  noop()
  }).dblclick(function(){addId(tempElement);});

  //Add Click events to buttons save-card and edit-card in the card using DOM Traversal

  tempElement.find(".save-card").click(function(){saveInfo(tempElement);});
  tempElement.find(".edit-card").click(function(){editInfo(tempElement);});
  tempElement.find(".remove-card").click(function(){removeInfo(tempElement);});
  tempElement.find("#add-image").click(function();

  {
    var outputOne = $(this).parent().find("#output-image-1");
    addImage(outputOne);
    var outputTwo = $(this).parent().parent().find("#output-image-2");
    addImage(outputTwo);
  });
}

function addImage(id){
  var src = 'img/dog.png';
  id.html('<img src='+src+' alt="Some Image" style="width:64px;height:64px;">');
}

function getHexColor(){
  return $("#color-selection").val();
}

function resizeCanvas()
{
  newCanvas.setToWindow();
  newCanvas.connect();
}

function saveInfo(id)
{
  var parent = $(id);
  var title = parent.find("#input-title").val();
  var note = parent.find("#input-note").val();
  parent.find("#output-title").text(title);
  parent.find("#output-note").text(note);
  parent.find(".card-body").show();
  parent.find(".input-form").hide();
}

function editInfo(id)
{
  var parent = $(id);
  var title = parent.find("#output-title").text();
  var note = parent.find("#output-note").text();
  console.log(title);
  parent.find("#input-title").val(title);
  parent.find("#input-note").val(note);
  parent.find(".card-body").hide();
  parent.find(".input-form").show();
}

function removeInfo(id)
{
  id.remove();
}


function noop(){}

Canvas.prototype.connect = function ()
{
  this.ctx.clearRect(0,0,this.width,this.height);
  for(var i=0;i<this.length;i++)
  {
    var connection = this.connectors[i];

    var c={from:$(connection[0]),to:$(connection[1])};
    var pos1=c.from.offset();
    var pos2=c.to.offset();
    var positionOne = [pos1.left+16-this.offset.left,pos1.top+16-this.offset.top];
    var positionTwo = [pos2.left+16-this.offset.left,pos2.top+16-this.offset.top];
    this.ctx.beginPath();
    //moveTo creates a point on cavas
    this.ctx.moveTo(positionOne[0],positionOne[1]);
    //creates a line to the new point
    this.ctx.lineTo(positionTwo[0],positionTwo[1]);
    //console.log(this.connectors[0])
    //creates the line
    this.ctx.stroke();
  }
}

function addId(tempId)
{
  lineId.push(tempId);

  if($(tempId).hasClass("card-selected"))
  {
    $(tempId).removeClass("card-selected");
  }
  else
  {
    $(tempId).addClass("card-selected");
  }

  if(lineId.length > 1)
  {
    //console.log(lineId);
    var reverseArr = lineId.slice();
    reverseArr.reverse();
    if(newCanvas.indexOf(lineId)!=-1)
    {
      newCanvas.removeAt(newCanvas.indexOf(lineId));
    }
    else if(newCanvas.indexOf(reverseArr)!=-1)
    {
      newCanvas.removeAt(newCanvas.indexOf(reverseArr));
    }
    else if(lineId[0]!=lineId[1])
    {
      newCanvas.push(lineId[0],lineId[1]);
    }
    lineId.forEach(function(line){
      $(line).removeClass("card-selected");
    });

    lineId = [];
    newCanvas.connect();
  }
}

function Canvas(canvasId)
{
  this.canvas = document.getElementById(canvasId);
  this.offset = $("#"+canvasId).offset();
  this.ctx = canvas.getContext("2d");
  this.setToWindow();
  this.ctx.lineWidth = 3;
  this.connectors = [];
  this.length = 0;
}

Canvas.prototype.setWidth = function(input)
{
  this.canvas.width = input;
  this.width = input;
}

Canvas.prototype.setHeight = function(input)
{
  this.canvas.height = input;
  this.height = input;
}

Canvas.prototype.setToWindow = function()
{
  this.setWidth(window.innerWidth);
  this.setHeight(window.innerHeight);
}

Canvas.prototype.push = function(id1,id2)
{
  this.connectors.push([id1,id2]);
  this.length = this.connectors.length;
}

Canvas.prototype.indexOf = function(idArr)
{
  var counter = 0;
  var location = -1;

  this.connectors.forEach(function(connector){
    if(connector[0]===idArr[0]&&connector[1]===idArr[1])
    {
      location = counter;
    }
    counter++;
  });
  return (location);
}

Canvas.prototype.removeAt = function(location)
{
  if(this.connectors.length === 1)
  {
    this.connectors.pop();
  }
  else if (location === 0) {
    this.connectors.shift();
  }
  else
  {
    this.connectors.splice(location,location);
  }
}
