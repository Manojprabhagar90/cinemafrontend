import React from 'react';

const Legend = () => (
  
  <div  onContextMenu={(e) => e.preventDefault()} className="flex flex-gap-large flex-v-center   text-green-400 p-4">
  <div className='flex flex-gap-small flex-v-center'>
      <div className='seat' /> Available
    </div>
    <div className='flex flex-gap-small flex-v-center'>
      <div className='seat active' /> Selected
    </div>
    <div className='flex flex-gap-small flex-v-center'>
      <div className='seat occupied' /> N/A
    </div>
</div>
);

export default Legend;
