import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ authors, selectedAuthor, setAuthors, setIsEditing }) => {
  const id = selectedAuthor.id;

  const [name, setName] = useState(selectedAuthor.name);
  const [address, setAddress] = useState(selectedAuthor.address);
  const [contact, setContact] = useState(selectedAuthor.contact);


  const handleUpdate = e => {
    e.preventDefault();

    if (!name || !address || !contact ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const author = {
      id,
      name,
      address,
      contact,
    };

    for (let i = 0; i < authors.length; i++) {
      if (authors[i].id === id) {
        authors.splice(i, 1, author);
        break;
      }
    }

    localStorage.setItem('authors_data', JSON.stringify(authors));
    setAuthors(authors);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${author.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Author</h1>
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
        <label htmlFor="contact">Contact($)</label>
        <input
          id="contact"
          type="number"
          name="contact"
          value={contact}
          onChange={e => setContact(e.target.value)}
        />
    
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
