/*
$(document).ready(function(){
  var canvas = document.getElementById('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var raf;
  var running = false;
  var dragging = false;

  var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 1,
    radius: 25,
    color: 'blue',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };

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
    ball.draw();

    raf = window.requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousedown', function(e) {
    if (!dragging) {
      raf = window.requestAnimationFrame(draw);
      dragging = true;
    }
  });

  canvas.addEventListener('mousemove', function(e) {
    if (dragging) {
      clear();
      ball.x = e.clientX-canvas.getBoundingClientRect().left;
      ball.y = e.clientY-canvas.getBoundingClientRect().top;
      ball.draw();
    }
  });

  canvas.addEventListener('mouseup', function(e) {
    if (dragging) {
      raf = window.requestAnimationFrame(draw);
      dragging = false;
    }
  });

  ball.draw();





});

*/
