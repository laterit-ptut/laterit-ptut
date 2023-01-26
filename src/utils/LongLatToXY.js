export function LongLatToXY (data) {
 
    let x = data.longitude ;
    let y = data.latitude; 

    x-=45.37 ;
    y+=18.22 ;

    x*= (54.0/4.22) ; 
    y*= (44.0/4.36) ; 
    
    let cosT = Math.cos(21*Math.PI/180) ; 
    let sinT = Math.sin(21*Math.PI/180) ; 

    let rX = x*cosT-y*sinT ; 
    let rY = -( y*cosT+x*sinT ) ; 

    return [rX, 6, rY] ; 
   
}
