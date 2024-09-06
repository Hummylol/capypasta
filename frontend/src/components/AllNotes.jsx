import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Lenis from 'lenis';


const AllNotes = () => {
  const { subject } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedNoteId, setExpandedNoteId] = useState(null); 
  const navigate = useNavigate();
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`https://test-ex2u.onrender.com/api/allnotes?subject=${subject}`);
        const data = await response.json();

        if (response.ok) {
          setNotes(data);
        } else {
          setError(data.message || 'Failed to fetch notes');
        }
      } catch (error) {
        setError('An error occurred while fetching notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subject]);

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`https://test-ex2u.onrender.com/api/allnotes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
        toast.success('Note deleted successfully!');
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to delete note');
      }
    } catch (error) {
      setError('An error occurred while deleting the note.');
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success('Note copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy note: ', err);
      });
  };

  const toggleContent = (noteId) => {
    setExpandedNoteId(expandedNoteId === noteId ? null : noteId);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    return `${hours}:${minutes}, ${day}/${month}`;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Toaster />
      <div className="nav-space">
        <button className="all-notes" onClick={() => navigate('/')}>ADD NOTE</button>
      </div>
      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-block">
              <h2 className="note-title">{note.title}</h2>
              <pre className={`note-content ${expandedNoteId === note._id ? 'expanded' : 'truncated'}`}>
                {note.content}
                <button
                  className={`toggle-content ${expandedNoteId === note._id ? 'toggle-content-see-less' : 'toggle-content-see-more'}`}
                  onClick={() => toggleContent(note._id)}
                >
                  {expandedNoteId === note._id ? 'Show Less' : 'See More'}
                </button>
              </pre>
              <button className="delete" onClick={() => handleDelete(note._id)}>Delete</button>
              <button className="copy" onClick={() => handleCopy(note.content)}>Copy</button>
              <div className="note-timestamp">
                {formatDateTime(note.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </>
  );
};

export default AllNotes;
