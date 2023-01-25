import './App.css';
import { useState, useEffect, Suspense } from 'react'
import { Map } from './Map/Map';
import { Loader } from './utils/Loader';
import { Sleep } from './Interface/componentsInterface/Sleep';
import { Points } from './Interface/componentsInterface/Points';
import { APropos } from './Interface/componentsInterface/APropos';
import { Footer } from './Interface/componentsInterface/Footer';
import { StateMapManager } from './Map/componentsMap/StateMapManager';

let timer;

const App = () => {
	
  const [data,setData]=useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sleep, setSleep] = useState(true);

  const getData = () => {
    fetch('./data.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response){
      return response.json();
    })
    .then(function(myJson) {
      StateMapManager.setNumberOfPoints(myJson.points.length);
      setData(myJson);
    });
  }
  
  function checkSleep() {
    let now = Date.now();
    if((now - timer) > 1000 * 60 * 3) { // 3min
      setSleep(true);
    }
  }

  /*
  //top-left reference point
  var p0 = {
    scrX: -15,        // Minimum X position on screen
    scrY: -80,         // Minimum Y position on screen
    lat: -11.333609,    // Latitude
    lng: 46.907222     // Longitude
  }

  */

  var p0 = {
    scrX: 0,        // Minimum X position on screen
    scrY: 0,         // Minimum Y position on screen
    lat: -17.32,    // Latitude
    lng: 45.37     // Longitude
  }

  //bottom-right reference point
  var p1 = {
    scrX: 53,          // Maximum X position on screen
    scrY: 78,        // Maximum Y position on screen
    lat: -25.813589,    // Latitude
    lng: 46.696026     // Longitude
  }

  function latlngToGlobalXY(lat, lng){
    //Calculates x based on cos of average of the latitudes
    let x = 6371*lng*Math.cos((p0.lat + p1.lat)/2);
    //Calculates y based on latitude
    let y = 6371*lat;
    return {x: x, y: y}
  }

  function latlngToScreenXY(lat, lng){
    let pos = latlngToGlobalXY(lat, lng);
    pos.perX = ((pos.x-p0.pos.x)/(p1.pos.x - p0.pos.x));
    pos.perY = ((pos.y-p0.pos.y)/(p1.pos.y - p0.pos.y));

    return {
      x: p0.scrX + (p1.scrX - p0.scrX)*pos.perX,
      y: p0.scrY + (p1.scrY - p0.scrY)*pos.perY
    }
  }

  function handleClick() {
    timer = Date.now();
  }

  useEffect(()=>{
    getData();

    p0.pos = latlngToGlobalXY(p0.lat, p0.lng);
    p1.pos = latlngToGlobalXY(p1.lat, p1.lng);

    // console.log(latlngToScreenXY(-23.485089, 45.614438));
    // console.log(latlngToScreenXY(-20.087899, 48.112768));
    
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
          <APropos />
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
          <Footer />
          <Map data={data} />
        </Suspense>
      }
    </div>
  );
}

export default App;