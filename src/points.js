function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 0.1;
  this.h = 0;

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    return false;
  }

  this.follow = function(vector) {
    this.applyForce(vector);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function(alpha) {
    stroke(0, 0, 0, alpha);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }

    strokeWeight(10);
    point(this.pos.x, this.pos.y);
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }

  }

}
