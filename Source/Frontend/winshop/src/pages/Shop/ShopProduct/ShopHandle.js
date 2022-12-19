import React, {useEffect, useContext, useState, useRef} from 'react';
import "./ShopHandle.scss";
import {useDispatch, useSelector} from 'react-redux';
import {PrevFilterContext} from '../../../context/PrevFilterContext';
import {filterProductBySort, searchProduct} from '../../../actions/ProductAllAction';
import {Link} from 'react-router-dom';
import {Divider} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
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
    const [isDrop, setIsDrop] = useState(false);
    const [keyWord, setKeyWord] = useState('');
    const [show, setShow] = useState(false);
    const ref = useRef();
    const {searchProducts} = useSelector((state) => state.getProductList)
    const dispatch = useDispatch();
    const {handlePrevious} = useContext(PrevFilterContext);
    const { selectedDrop, setSelectedDrop } = handlePrevious();

    useEffect(() => {
        dispatch(searchProduct(keyWord))
    }, [searchProduct, keyWord]);

    const {darkTheme} = useSelector((state) => state.sidebar);
  const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
  let isTheme = darkTheme;
  if(!darkTheme){
      isTheme = ThemeInLocal
  }


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

    const handleKeyWord = (key) =>{
      setKeyWord(key)
      setShow(true)
   }


  return (
    <>
    <div className='shop-handle'>
        <form className="shop-handle__search">
             <input 
                value={keyWord}
                onChange={(e) => handleKeyWord(e.target.value)}
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
                  style={{listStyleType: "none", color: `${isTheme ? "#000": ""}`}}
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
  {show && keyWord && searchProducts && searchProducts.length > 0 ? (
        <List className='shop-handle__searchResult'>
          {searchProducts.map((product) => (
            <Link
              key={product._id}
              to={""}
              className="shop-handle__searchLink"
              onClick={() => setShow(false)}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <img src={product.image} alt={product.name} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={product.name} />
              </ListItem>
              <Divider />
            </Link>
          ))}
        </List>
      ) : null}
  </>
  )
}

export default ShopHandle