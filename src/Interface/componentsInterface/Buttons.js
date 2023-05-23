import React from 'react'
import { StateMapManager } from '../../Map/componentsMap/StateMapManager';

function Buttons({ setActivePoint, index }) {

  function changePoint(nb) { //-1 prev / 0 reset / 1 next
    let nbPoints = StateMapManager.getNbPoints()
    if (nb === 0) {
      index = -1;
      StateMapManager.setActiveChemin(-1);
    }
    else {
      let activeChemin = StateMapManager.getActiveChemin();
      if (activeChemin == -1) {
        let new_index = index + nb;
        if (new_index < 0) index = nbPoints - 1;
        else index = Math.abs(new_index) % nbPoints;
      } else {
        if (nb === -1) {
          index = StateMapManager.getPrevPointOnChemin();
        }
        if (nb === 1) {
          index = StateMapManager.getNextPointOnChemin();
        }
      }
    }
    setActivePoint(index);
    StateMapManager.changeActivePoint(index);
  }

  return (
    <div className="buttons" >
      <button className='btn'>
        <img className="arrow_left" alt="arrow_left" src={"/icons/left.png"} onClick={() => changePoint(-1)} />
      </button>
      <button className='btn'>
        <img className="go_map" alt="go_map" src={"/icons/center.png"} onClick={() => changePoint(0)} />
      </button>
      <button className='btn'>
        <img className="arrow_right" alt="arrow_right" src={"/icons/right.png"} onClick={() => changePoint(1)} />
      </button>
    </div>
  )
}

export default Buttons
