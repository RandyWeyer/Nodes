$(function(){
  var canvas = document.getElementById('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var raf;
  var running = false;
  var dragging = false;

  function grid() {
    var w = canvas.width,
        h = canvas.height;

    /**
     * i is used for both x and y to draw
     * a line every 5 pixels starting at
     * .5 to offset the canvas edges
     */
    for(var i = .5; i < w || i < h; i += 15) {
        // draw horizontal lines
        ctx.moveTo( i, 0 );
        ctx.lineTo( i, h);
        // draw vertical lines
        ctx.moveTo( 0, i );
        ctx.lineTo( w, i);
    }
    ctx.strokeStyle = 'hsla(0, 0%, 40%, .5)';
    ctx.stroke();
}

grid();

  function clear() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    grid();
  }

  function draw() {
    clear();
    raf = window.requestAnimationFrame(draw);
  }

});
