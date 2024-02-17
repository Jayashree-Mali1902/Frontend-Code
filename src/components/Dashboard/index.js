import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { authorsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [authors, setAuthors] = useState(authorsData);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('authors_data'));
    if (data !== null && Object.keys(data).length !== 0) setAuthors(data);
  }, []);

  const handleEdit = id => {
    const [author] = authors.filter(author => author.id === id);

    setSelectedAuthor(author);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [author] = authors.filter(author => author.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${author.name}  data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const authorsCopy = authors.filter(author => author.id !== id);
        localStorage.setItem('authors_data', JSON.stringify(authorsCopy));
        setAuthors(authorsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            authors={authors}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          authors={authors}
          setAuthors={setAuthors}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          authors={authors}
          selectedAuthor={selectedAuthor}
          setAuthors={setAuthors}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
