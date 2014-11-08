var canvas,
    context,
    x, y,
    innerR, outerR;
    
window.onload = function () {
  init();
  animate();
};

function init() {
  canvas = document.getElementById("color-clock");
  context = canvas.getContext("2d");
  
  //center the clock inside the canvas
  x = canvas.width / 2;
  y = canvas.height / 2;
  innerR = 0;
  outerR = Math.min(x, y);  //to ensure that the whole clock is always visible
}

function animate() {
  requestAnimationFrame(animate);
  draw();
}

function draw() {
  var grad,
      time = new Date(),
      s = time.getSeconds() + time.getMilliseconds() / 1000,
      m = time.getMinutes() + s / 60,
      h = time.getHours()   + m / 60,
      d = time.getDay()     + h / 24,
      saturation = 1,
      lightness = 0.5;

  grad = context.createRadialGradient(x, y, innerR, x, y, outerR);
  grad.addColorStop(0,    hslToRgb(s / 60, saturation, lightness));
  grad.addColorStop(0.33, hslToRgb(m / 60, saturation, lightness));
  grad.addColorStop(0.67, hslToRgb(h / 24, saturation, lightness));
  grad.addColorStop(1,    hslToRgb(d /  7, saturation, lightness));
  
  context.fillStyle  = grad;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

//based on http://stackoverflow.com/a/9493060/536650
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function (p, q, t){
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
}