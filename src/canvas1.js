var fr;
var size = 1024;
var pt;
var start = [];
var visit = [];
var particles = [];
var particle_map = {};
var restart = 0;

function coordToStr(r, c) {
  return String(r) + "," + String(c)
}

function setup() {
  var canvas = createCanvas(1024, 1024);
  canvas.parent('canvas1');
  fr = createP('');

  for (var r = 0; r < size; r += 1) {
    if (field[1023][r].length != 0) {
      start.push([1023, r]);
      visit.push([1023,r]);
      particles.push(new Particle(r, 1023));
    }
  }
  background(0, 0, 0, 0);
}

function draw() {
  background(255);
  restart += 1;
  var next = [];
  var next_particles = [];
  for (let p = 0; p < visit.length; p++) {
    pt = visit[p];
    let coord = coordToStr(pt[0], pt[1]);
    particle_map[coord] = [particles[p], 0];
    for (let i = 0; i < field[pt[0]][pt[1]].length; i ++) {
      change = field[pt[0]][pt[1]][i];
      let dr = change[0];
      let dc = change[1];
      let angle = atan2(dr, dc) * 180 / PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      stroke(0, 50);
      // push();
      // translate(point[1], point[0]);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, 1, 0);
      // pop();
      particles[p].follow(v);
      particles[p].update();
      particles[p].edges();
      particles[p].show();
      next.push([pt[0]+dr, pt[1]+dc]);
      next_particles.push(new Particle(pt[1]+dc, pt[0]+dr));
    }
  }
  visit = next.slice(0);
  particles = next_particles.slice(0);
  next_particles = [];
  next = [];

  for (let key in particle_map) {
      particle_map[key][1] += 0.5;
      let alpha = 255.0 / particle_map[key][1];
      particle_map[key][0].show(alpha);
      if (particle_map[key][1] > 100) {
          delete particle_map[key];
      }
  }

  if (restart == 200) {
      console.log('restart');
      visit.push(...start);
      for (let k = 0; k < start.length; k++) {
          particles.push(new Particle(start[k][1], start[k][0]));
      }
      restart = 0;
  }

  fr.html(floor(frameRate()));
}
