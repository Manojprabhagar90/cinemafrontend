import { useState } from 'react';

// interfaces
const Header = ({ seatMap, editMapName }) => {
  const [formValues, setFormValues] = useState({
    name: seatMap?.name || '',
  });

  /**
   * Handles the form submission event by preventing the default action.
   *
   * @param {Event} e - The event object from the form submission.
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { name } = formValues;

    if (!name || name.trim() === '') return;

    editMapName?.(name);
  };

  return (
    <header className='mx-16 flex flex-space-between flex-v-center'>
      <form noValidate className='flex flex-gap-medium' onSubmit={handleOnSubmit}>
        <input
          id='name'
          type='text'
          name='mapName'
          autoComplete='off'
          value={formValues.name}
          placeholder='Enter seat map name'
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />
        <button type='submit' className='button black'>
          Save
        </button>
      </form>
      
    </header>
  );
};

export default Header;