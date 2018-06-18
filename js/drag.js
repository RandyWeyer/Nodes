//https://stackoverflow.com/questions/21864989/draw-lines-between-2-elements-in-html-page
var newCanvas;
var lineId = [];

$(function()
{
  var clickIds = document.getElementsByClassName("draggable");

  for (var i = 0; i < clickIds.length; i++)
  {
    clickIds[i].addEventListener('dblclick', getID,false);
  }

  newCanvas = new Canvas(document.getElementById("canvas"));
  connectObjects();

  $(".click-id").dblclick(function()
  {
    //console.log($("#0").offset());

  });
});

function Canvas(canvasName)
{
  this.canvas = canvasName;
  this.ctx = canvas.getContext("2d");
  console.log(this.ctx);

  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx.lineWidth = 3;

  this.connectors = [];
}

Canvas.prototype.push = function(id1,id2)
{
  // this.connectors.push({from:id1,to:id2});
  this.connectors.push([id1,id2]);
}

function connectObjects()
{
  // newCanvas.push($("#0"),$("#0r"));
  // newCanvas.push($("#1"),$("#0r"));
  // newCanvas.push($("#2"),$("#2r"));
  newCanvas.push("#0","#0r");
  newCanvas.push("#1","#0r");
  newCanvas.push("#2","#2r");

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
  console.log(newCanvas.connectors[0]);
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
    newCanvas.ctx.moveTo(pos1.left,pos1.top+16);
    //creates a line to the new point
    newCanvas.ctx.lineTo(pos2.left,pos2.top+16);
    //creates the line
    newCanvas.ctx.stroke();
  }
  //console.log(newCanvas.connectors[0])
}

function getID(event)
{
  lineId.push("#"+event.target.id)
  console.log(event.target.id);
  console.log(lineId);
  if(lineId.length > 1)
  {
    if(lineId[0]!=lineId[1])
    {
      newCanvas.push(lineId[0],lineId[1])
      connect();
    }
    lineId = [];
  }
}
