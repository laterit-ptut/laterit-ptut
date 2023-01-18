import { useProgress } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import './Loader.css';

export function Loader({setLoaded}) {

  const { active, progress } = useProgress();
  const [done, setDone] = useState(false) ; 

  useEffect(() => {
    if(progress >= 100) {
      setDone(true);
      setTimeout(() => {
        setLoaded(true);
      }, 1500);
    }
  }, [progress, setLoaded])

  return (
    <div className={`Loader ${done ? 'loaded' : ''}`}>
      <div className="progress">
        {(active) &&
          <span className="icon">
            <img alt="ile de Madagascar" src="/icons/loader2.svg" />
          </span>
        }
        <span style={{"--width" : progress + '%'}} className="icon mask">
          <img alt="ile de Madagascar" src="/icons/loader.svg" />
        </span>
      </div>
    </div>
  );
}