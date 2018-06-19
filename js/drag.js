//https://stackoverflow.com/questions/21864989/draw-lines-between-2-elements-in-html-page
var newCanvas;
var lineId = [];

$(function()
{
  var clickIds = document.getElementsByClassName("draggable");

  for (var i = 0; i < clickIds.length; i++)
  {
    clickIds[i].addEventListener('dblclick', getID,false);
    //clickIds[i].addEventListener('dblclick', getID,false);
  }

  newCanvas = new Canvas("canvas");
  connectObjects();
  $(".click-id").dblclick(function()
  {
    //console.log($("#0").offset());
  });
});

function Canvas(canvasID)
{
  this.canvas = document.getElementById("canvas");
  this.offset = $("#"+canvasID).offset();
  this.ctx = canvas.getContext("2d");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx.lineWidth = 3;
  this.connectors = [];
}

Canvas.prototype.push = function(id1,id2)
{
  this.connectors.push([id1,id2]);
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

  console.log("Counter: "+location);
  return (location);
}

Canvas.prototype.removeAt = function(location)
{
  this.connectors.splice(0,location);
}

function connectObjects()
{
  connect();
  $(".draggable").draggable({
    // event handlers
    start: noop,
    drag:  connect,
    stop:  noop
  });
}

function noop(){}

function connect(){
  newCanvas.ctx.clearRect(0,0,newCanvas.canvas.width,newCanvas.canvas.height);
  //console.log(newCanvas.connectors[0]);
  //console.log(newCanvas.offset.top);
  var topOffset = newCanvas.offset.top;
  var leftOffset = newCanvas.offset.left;
  //newCanvas.ctx.translate(0,-60);
  for(var i=0;i<newCanvas.connectors.length;i++)
  {
    // this.connectors.push({from:id1,to:id2});
    var connection = newCanvas.connectors[i];

    var c={from:$(connection[0]),to:$(connection[1])};
    var eFrom=c.from;
    var eTo=c.to;
    var pos1=eFrom.offset();
    var pos2=eTo.offset();
    newCanvas.ctx.beginPath();
    //moveTo creates a point on cavas
    newCanvas.ctx.moveTo(pos1.left+16-leftOffset,pos1.top+16-topOffset);
    //creates a line to the new point
    newCanvas.ctx.lineTo(pos2.left+16-leftOffset,pos2.top+16-topOffset);
    //console.log(newCanvas.connectors[0])
    //creates the line
    newCanvas.ctx.stroke();
  }
  //console.log(newCanvas.connectors[0])
}

function getID(event)
{
  lineId.push("#"+event.target.id)
  console.log(event.target.id);
  // console.log(lineId);
  if(lineId.length > 1)
  {
    var reverseArr = lineId.slice();
    reverseArr.reverse();
    if(newCanvas.indexOf(lineId)!=-1)
    {
      console.log("Test 1: "+newCanvas.indexOf(lineId).toString())
    }
    else if(newCanvas.indexOf(reverseArr)!=-1)
    {
      console.log("Test 2: "+newCanvas.indexOf(reverseArr).toString());
    }
    else if(lineId[0]!=lineId[1])
    {
      newCanvas.push(lineId[0],lineId[1])
      connect();
    }
    lineId = [];
  }
}
