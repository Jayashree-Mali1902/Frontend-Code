import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ authors, setAuthors, setIsAdding }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!name|| !address|| !contact) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = authors.length + 1;
    const newAuthor = {
      id,
      name,
      address,
      contact,
     
    };

    authors.push(newAuthor);
    localStorage.setItem('authors_data', JSON.stringify(authors));
    setAuthors(authors);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name} data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Author</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        
        
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <label htmlFor="contact">Contact</label>
        <input
          id="contact"
          type="string"
          name="contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
      
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;



