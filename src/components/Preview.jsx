import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { MapInteractionCSS } from 'react-map-interaction';

// hooks
import useWindowDimensions from '../hooks/useWindowDimensions';

// components
import Row from './Row';
import Stage from './Stage';
import Legend from './Legend';
import SelectSeat from './SelectSeat';

// types
// ISeat type import removed since JavaScript does not use TypeScript types

// interfaces
// IProps interface removed as JavaScript does not support interfaces

// variables
const defaultValues = {
  scale: 1,
  translation: { x: 20, y: 20 },
};

const Preview = ({ text, seatData, togglePreview }) => {
  const { width, height } = useWindowDimensions();

  const [props, setProps] = useState(defaultValues);
  const [selectedSeats, setSelectedSeats] = useState([]);

  /**
   * Handles the selection of a seat by logging the seat data to the console.
   * Intended to be replaced with a callback function that performs the actual
   * logic for selecting a seat.
   *
   * @param {Object} seat - The seat object to be selected.
   */
  const handleSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s.id !== seat.id) : [...prev, seat]
    );
  };

  const rows = Array.from(seatData?.entries());

  return (
    <>
      <div className='close-button' onContextMenu={(e) => e.preventDefault()}>
        <button
          type='button'
          onClick={() => togglePreview()}
          className='button circle flex flex-v-center flex-h-center'
        >
          <span className='material-symbols-outlined'>close</span>
        </button>
        <button
          type='button'
          onClick={() => setProps(defaultValues)}
          className='button circle flex flex-v-center flex-h-center'
        >
          <span className='material-symbols-outlined'>my_location</span>
        </button>
      </div>
      <div className='w-1/3 mt-10 mx-auto bg-white'><Legend /></div>
      <div className='w-3/5 mx-auto py-12 px-8' onContextMenu={(e) => e.preventDefault()}>
        
          

          {rows?.map(([row, seatsInRow], index) => (
            <Row
              preview
              row={row}
              key={row}
              rowIndex={index}
              dragHandleProps={null}
              empty={row.startsWith('empty-')}
            >
              {seatsInRow.map((seat) => (
                <SelectSeat
                  seat={seat}
                  key={seat.id}
                  onSelect={() => handleSelect(seat)}
                  selected={selectedSeats.includes(seat)}
                />
              ))}
            </Row>
          ))}
     
      </div>

      <Stage preview text={text} />
      <Tooltip id='description' />
    </>
  );
};

export default Preview;
