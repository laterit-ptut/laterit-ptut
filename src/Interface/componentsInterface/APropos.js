import React, { useEffect, useState } from 'react'
import { StateMapManager } from '../../Map/componentsMap/StateMapManager';

export function APropos() {
  const [aPropos, setAPropos] = useState(false);

  useEffect(()=> {
    StateMapManager.addCallbackAPropos(changeAPropos);
  }, []);

  function changeAPropos(bool) {
    setAPropos(bool);
  }

	return <>
    {(aPropos !== false) && 
      <div className='Interface'>
        <div className="content">
          <div className="aPropos">
            <h2>Marie-Clémence & Cesar PAES  </h2>
            <h3>Un regard qui prend le temps d’aller vers l’autre</h3>

            <div className="scroll">
              <p className="article" > Leurs films laissent parler la poésie et font naître cette émotion qui procure de la joie et réveille les consciences. Marie-Clémence et Cesar Paes disent des choses engagées et sérieuses, mais ils le font en nous plaçant dans un état de rêve éveillé où il n'est pas essentiel de tout saisir d'un coup, puisque la présence des personnes, la couleur, le rythme et la pertinence de leurs discours vont rester en nous, puisque les traces du film font un travail en profondeur qui soudain nous interroge dans un sursaut sainement perturbateur. La démarche des Paes s'appuie sur le respect de l'autre ; le temps de son approche, de son écoute, se retrouve fondamentalement dans la restitution de sa réalité. Et comme il s'agit beaucoup de littérature orale, Le cinéma ne serait-il pas, finalement, le support qui transmet plus justement les paroles des conteurs, laissant libre cours à leur imaginaire, à notre imaginaire. Le regard des Paes chasse tout exotisme, il exerce notre regard et nous propose d'aller vers l'autre tout en pénétrant en soi-même, Il nous rend tout simplement un peu plus sensibles, un peu plus ouverts, un peu moins cartésiens.  </p>
              <p className="auteur" > Martine Armand </p>
              <p className="provenance" > pour le Festival international du Film de Fribourg </p>
              <p className="description" > Elle est franco-Malgache , il est Brésilien et Français. Ils ont fondé Laterit en 1988 pour faire entendre les cultures orales à travers des films, de la musique et des livres ;. en particulier de Madagascar, du Brésil et des îles. Auteurs entre autres de « Mahaleo »  , co produit par ARTE Cinema avec la participation de Canal +, un portrait du groupe culte malgache. « Saudade do Futuro » les joutes musicales improvisées des migrants Nordestins racontent Sao Paulo la mégalopole. Grand Prix du public aux Rencontres de Cinéma du Forum des images. « Aux guerriers du silence » Tourné en Laponie et au Brésil, il a fait l’ouverture de la Mostra du Sommet de la Terre Rio en 1992 . « Le Bouillon d’Awara » sur l’immigration et le métissage en Guyane à travers une recette de cuisine magique.  " l'Opera du bout du monde"  pour découvrir en musique l'histoire des îles de L'Océan Indien. Plus récemment Songs for Madagascar et Fahavalo Madagascar 1947 sont des films qui sont sortis au cinéma en 2018 et 2019 et en DVD et VOD .  </p>
              <p className="description" > Leur premier film : « Angano… angano… Nouvelles de Madagascar » primé au festival du cinéma du Réel, et Grand Prix du festival dei Popoli en 1989 est à la source du projet interactif Voan-dalana (graines de voyage)  développé avec les élèves ingénieurs IMAC de L’Université Gustave Eiffel de Marne la Vallée .(à affiner)   </p>

              <div className="mcc_div">
                <img className="mcc" alt="eux" src={"/medias/images/mcc.jpeg"} />
                <figcaption >  MC & C Paes, 1988 tournage de « Angano…angano…nouvelles de Madagascar »</figcaption>
              </div>

              <div className='generique'> 
                <p><span>Conception et réalisation</span> : Marie Clémence et Cesar Paes</p>
                <p><span>Chef Operateur image</span> : Cesar Paes</p>
                <p><span>Ingénieur du son</span> : Raoul Fruhauf </p>
                <p><span>Post production</span> : Agnès Contensou</p>
                <p><span>Production</span> : laterit en partenariat avec l'IMAC - Université Gustave Eiffel</p>
                <p><span>Consultant Scenographie</span> : Alexandre Garland</p>
                <p><span>Graphiste et développeuse carte</span> : Lauriane Gélébart</p>
                <p><span>Développeur carte</span> : Loïc Quinquenel</p>
                <p><span>Modélisateur carte</span> : Fady Bekkar</p>
                <p><span>Tuteur académique</span> : Sylvain Cherrier</p>
              </div>
            </div>
            <button className='btn'>
              <img className="go_map" alt="go_map" src={"/icons/center.png"} onClick={() => StateMapManager.changeAPropos(false)} />
            </button> 
          </div>
        </div>
      </div>
    }
	</>
}
 