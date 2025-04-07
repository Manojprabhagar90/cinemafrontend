import { useRef, useState } from 'react';

// hooks
import useClickOutside from '../hooks/useClickOutside';

// types
// The TypeScript type imports are removed in JavaScript since JavaScript does not have static types.

// interfaces
// The interfaces IProps and IFormProps have been removed since JavaScript doesn't use interfaces.

const Seat = ({ seat, rowIndex, addSpace, editSeatName, deleteSeat }) => {
  const ref = useRef(null);

  const [formOpened, setFormOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [formValues, setFormValues] = useState({
    id: seat.id,
    name: seat.label,
  });

  /**
   * Resets the state of the Seat component back to its initial state.
   */
  const resetAll = () => {
    setMenuOpened(false);
    setFormOpened(false);
  };

  useClickOutside(ref, () => setMenuOpened(false));

  /**
   * Handles the click event on the seat by calling addSpace function if it exists
   * and toggling the menuOpened state.
   *
   * @param {string} direction - The direction of the space to be added.
   */
  const handleOnClick = (direction) => {
    addSpace && addSpace(seat.row, seat.id, 'space', direction);

    setMenuOpened((prev) => !prev);
  };

  /**
   * Handles the delete event on the seat by calling deleteSeat function if it exists.
   */
  const handleOnDelete = () => {
    deleteSeat && deleteSeat(seat.row, seat.id);

    setMenuOpened((prev) => !prev);
  };

  /**
   * Handles the submit event on the edit seat label form.
   *
   * @param {Event} e - The event object from the form submission.
   */
  const handleEditSeatLabel = (e) => {
    e.preventDefault();

    const { name } = formValues;

    if (!name || name.trim() === '' || seat.label === name) return;

    editSeatName && editSeatName(seat.row, seat.id, formValues.name);

    resetAll();
  };

  /**
   * Handles a key press event to close open dropdown.
   *
   * @param {Event} e - The event object from the key press.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      resetAll();
    }
  };

  /**
   * Handles the right-click event on the seat to toggle the menuOpened state.
   *
   * @param {Event} event - The event object from the right-click action.
   */
  const handleRightClick = (event) => {
    event.preventDefault();

    setMenuOpened((prev) => !prev);
  };

  const renderDropdown = () => (
    <div
      className={
        rowIndex > 4
          ? 'flex flex-gap flex-column dropdown top-left'
          : 'flex flex-gap flex-column dropdown bottom-left'
      }
    >
      {seat.type === 'seat' && (
        <>
          <button type="button" onClick={() => setFormOpened((prev) => !prev)}>
            <span className="material-symbols-outlined">draw</span>
            Edit seat label
          </button>
          {formOpened && (
            <form
              onSubmit={handleEditSeatLabel}
              className="flex flex-gap-medium flex-column flex-v-center dropdown-form"
            >
              <input
                type="text"
                id="seatName"
                maxLength={3}
                name="seatName"
                autoComplete="off"
                value={formValues.name}
                onKeyDown={handleKeyDown}
                placeholder="Enter seat label"
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
              <button type="submit">Update</button>
            </form>
          )}
        </>
      )}
      <button type="button" onClick={() => handleOnClick('left')}>
        <span className="material-symbols-outlined">arrow_back</span>
        Add space to the left
      </button>
      <button type="button" onClick={() => handleOnDelete()}>
        <span className="material-symbols-outlined">delete</span>
        Delete selected {seat.type === 'space' ? 'space' : 'seat'}
      </button>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => {}}
        onContextMenu={handleRightClick}
        onClick={() => setMenuOpened((prev) => !prev)}
        title={seat.type === 'seat' ? `${seat.row} ${seat.label}` : ''}
        className={`${seat.type} ${menuOpened ? 'active' : 'passive'}`}
      >
        {seat.type === 'seat' && seat.label}
      </div>
      {menuOpened && renderDropdown()}
    </div>
  );
};

export default Seat;
