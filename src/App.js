import './App.css';
import { useState, useEffect, Suspense } from 'react'
import PointPage from './Interface/componentsInterface/PointPage';
import APropos from './Interface/componentsInterface/APropos';
import { Map } from './Map/Map';
import { Loader } from './utils/Loader';
import { Sleep } from './Interface/componentsInterface/Sleep';

let timer;

const App = () => {
	const [activePoint, setActivePoint] = useState(-1)
	const [aProposIsActive, setAProposIsActive] = useState(-1)
  const [data,setData]=useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sleep, setSleep] = useState(true);

  const getData = () => {
    fetch('./test.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response){
      console.log(response)
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      setData(myJson)
    });
  }
  
  function checkSleep() {
    let now = Date.now();
    if((now - timer) > 1000 * 60) { //60 seconds
      setSleep(true);
    }
  }

  function handleClick() {
    timer = Date.now();
  }

  useEffect(()=>{
    getData();
    timer = Date.now();
    setInterval(checkSleep, 1000);
  },[])

  return (
    <div className="App" onClick={handleClick}>
      {(sleep) &&
        <Sleep setSleep={setSleep} setActivePoint={setActivePoint} />
      }
      {(!sleep) &&       
        <Suspense fallback={<Loader />}>
          {(!loaded) && 
            <Loader setLoaded={setLoaded} />
          }
          {(activePoint !== -1) && 
            <div className='Interface'>
              {(Object.keys(data).length > 0) &&
                <div className="content">
                  {(activePoint > -1) &&
                    <PointPage 
                      data = {data.points[activePoint]}
                      setActivePoint={setActivePoint}   
                      activePoint={activePoint} >
                    </PointPage> 
                  }
                  {(aProposIsActive > -1) &&
                    <APropos 
                      setAProposIsActive = {setAProposIsActive} >
                    </APropos> 
                  }
                  {/* <div className="div_test" >
                    <p className="point" onClick={() => setActivePoint(1)}>Point </p>
                    <p className="aPropos_link" onClick={() => setAProposIsActive(1)}> A Propos</p>
                  </div> */}
                </div>
              }
            </div>
          }
          <Map setActivePoint={setActivePoint} activePoint={activePoint} />
        </Suspense>
      }
    </div>
  );
}

export default App;