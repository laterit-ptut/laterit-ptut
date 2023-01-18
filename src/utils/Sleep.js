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
    <div className={`Sleep ${opacity ? '' : 'wakeup'}`} onClick={handleClick}>
      Sleep
    </div>
  );
}