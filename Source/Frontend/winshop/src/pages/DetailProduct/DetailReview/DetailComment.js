import React from 'react';
import "./DetailComment.scss"
// material ui core
import { Avatar } from "@material-ui/core";

// material ui icons
import StarIcon from "@material-ui/icons/Star";
import DetailPost from './DetailPost';

const colors = {
  yellow: "#fbb403",
  blur: "#FDDA81"
};

function DetailComment() {
  return (
    <div className="detail-tab__comment">
        <div className='detail-tab-comment__container'>

        </div>
        <DetailPost colors={colors}/>
    </div>
  )
}

export default DetailComment