import React, {useState, useEffect} from 'react';
import "./DetailPost.scss";
import {useParams} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {createReviewProduct} from '../../../actions/ReviewAction'
import { Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

function DetailPost({colors}) {
  const [areaValue, setAreaValue] = useState("");
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const {id} = useParams();
  const dispatch = useDispatch();


  const handleSelectedStar = (pos) => {
    setSelectedStar(pos);
  };

  const handleHoveredStar = (pos) => {
    setHoveredStar(pos);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!areaValue.trim()) return;
    if(areaValue === "") return;
    const obj = {
      rating: selectedStar,
      comment: areaValue
    };
    
    dispatch(createReviewProduct(obj, id));
    setAreaValue('');
    setSelectedStar(0);

    // window.scrollTo({
    //   top: commentRef.current.offsetTop - 200,
    //   behavior: 'smooth',
    // });
  }



  return (
    <>
    <div className='detail-tab-user'>
        <Avatar
          className='detail-tab-user__avatar'
          alt='Avatar'
        />

        <form onSubmit={handleSubmit} className='detail-tab-user__form'>
          <div className='detail-tab-user__row'>
            <div className='detail-tab-user__rate'>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    onClick={() => handleSelectedStar(index + 1)}
                    onMouseOver={() => handleHoveredStar(index + 1)}
                    onMouseLeave={() => handleHoveredStar(0)}
                    style={{
                      fill:
                        index < (selectedStar || hoveredStar)
                          ? colors.yellow
                          : colors.blur,
                    }}
                  />
                ))}
            </div>
            <span className='detail-tab-user__msg'>(Please choose an one)</span>
          </div>
          <textarea
            className='detail-tab-user__textarea'
            placeholder='Type your comment here...'
            onChange={(e) => setAreaValue(e.target.value)}
            value={areaValue}
          />
          <button type='submit' className='primary-btn red'>
              Post comment
          </button>
        </form>
      </div>
    </>
  )
}

export default DetailPost