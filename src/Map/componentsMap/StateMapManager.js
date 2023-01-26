export class StateMapManager {

  //active Point
  static activePoint = {
    value : -1,
    callbackFunctions: []
  };

  static prevPoint = -1;

  static changeActivePoint(index) {
    if(index !== this.activePoint.value) {
      this.prevPoint = this.activePoint.value;
      if(index === -1) {
        this.prevPoint = -1;
      }
      this.activePoint.value = index;
      this.activePoint.callbackFunctions.forEach(funct => {
        funct(index);
      });
    }
  }

  static getActivePoint() {
    return this.activePoint.value;
  }

  static addCallbackActivePoint(funct) {
    this.activePoint.callbackFunctions.push(funct);
  }

  static getPrevPoint() {return this.prevPoint}

  //blockInterface
  static blockInterface = {
    value : false,
    callbackFunctions: []
  };

  static changeBlockInterface(bool) {
    if(bool !== this.blockInterface.value) {
      this.blockInterface.value = bool;
      this.blockInterface.callbackFunctions.forEach(funct => {
        funct(bool);
      });
    }
  }

  static getBlockInterface() {
    return this.blockInterface.value;
  }

  static addCallbackBlockInterface(funct) {
    this.blockInterface.callbackFunctions.push(funct);
  }

  //Number of points

  static numberOfPoints = 0; 

  static getNumberOfPoints() {return this.numberOfPoints}

  static setNumberOfPoints(number) {this.numberOfPoints = number}

  //A propos

  static aPropos = {
    value : false,
    callbackFunctions: []
  };

  static changeAPropos(bool) {
    if(bool !== this.aPropos.value) {
      this.aPropos.value = bool;
      this.aPropos.callbackFunctions.forEach(funct => {
        funct(bool);
      });
    }
    if(bool) {
      this.changeActivePoint(-1);
    }
  }

  static getAPropos() {
    return this.aPropos.value;
  }

  static addCallbackAPropos(funct) {
    this.aPropos.callbackFunctions.push(funct);
  }
}