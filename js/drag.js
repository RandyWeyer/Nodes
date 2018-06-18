//https://stackoverflow.com/questions/21864989/draw-lines-between-2-elements-in-html-page
var newCanvas;

$(function()
{
  $( ".drag" ).draggable();
  newCanvas = new Canvas(document.getElementById("canvas"));
  connectObjects();


});

function Canvas(canvasName)
{
  this.canvas = canvasName;
  this.ctx = canvas.getContext("2d");

  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx.lineWidth = 3;

  this.connectors = [];
}

Canvas.prototype.push = function(id1,id2)
{
  this.connectors.push({from:id1,to:id2});
}

function connectObjects()
{
  newCanvas.push($("#0"),$("#0r"));
  newCanvas.push($("#1"),$("#0r"));
  newCanvas.push($("#2"),$("#2r"));

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
  for(var i=0;i<newCanvas.connectors.length;i++)
  {
    var c=newCanvas.connectors[i];
    var eFrom=c.from;
    var eTo=c.to;
    var pos1=eFrom.offset();
    var pos2=eTo.offset();
    var size1=eFrom.size();
    var size2=eTo.size();
    newCanvas.ctx.beginPath();
    newCanvas.ctx.moveTo(pos1.left+eFrom.width()+3,pos1.top+eFrom.height()/2);
    newCanvas.ctx.lineTo(pos2.left+3,pos2.top+eTo.height()/2);
    newCanvas.ctx.stroke();
  }
}
