import React from 'react';

const Table = ({ authors, handleEdit, handleDelete }) => {
  authors.forEach((author, i) => {
    author.id = i + 1;
  });


  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th> Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author, i) => (
              <tr key={author.id}>
                <td>{i + 1}</td>
                <td>{author.name}</td>
                <td>{author.address}</td>
                <td>{author.contact} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(author.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(author.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Authors</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
