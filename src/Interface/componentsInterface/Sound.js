import React from 'react'
import { useState, useEffect } from 'react'

function Sound({data, activePoint, playSound, setPlaySound}) {
	const [translateSound, setTranslateSound] = useState(new Audio("/medias/sons/" + data.proverbes.fr.pathFile)) ; 
	const [sound, setSound] = useState(new Audio("/medias/sons/" + data.proverbes.mg.pathFile)) ;  
	
	const [soundIcon, setSoundIcon] = useState("/medias/images/play.png") ; 
	const [soundIconT, setSoundIconT] = useState("/medias/images/play.png") ; 

	const [activeSound, setActiveSound] = useState(0) ; 

    useEffect(() => {  
        if (playSound != 0){
            activeSound.pause(); 
            activeSound.currentTime = 0;
            setPlaySound(0); 
        }
        setTranslateSound(new Audio("/medias/sons/" + data.proverbes.fr.pathFile));
        setSound(new Audio("/medias/sons/" + data.proverbes.mg.pathFile));
    },[activePoint]);


    useEffect(() => {  
        if (activeSound != 0){
            if (playSound == 0){ 
                activeSound.play() ; 
                setPlaySound(1) ; 
            } 
            else { 
                activeSound.pause(); 
                activeSound.currentTime = 0;
                setPlaySound(0); 
            }
        }
    },[activeSound]);


    function play(theSound){
        if (theSound != activeSound) { 
            if (playSound != 0 ) { 
                activeSound.pause() ; 
                activeSound.currentTime = 0;
                setPlaySound(0); 
            }
            setActiveSound(theSound); 
        }
        else {
            if (playSound == 0){ 
                activeSound.play() ; 
                setPlaySound(1) ; 
            } 
            else { 
                activeSound.pause(); 
                activeSound.currentTime = 0;
                setPlaySound(0); 
            }
        }
    }


    function clickSoundT(){
        play(translateSound);
        
        if (playSound == 0) { 
                setSoundIconT("/medias/images/pause.png");   
        }
        else if (playSound == 1 && translateSound == activeSound) { 
                setSoundIconT("/medias/images/play.png");  
        }
        else if (playSound == 1 && sound == activeSound) { 
                setSoundIcon("/medias/images/play.png");  
                setSoundIconT("/medias/images/pause.png");   
        }
    }

    function clickSound(){
        play(sound);

        if (playSound == 0) { 
                setSoundIcon("/medias/images/pause.png");   
        }
        else if (playSound == 1 && sound == activeSound) { 
                setSoundIcon("/medias/images/play.png");  
        }
        else if (playSound == 1 && translateSound == activeSound) { 
                setSoundIcon("/medias/images/pause.png");  
                setSoundIconT("/medias/images/play.png");   
        }
    }


	return(
		<div className="sound" >
            <div className="prov_mg">
                <p className="proverbe" >{data.proverbes.mg.text}</p>
                <button className='btn'>
                    <img className="soundM" alt="malgache_proverbe" src={soundIcon} onClick={() => clickSound()}/>
                </button>
            </div>
            <div className="prov_tr">
                <p className="proverbe" >{data.proverbes.fr.text}</p>
                <button className='btn'>
                    <img className="sounT" alt="translate_proverbe" src={soundIconT} onClick={() => clickSoundT()}/>
                </button>
            </div>
		</div>
	)
}

export default Sound
 