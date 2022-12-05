import React from 'react';
import "./DetailComment.scss"
// material ui core
import { Avatar } from "@material-ui/core";
import {useSelector} from 'react-redux';
// material ui icons
import StarIcon from "@material-ui/icons/Star";
import DetailPost from './DetailPost';

const colors = {
  yellow: "#fbb403",
  blur: "#FDDA81"
};

function DetailComment() {
  const { reviewData, isLoadingReview} = useSelector((state) => state.getReviewProduct);
  
  return (
    <div className="detail-tab__comment">
        <div  className='detail-tab-comment__container'>
        {reviewData.reviews && reviewData.reviews.map(({ name, comment, rating}, index) => (
          <div key={index} className="detail-tab-comment__customer">
            <Avatar
              className="detail-tab-comment__customer-avatar"
              alt="Avatar"
            />
            <div className="detail-tab-comment__wrapper">
              <div className="detail-tab-comment__row">
                <h4 className="detail-tab-comment__name">{name}</h4>
              </div>
              <div className="detail-tab-comment__stars">
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <StarIcon
                      key={index}
                      style={{
                        fill: index < rating ? colors.yellow : colors.blur,
                      }}
                    />
                  ))}
              </div>
              <p className="detail-tab-comment__content">{comment}</p>
            </div>
          </div>
        ))}
        </div>
        <DetailPost colors={colors}/>
    </div>
  )
}

export default DetailComment