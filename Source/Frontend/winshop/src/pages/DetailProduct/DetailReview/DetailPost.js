import React, {useState} from 'react';
import "./DetailPost.scss"
import { Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

function DetailPost({colors}) {
  const [areaValue, setAreaValue] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  

  const handleSelectedStar = (pos) => {
    setSelectedStar(pos);
  };

  const handleHoveredStar = (pos) => {
    setHoveredStar(pos);
  };




  return (
    <>
    <div className='detail-tab-user'>
        <Avatar
          className='detail-tab-user__avatar'
          alt='Avatar'
        />

        <form className='detail-tab-user__form'>
          <div className='detail-tab-user__row'>
            <div className='detail-tab-user__rate'>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <StarIcon
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