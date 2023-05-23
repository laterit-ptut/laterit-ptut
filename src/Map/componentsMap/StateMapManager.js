export class StateMapManager {

  //active Point
  static activePoint = {
    value: -1,
    callbackFunctions: []
  };

  static prevPoint = -1;

  static changeActivePoint(index) {
    if (index !== this.activePoint.value) {
      this.prevPoint = this.activePoint.value;
      if (index === -1) {
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

  static getPrevPoint() { return this.prevPoint }

  //blockInterface
  static blockInterface = {
    value: false,
    callbackFunctions: []
  };

  static changeBlockInterface(bool) {
    if (bool !== this.blockInterface.value) {
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

  //nbPoints

  static nbPoints = -1;

  static setNbPoints(number) { this.nbPoints = number; }
  static getNbPoints() { return this.nbPoints }

  //Active chemins

  static activeChemin = -1;

  static setActiveChemin(number) { this.activeChemin = number; }
  static getActiveChemin() { return this.activeChemin }
  static getNameActiveChemin() { return this.chemins[this.activeChemin].name }

  //Chemins

  static chemins = [];

  static setChemins(data) { this.chemins = data }

  static getNextPointOnChemin() {
    if (this.activeChemin !== -1) {
      let index = this.chemins[this.activeChemin].points.indexOf(this.activePoint.value);
      if (index + 1 === this.chemins[this.activeChemin].points.length) {
        return this.chemins[this.activeChemin].points[0];
      } else {
        return this.chemins[this.activeChemin].points[index + 1];
      }
    }
  }

  static getPrevPointOnChemin() {
    if (this.activeChemin !== -1) {
      let index = this.chemins[this.activeChemin].points.indexOf(this.activePoint.value);
      if (index === 0) {
        return this.chemins[this.activeChemin].points[this.chemins[this.activeChemin].points.length - 1];
      } else {
        return this.chemins[this.activeChemin].points[index - 1];
      }
    }
  }

  //A propos

  static aPropos = {
    value: false,
    callbackFunctions: []
  };

  static changeAPropos(bool) {
    if (bool !== this.aPropos.value) {
      this.aPropos.value = bool;
      this.aPropos.callbackFunctions.forEach(funct => {
        funct(bool);
      });
    }
    if (bool) {
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