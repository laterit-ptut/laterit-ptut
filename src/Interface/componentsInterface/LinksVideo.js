import React, { useState, useEffect} from 'react'

function LinksVideo({data, setActiveVideo, index}) {   
	const [index2, setIndex2] = useState(1);
	const [index3, setIndex3] = useState(2);

	function changeVideo(nb) {	
    index = (index+nb)%3; 
    setActiveVideo(index); 
	}

	useEffect(() => {
		setIndex2((index+1)%3);
		setIndex3((index+2)%3);
  },[index]) ; 

	return(
		<div className="links">
      <button className='btn'>
        <img className="video_left" alt="video_left" src={"/medias/videos/" + data.videos[index2].pathThumbnail} onClick={() => changeVideo(1)} />
      </button>
      <button className='btn'>
        <img className="video_right" alt="video_right" src={"/medias/videos/" + data.videos[index3].pathThumbnail} onClick={() => changeVideo(2)} />
      </button>
		</div>
	)
}

export default LinksVideo
 