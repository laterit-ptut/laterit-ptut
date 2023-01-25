#include <iostream>
#include <cstring>
#include <cmath>

int main()
{
    float y = -25.58 ;
    float x = 45.17 ; 

    y+=17.32 ; 
    x-=45.37 ; 

std::cout << x << " | " << y << std::endl ; 
    y*= (44.0/4.36) ; 
    x*= (54.0/4.22) ; 
std::cout << x << " | " << y << std::endl ; 
    float cosT = cos(21*M_PI/180) ; 
    float sinT = sin(21*M_PI/180) ; 
std::cout << cosT << " | " << sinT << std::endl ; 
    float rX = x*cosT-y*sinT ; 
    float rY = -( y*cosT+x*sinT ) ; 

    std::cout << rX << " | " << rY << std::endl ; 

}