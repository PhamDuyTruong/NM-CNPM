import React, {useEffect, useState} from 'react';


const HandleImage = (src) => {
  const [source, setSource] = useState(null);
  useEffect(() =>{
    const img = new Image();
    img.src = src;
    img.onload = () => setSource(src);
    return () => {setSource(null)}
  }, [src])
  return source;
}

export default HandleImage