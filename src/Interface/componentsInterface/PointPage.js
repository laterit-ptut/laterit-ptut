import React from 'react'
import { useState, useEffect } from 'react'
import LinksVideo from './LinksVideo';
import Buttons from './Buttons';
import Sound from './Sound';


function PointPage({data, setActivePoint, activePoint}) {
	const [activeVideo, setActiveVideo] = useState(0) ; 
	const [sourceVideo, setSourceVideo] = useState("/medias/videos" + data.videos[activeVideo].pathFile); 
  let index; 

  useEffect(() => {    
    setSourceVideo("/medias/videos/" + data.videos[activeVideo].pathFile); 
  },[activeVideo]); 

  useEffect(() => {    
    setSourceVideo("/medias/videos/" + data.videos[activeVideo].pathFile); 
  },[activePoint]); 

  function changeVideoAtEnd(){
    index = (activeVideo+1)%3;
    setActiveVideo(index); 
  }

	return(
		<div className="pointPage">

      <h2>{data.name.mg}</h2>
      <h3>{data.name.fr + " - " + data.name.en}</h3>
      <video key={sourceVideo} autoPlay onEnded={() => changeVideoAtEnd()}>
          <source src={sourceVideo}  type="video/mp4"/>
      </video> 
      <div className="contenu">
        <p className="description" >{data.text.fr}</p>
        <Sound
          data = {data}
          activePoint = {activePoint}>
        </Sound>
   
        <LinksVideo
          data = {data} 
          setActiveVideo = {(file) => setActiveVideo(file)} 
          index = {activeVideo} >
        </LinksVideo> 

        <Buttons
          setActivePoint={(file) => setActivePoint(file)}   
          index={activePoint}  > 
        </Buttons>
      </div>

		</div>
	)
}

export default PointPage
 