import { useEffect, useState } from "react"
import { calcluateDimesions } from "../helper/common"



const useDimensions=()=>{
        
    const [dimension,setDimension]=useState(()=>calcluateDimesions());

    useEffect(()=>{
      const adjsutDimension=()=> setDimension(calcluateDimesions())  
      window.addEventListener('resize',adjsutDimension);
      return ()=> window.removeEventListener('resize',adjsutDimension)
    },[])

    return dimension;
}

export default useDimensions