import React from 'react';
import './SelectionWindow.css'

const SelectionWindow = ({children}) => {
  return (
    <div className='container'>
        <div className='top-bar'>
            <div className='dot'>X</div>
            <div className='dot'>+</div>
            <div className='dot'>-</div>
        </div>
        <div className='box'>
            {children}
        </div>
    </div>
  );
}

export default SelectionWindow;