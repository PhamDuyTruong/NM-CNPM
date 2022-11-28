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
    { content: 'Under $100', price: 100, option: "lte" },
    { content: 'Above $50', price: 50, option: "gte" },
    { content: 'Under $50', price: 50, option: "lte"},
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

    const onFilterByPrice = (params) => {

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
        //handleOptionClick={() => onFilterByPrice(range)}
        checked={selectedRadio === content}
        //handleOptionChange={handleOptionChange}
        value={content}
        content={content}
      />
    ))}
  </form>

  <h2 className='shop-filters__title'>Rate</h2>
  <div
    //onClick={() => onFilterByRate({ rate_like: 5 })}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <span>& up</span>
  </div>
  <div
    // onClick={() => onFilterByRate({ rate_like: 4 })}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
  <div
   // onClick={() => onFilterByRate({ rate_like: 3 })}
    className='shop-filters__stars'>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <span>& up</span>
  </div>
</div>
  )
}

export default ShopFilter