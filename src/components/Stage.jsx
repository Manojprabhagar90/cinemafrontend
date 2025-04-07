import { useState } from 'react';

// interfaces (converted from TypeScript to JSDoc for reference)
/**
 * @typedef {Object} IProps
 * @property {string} [text]
 * @property {boolean} [preview]
 * @property {(name: string) => void} [editStageName]
 */

/**
 * @typedef {Object} IFormProps
 * @property {string} name
 */

const Stage = ({ text, preview, editStageName }) => {
  preview=true;
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: text || '',
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

    editStageName?.(name);

    setEditMode(false);
  };

  return (
    <>
    <div className='flex flex-col mt-8 flex-v-center'>
    <div className='flex flex-gap-medium flex-v-center flex-h-center w-56 mx-auto stage'>
      
    </div>
    <div className='text-xs'>All eyes this way please!</div>
    </div>
    </>
  );
};

export default Stage;
