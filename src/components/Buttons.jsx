import React from 'react';
import { useNavigate } from 'react-router-dom';

// interfaces
// Note: The TypeScript interface IProps is not used in JavaScript.
const Buttons = ({ totals, save, reset, toggle }) => {
  const navigate = useNavigate();
  return(
  <div className='flex flex-space-between flex-v-center buttons'>
    <div className='totals'>
      Total seats: <strong>{totals}</strong>
    </div>
    <div className='flex flex-gap-medium'>
      <button type='button' className='button gray' onClick={() => toggle()}>
        Preview
      </button>
      <button type='button' className='button gray' onClick={() => reset()}>
        Reset
      </button>
      <button type='button' className='button gray' onClick={() => save()}>
        Save seat map
      </button>
      <button type='button' className='button gray' onClick={() => navigate('/screen/viewScreenlist')}>
        Back
      </button>
    </div>
  </div>
  )
};

export default Buttons;
