import bezier from "bezier-easing";

export class Bezier {

  bez = new bezier(.5,-0.01,.5,1);
  a = 0;
  b = 0;
  anim = 0;
  frames = 500;

  setPoints(a, b) {
    this.a = a;
    this.b = b;
    this.anim = 0;
  }

  get() {
    if(this.anim < this.frames) {
      let coord = this.a - this.bez(1/this.frames * this.anim) * (this.a - this.b);
      this.anim++
      return coord;
    }else {
      return false;
    }
  }
}
  