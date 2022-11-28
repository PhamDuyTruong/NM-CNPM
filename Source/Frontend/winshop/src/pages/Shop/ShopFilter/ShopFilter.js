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
        type: 'Fiction',
      },
      {
        name: 'Mystery',
        type: 'Mystery',
      },
      {
        name: 'Novel',
        type: 'Novel',
      },
      {
        name: 'Personal Development',
        type: 'Personal Development',
      },
];

const priceOptions = [
    { content: 'Under $100', range: { price_lte: 100 } },
    { content: '$50 to $100', range: { price_gte: 50, price_lte: 100 } },
    { content: 'Under $50', range: { price_lte: 50 } },
    { content: 'Above $100', range: { price_gte: 100 } },
];



function ShopFilter() {
    const {handlePrevious} = useContext(PrevFilterContext);
    const dispatch = useDispatch();
    const {selectedRadio, nameActive} = handlePrevious();

  return (
    <div className='shop-filters'>
    <h2 className='shop-filters__title'>Popular</h2>
    <ul className='shop-filters__list'>
     {typeOptions.map(({ img, name, type }) => (
      <li
        key={name}
        //onClick={() => onFilterByName(type)}
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
    {priceOptions.map(({ content, range }) => (
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