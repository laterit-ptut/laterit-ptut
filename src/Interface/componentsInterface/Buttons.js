import React from 'react'
import { StateMapManager } from '../../Map/componentsMap/StateMapManager';

function Buttons({ setActivePoint, index }) {

  function changePoint(nb) {
    let nbPoints = StateMapManager.getNumberOfPoints();
    if (nb === 0) {
      index = -1;
    }
    else {
      let new_index = index+nb; 
			if (new_index < 0) index = 9; 
			else index = Math.abs(new_index)%9; 
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
