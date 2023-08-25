import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findContact } from 'redux/reducer';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  const handleChange = event => {
    dispatch(findContact(event.target.value.toLowerCase().trim()));
  };

  return (
    <div>
      {' '}
      <p>Find contacts by name</p>
      <input type="text" name="name" value={filter} onChange={handleChange} />
    </div>
  );
}

export default Filter;
