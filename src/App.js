import './App.css';
import { useState, useEffect, Suspense } from 'react'
import { Map } from './Map/Map';
import { Loader } from './utils/Loader';
import { Sleep } from './Interface/componentsInterface/Sleep';
import { Points } from './Interface/componentsInterface/Points';

let timer;

const App = () => {
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
      console.log(response);
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      setData(myJson);
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
        <Sleep setSleep={setSleep} setActivePoint={() => {}} />
      }
      {(!sleep) &&       
        <Suspense fallback={<Loader />}>
          {(!loaded) && 
            <Loader setLoaded={setLoaded} />
          }
          <Points data={data} />
          {/* {(activePoint !== -1) && 
            <div className='Interface'>
              {(Object.keys(data).length > 0) &&
                <div className="content">
                  {(activePoint > -1) &&
                    <PointPage 
                      data = {data.points[activePoint]}
                    /> 
                  }
                  {(aProposIsActive > -1) &&
                    <APropos 
                      setAProposIsActive = {setAProposIsActive} >
                    </APropos> 
                  }
                </div>
              }
            </div>
          } */}
          <Map />
        </Suspense>
      }
    </div>
  );
}

export default App;