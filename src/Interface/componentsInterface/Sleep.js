import React, { useState } from "react";
import './Sleep.css';

export function Sleep({setSleep, setActivePoint}) {

  const [opacity, setOpacity] = useState(true);

  function handleClick() {
    setOpacity(false);
    setTimeout(() => {
      setSleep(false);
      setActivePoint(-1);
    }, 500);
  }

  return (
    <div className={`Sleep ${opacity ? '' : 'wakeup'}`} style={{backgroundImage: `url('/medias/images/PontdeFiherenana.jpg')`}} onClick={handleClick}>
      <img className="line line1" src="/icons/line.svg" alt="" />
      <img className="line line2" src="/icons/line.svg" alt="" />
      <div className="Sleep_button">
        <img src="/icons/arrow.svg" alt="" />
      </div>
    </div>
  );
}