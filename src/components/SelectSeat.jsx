import React from 'react';


const SelectSeat = ({ seat, selected, onSelect,occupied }) => {
  const isSeat = seat.type === 'seat';

  const title = isSeat ? `${seat.row} ${seat.label}` : '';
  let classNames = ''
  if(occupied){
    
       classNames = `${seat.type}  occupied`;
  }else{
    classNames = `${seat.type} ${selected && isSeat ? 'active' : 'passive'}`;
  }

  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      onSelect();
    }
  };

  return isSeat ? (
    <div
      tabIndex={0}
      role='button'
      title={title}
      onClick={onSelect}
      className={classNames}
      onKeyDown={handleKeyDown}
    >
      {seat.label}
    </div>
  ) : (
    <div className={`preview space`} />
  );
};

export default SelectSeat;
