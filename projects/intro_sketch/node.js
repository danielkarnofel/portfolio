// node class for portfolio hero sketch
// daniel karnofel
// - - - - - - - - - - - - - - - - - - - - 

const minVel = 0.1;
const maxVel = 5;
const pushScl = 1;
const pullScl = 1;

class Node {
  constructor(x, y) {

    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.origin = createVector(x, y);

    this.push = createVector(0, 0);
    this.pull = createVector(0, 0);
    
    this.originDist = createVector(0, 0); 
    this.mouseDist = createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }
  
  pushForce() {
    
    this.push = p5.Vector.sub(this.pos, mouse);
    this.mouseDist = this.push.mag();
    
    if (this.mouseDist > minDist && this.mouseDist < maxDist) {
      
      let pushSpeed = map(this.mouseDist/(pushScl*maxDist), 0, 1, maxVel, 0);
      this.push.setMag(pushSpeed);
      
      this.vel.add(this.push);
    }
  }
  
  
  pullForce() {
    
    this.pull = p5.Vector.sub(this.pos, this.origin);
    this.originDist = this.pull.mag();
    
    if (this.originDist > 0) {
      
      let pullSpeed = map(this.originDist/(pullScl*maxDist), 0, 1, 0, -maxVel);
      this.pull.setMag(pullSpeed);
      
      this.vel.add(this.pull);
    }
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.set(0, 0);
  }

  show() {   
    point(this.pos.x, this.pos.y);
  }
}