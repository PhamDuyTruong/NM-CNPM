import React, {useEffect, useContext, useState, useRef} from 'react';
import "./ShopHandle.scss";
import {useDispatch, useSelector} from 'react-redux';
import {PrevFilterContext} from '../../../context/PrevFilterContext';
import {filterProductBySort, getProductView} from '../../../actions/ProductAllAction'
import SearchIcon from '@material-ui/icons/Search';
import ViewList from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const dataFake = [
    {
      value: 'Price: Low to High',
      sort: 'price_lth',
    },
    {
      value: 'Price: High to Low',
      sort: 'price_htl',
    },
    {
      value: 'Rate: Low to High',
      sort: 'rate_lth',
    },
    {
      value: 'Rate: High to Low',
      sort: 'rate_htl',
    },
];

function ShopHandle() {
    const [inputValue, setInputValue] = useState('');
    const [isDrop, setIsDrop] = useState(false);
  
    const ref = useRef();
  
    const dispatch = useDispatch();
    const {handlePrevious} = useContext(PrevFilterContext);
    const { selectedDrop, setSelectedDrop, setPrevSearch } = handlePrevious();

    // useEffect(() =>{
    //     const handleClickDrop = (e) =>{
    //             const el = ref.current;
                
    //       if (el && el.contains(e.target)) {
    //         setIsDrop(!isDrop);
    //       } else {
    //         setIsDrop(false);
    //       }
    //     };
    //     window.addEventListener("click", handleClickDrop);
    
    //     return window.removeEventListener('click', handleClickDrop);
    //   }, []);

      const handleClickDrop = (e) =>{
        const el = ref.current;
        
  if (el && el.contains(e.target)) {
    setIsDrop(!isDrop);
  } else {
    setIsDrop(false);
  }
};

    const onFilterBySort = (sort, value) => {
        handlePrevious('sort');
        const action = filterProductBySort(sort);
        dispatch(action);
        setSelectedDrop(value);
    }

  return (
    <div className='shop-handle'>
        <form className="shop-handle__search">
             <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search your products"
             />
             <button className='shop-handle__search-btn'>
                <SearchIcon />
             </button>
        </form>
        <div className='shop-hanlde__drop'>
            <div ref={ref} className="shop-handle__drop-current">
                <span>{selectedDrop}</span>
                <ExpandMoreIcon onClick={handleClickDrop}/>
            </div>
            <ul
                 className={
                    isDrop ? 'shop-handle__drop-list drop' : 'shop-handle__drop-list'
                  }
            >
                {dataFake.map((item, index) =>(
                    <li
                       key={index}
                       onClick = {() => onFilterBySort(item.sort, item.value)}
                       className='shop-handle__drop-item'
                    >
                      {item.value}
                    </li>
                ))}
            </ul>
        </div>
  </div>
  )
}

export default ShopHandle