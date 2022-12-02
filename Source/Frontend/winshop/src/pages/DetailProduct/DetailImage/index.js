import React, {useState, useEffect} from 'react';
import "./styles.scss";

function DetailImage(props) {
    const { product } = props;
    const { image } = product ? product : "";
    const [isAtDesktop, setIsAtDesktop] = useState(false);
    const handleResize = () => {
        if (window.innerWidth > 960) {
          setIsAtDesktop(true);
        } else {
          setIsAtDesktop(false);
        }
      };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return window.removeEventListener("resize", handleResize);
      }, []);

  return (
    <div  className="detail-img">
        <div className= "detail-img__main">
            <img className="detail-img__main-mobile" src={image} alt="Products" />
        </div>
    </div>
  )
}

export default DetailImage