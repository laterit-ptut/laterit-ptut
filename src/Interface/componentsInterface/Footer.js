import React from 'react'
import { StateMapManager } from '../../Map/componentsMap/StateMapManager';

export function Footer() {
	return <>
    <div className='Footer'>
      <p className='aProposLink' onClick={() => {StateMapManager.changeAPropos(StateMapManager.getAPropos() === true ? false : true)}}>A propos</p>
      <div className='langues'>
        <img src='./icons/france.svg' />
      </div>
    </div>
	</>
}
 