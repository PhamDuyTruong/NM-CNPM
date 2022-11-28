import React, {useContext} from 'react';
import "./styles.scss";
import {useDispatch} from 'react-redux';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {PrevFilterContext} from '../../../context/PrevFilterContext';
import {getProductAll} from '../../../actions/ProductAllAction';
import Checkbox from '../../../Components/Checkbox'

const typeOptions = [
    {
        name: 'Men',
        type: 'men',
      },
      {
        name: 'Women',
        type: 'women',
      },
      {
        name: 'Children',
        type: 'children',
      },
      {
        name: 'Fiction',
        type: 'Fiction,Historical',
      },
      {
        name: 'Mystery',
        type: 'Mystery,Crime,Thriller',
      },
      {
        name: 'Novel',
        type: 'Novel',
      },
      {
        name: 'Personal Development',
        type: 'Science,Pesonal Development',
      },
];

const priceOptions = [
    { content: 'Under $100', price: 99, option: "lt" },
    { content: 'Above $50', price: 51, option: "gte" },
    { content: 'Under $50', price: 50, option: "lt"},
    { content: 'Above $100', price: 100, option: "gte"},
];



function ShopFilter() {
    const {handlePrevious} = useContext(PrevFilterContext);
    const dispatch = useDispatch();
    const {selectedRadio, nameActive} = handlePrevious();
    let curName = "", curPrice = "", curRate ="", curOp = "";
    const onFilterByName =(params) => {
        const {prevName, setPrevName, setSelectedRadio, setNameActive} = handlePrevious('name', params);
        if(params !== prevName){
            dispatch(getProductAll(params));
            setSelectedRadio(null);
        }
        setNameActive(params);
        setPrevName(params);
    };

    const handleOptionChange = (e) =>{
        const {setSelectedRadio} = handlePrevious();
        setSelectedRadio(e.target.value);
      };

    const onFilterByPrice = (params, option) => {
        const {prevPrice, setPrevPrice} = handlePrevious('price', params);
        if(prevPrice !== params){
            dispatch(getProductAll(curName, params, curRate, option))
        }
        setPrevPrice(params);
    };

    const onFilterByRate = (params) => {
        const {prevRate, setPrevRate} = handlePrevious('rate', params);
        if(prevRate !== params){
            dispatch(getProductAll(curName, curPrice, params, curOp));
        }
        setPrevRate(params)
    }

  return (
    <div className='shop-filters'>
    <h2 className='shop-filters__title'>Popular</h2>
    <ul className='shop-filters__list'>
     {typeOptions.map(({ name, type }) => (
      <li
        key={name}
        onClick={() => onFilterByName(type)}
        className={
          type === nameActive
            ? 'shop-filters__item active'
            : 'shop-filters__item'
        }>
        <span className='shop-filters__item-name'>{name}</span>
      </li>
     ))}
   </ul>

   <h2 className='shop-filters__title'>Price</h2>
   <form className='shop-filters__form'>
    {priceOptions.map(({ content, price, option }) => (
      <Checkbox
        key={content}
        handleOptionClick={() => onFilterByPrice(price, option)}
        checked={selectedRadio === content}
        handleOptionChange={handleOptionChange}
        value={content}
        content={content}
      />
    ))}
  </form>

  <h2 className='shop-filters__title'>Rate</h2>
  <div
    onClick={() => onFilterByRate(5)}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <span>& up</span>
  </div>
  <div
    onClick={() => onFilterByRate(4)}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
  <div
   onClick={() => onFilterByRate(3)}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
  <div
   onClick={() => onFilterByRate(2)}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
  <div
   onClick={() => onFilterByRate(1)}
    className='shop-filters__stars'>
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
  <div
   onClick={() => onFilterByRate("0")}
    className='shop-filters__stars'>
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
</div>
  )
}

export default ShopFilter