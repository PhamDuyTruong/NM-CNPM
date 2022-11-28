import React from 'react';
import "./styles.scss"

function Checkbox(props) {
    const {content, checked, handleOptionChange, handleOptionClick} = props;
  return (
    <label className='checkbox' onClick={handleOptionClick} >
    <input 
       checked={checked}
       onChange={handleOptionChange}
       className="checkbox__input"
       type="radio"
       name="Radio"
       value={content}
    />
    <span className='checkmark'></span>
    {content}
</label>
  )
}

export default Checkbox