import React from 'react'

function Buttons({setActivePoint, index}) {

  function changePoint(nb) {
	  if(nb === 0) { 
		  index = -1 ; 
	  }
		else {
			index = Math.abs(index+nb)%10 ; 
		}
    setActivePoint(index); 
	}

	return(
		<div className="buttons" >
			<button className='btn'>
				<img className="arrow_left" alt="arrow_left" src={"/medias/images/left.png"} onClick={() => changePoint(-1)}/>
			</button>
			<button className='btn'>
				<img className="go_map" alt="go_map" src={"/medias/images/center.png"} onClick={() => changePoint(0)}/>
			</button>
			<button className='btn'>
				<img className="arrow_right" alt="arrow_right" src={"/medias/images/right.png"} onClick={() => changePoint(1)}/>
			</button>
		</div>
	)
}

export default Buttons
 