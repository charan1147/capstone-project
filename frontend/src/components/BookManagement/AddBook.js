import { useState } from 'react';
import axios from 'axios';
import "./AddBook.css"
function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    ISBN: '',
    genre: '',
    publicationYear: '',
    availabilityStatus: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:6001/api/books/add', formData, {
        headers: {
          'x-auth-token': token
        }
      });
      setSuccess('Book added successfully!');
      console.log('Book added successfully:', response.data);
    } catch (error) {
      console.error('Error adding book:', error.message);
      setError('Failed to add book. Please ensure all fields are filled out correctly.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add a New Book</h2>
      {error && <div className="alert">{error}</div>}
      {success && <div className="alert">{success}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Author
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter Author"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            ISBN
            <input
              type="text"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleChange}
              placeholder="Enter ISBN"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Genre
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter Genre"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Publication Year
            <input
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleChange}
              placeholder="Enter Publication Year"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Availability Status
            <input
              type="text"
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
              placeholder="Enter Availability Status"
              required
            />
          </label>
        </div>
        <button className="btn" type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
