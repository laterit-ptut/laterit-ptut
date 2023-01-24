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

  //cameraTravel
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
}