import React, {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';
import DetailContent from './DetailContent'
import "./styles.scss";


const dataFake = [
    {
        content: 'Buy 2 get 15 percent off',
        percentOff: 15,
    },
    {
        content: 'Buy 3 get 25 percent off',
        percentOff: 25,
    },
    {
        content: 'Buy 5 get 40 percent off',
        percentOff: 40,
    }
];


function DetailMain({product}) {
    const {price} = product || 0;
    const [fixedPrice, setFixedPrice] = useState(price);
    const [prevId, setPrevId] = useState('');
    const [qnt, setQnt] = useState(1);
    const [selectedRadio, setSelectedRadio] = useState('');
    const {id} = useParams();

    const handleFuncs = {
        handleOptionChange: (e, percentOff) => {
          switch (percentOff) {
            case 15:
              setQnt(2);
              break;
            case 25:
              setQnt(3);
              break;
            case 40:
              setQnt(5);
              break;
            default:
              return price;
          }
    
          setSelectedRadio(e.target.value);
        },
        handleDecreaseQnt: () => {
          qnt > 1 && setQnt(qnt - 1);
        },
        handleIncreaseQnt: () => {
          setQnt(qnt + 1);
        },
      };

      useLayoutEffect(() =>{
            if(id !== prevId){
                setQnt(1);
                setFixedPrice(price || 0 *qnt);
                setSelectedRadio(null);
            }else if(qnt >= 5){
                setFixedPrice((price * qnt - price * 5 * 0.6).toFixed(2));
                setSelectedRadio('Buy 5 get 50 percent off');
            }else if(qnt === 3){
                setFixedPrice((price * 3 * 0.75).toFixed(2));
                setSelectedRadio('Buy 3 get 25 percent off');
            }else if(qnt === 2){
                setFixedPrice((price * 2 * 0.85).toFixed(2));
                setSelectedRadio('Buy 2 get 15 percent off');
            }else {
                setFixedPrice(((price || 0) * 1).toFixed(2));
                setSelectedRadio(null);
            };

            setPrevId(id);
      }, [price, prevId, qnt, id]);

  return (
    <DetailContent 
        dataOptions={dataFake}
        handleFuncs={handleFuncs}
        selectedRadio={selectedRadio}
        product={product}
        price={fixedPrice || price}
        qnt={qnt}
    />
  )
}

export default DetailMain