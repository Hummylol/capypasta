import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const CodeEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('MAD'); // Add state for subject
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value); // Update state when subject changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://test-ex2u.onrender.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, subject }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Note has been created');
        setTitle('');
        setContent('');
        setSubject('MAD'); // Reset subject
      } else {
        toast.error('Error adding note: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <>
      <div className="code-editor-cont">
        <button className="all-notes" onClick={() => navigate('/all-notes')}>ALL NOTES</button>
        <div className="code-editor">
          <form onSubmit={handleSubmit} className="editor-form">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title..."
              className="title-input"
            />
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Paste your code here..."
              className="code-input"
            />
            <select value={subject} onChange={handleSubjectChange}>
              <option value="MAD">MAD</option>
              <option value="IP">IP</option>
              {/* Add more options as needed */}
            </select>
            <button type="submit" className="submit-button">Add Note</button>
          </form>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
