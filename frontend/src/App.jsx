import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeEditor from './components/CodeEditor';
import AllNotes from './components/AllNotes';
import Section from './components/Section';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/all-notes" element={<Section />} />
        <Route path="/all-notes/:subject" element={<AllNotes />} />
      </Routes>
    </Router>
  );
};

export default App;
