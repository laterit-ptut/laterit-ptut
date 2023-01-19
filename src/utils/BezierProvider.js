export class BezierProvider {
  static beziers = {};

  static changeFramerate(fps) {
    let keys = Object.keys(this.beziers);
    keys.forEach(key => {
      this.beziers[key].forEach(e => {
        e.changeFramerate(fps);
      });
    });
  }
}

//store ALL beziers of this app with keys eg : map, point1, point2 ...