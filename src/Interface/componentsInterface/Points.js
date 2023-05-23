import { useEffect, useState } from 'react';
import { StateMapManager } from '../../Map/componentsMap/StateMapManager';
import PointPage from './PointPage';

export function Points({ data }) {

  const [activePoint, setActivePoint] = useState(-1);
  const [block, setBlock] = useState(true);
  const [chemin, setChemin] = useState(null);

  useEffect(() => {
    StateMapManager.addCallbackActivePoint(changePoint);
    StateMapManager.addCallbackBlockInterface(blockInterface);
  }, []);

  function blockInterface(bool) {
    setBlock((bool && StateMapManager.getPrevPoint() === -1) ? true : false);
  }

  function changePoint(index) {
    setActivePoint(index);
    let activeChemin = StateMapManager.getActiveChemin();
    if (activeChemin === -1) {
      setChemin(null);
    } else {
      setChemin(StateMapManager.getNameActiveChemin());
    }
  }

  return <>
    {(activePoint !== -1 && !block) &&
      <div className='Interface'>
        {(Object.keys(data).length > 0) &&
          <div className="content">
            <PointPage
              cheminName={chemin}
              data={data.points[activePoint]}
              setActivePoint={setActivePoint}
              activePoint={activePoint}
            />
          </div>
        }
      </div>
    }
  </>
}