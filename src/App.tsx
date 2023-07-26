import React from 'react';
import './App.css';
import { Form } from './components/form/Form';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
