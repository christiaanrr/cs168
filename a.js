var canvas, ctx;
var pxs = {};
var size = 1024;
var point;
var start= [];
var visit = [];
// var field = require('.vfield.json');
function coordToStr(r, c) {
  return String(r) + "," + String(c)
}
function strToCoord(st) {
  return st.split(",");
}

function tick() {
  var next = [];
  // ctx.fillStyle = "#FF0000";
  while (visit.length > 0) {
    point = visit.pop()
    // console.log('STRING', coordToStr(point[0], point[1]));
    pxs[coordToStr(point[0], point[1])] = 1;
    // ctx.fillRect(point[1], point[0], 1, 1);
    // console.log(point[0], point[1], field[point[0]][point[1]])

    for (let i = 0; i < field[point[0]][point[1]].length; i ++) {
      change = field[point[0]][point[1]][i];
      // console.log('CHANGE',change)
      let dr = change[0];
      let dc = change[1];
      next.push([point[0]+dr, point[1]+dc])
      // console.log('changes', [point[0]+dr, point[1]+dc]);
    }
  }
  visit = next.slice(0);
  next = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var key in pxs) {
    pxs[key] += 1;
    if (pxs[key] >= 100) {
      delete pxs[key];
    } else {
      let val = pxs[key];
      a = 10.0/val;
      // console.log(val)
      let coords = strToCoord(key);
      coords[0] = parseInt(coords[0]);
      coords[1] = parseInt(coords[1]);
      // console.log('coords', coords, a);
      ctx.fillStyle = 'rgba(255, 100, 0, '+ a + ')';
      // console.log('rgba(255, 100, 0, ' + a + ')')
      ctx.fillRect(coords[1], coords[0], 1, 1);
    }
  }
}

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  for (var r = 0; r < size; r += 1) {
    if (field[1023][r].length != 0){
      start.push([1023, r])
      visit.push([1023,r])
      console.log(field[1023][r], visit)
    }
  }
  window.setInterval(tick, 100);
  window.setInterval(function() {
      for (let s in start) {
          visit.push(s)
      }

  }, 5000);
  // console.log(visit);
}
