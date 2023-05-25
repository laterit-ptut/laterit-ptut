import React from 'react'
import { useState, useEffect } from 'react'
import { StateMapManager } from '../../Map/componentsMap/StateMapManager';

export function Menu({ chemins }) {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleMenuClick() {
        setMenuOpen(!menuOpen);
    }

    return <>
        <div className={`Menu ${menuOpen ? "open" : ""}`} >

            <div className="menuContent">
                <div className={`${menuOpen ? "menuButton menuOpen" : "menuButton"}`} onClick={() => handleMenuClick()}>
                    <img src="/icons/chemin.png" />
                </div>
                <div className="titlesChemin">
                    <h2>LÃ lana</h2>
                    <h3>Les chemins</h3>
                </div>
                {(chemins).map((chemin, index) =>
                    <div className="cheminLink" key={index} onClick={() => {
                        StateMapManager.setActiveChemin(index);
                        StateMapManager.changeActivePoint(chemin.points[0]);
                        handleMenuClick();
                    }}>
                        <img src={`/icons/${chemin.icon}`} />
                        <p>{chemin.name}</p>
                    </div>
                )}
            </div>

        </div>
    </>
}