import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function HomeImpactStory() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      const response = await fetch('/api/impact-stories', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('! Failed to add impact story');
      }

      setSuccessMessage('Impact story added successfully');
      setTitle('');
      setDescription('');
    } catch (error) {
      setError('! Failed to add impact story');
    }
  };

  return (
    <div class="container" style={{ maxwidth: "90%", margin: "auto", padding: "30px" }}>
      <h1 class="text-center display-4 fw-bolder">Share Impact Stories</h1>
      <div class="container border border-opacity-75 border-4 border-success bg-color mt-4" style={{ maxwidth: "90%", margin: "auto", padding: "30px",  backgroundColor: "rgba(224, 241, 215, 0.819) "}}>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label class="display-6 fw-medium me-5">Title:</label>
          <input type="text" id="title" class="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label class="display-6 fw-medium me-5">Description:</label>
          <textarea id="description" class="form-control" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-primary btn-lg mt-3">Add Impact Story</button>
      </form>
      {error && <p class="alert alert-danger mt-2">{error}</p>}
      {successMessage && <p class="alert alert-primary">{successMessage}</p>}
      </div>
    </div>
  );
}

export default HomeImpactStory;
