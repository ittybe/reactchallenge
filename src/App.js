import './App.css';
import AlphabetPicker from './AlphabetPicker';
import { useState } from 'react';
function App() {
  const [employees, setEmployees] = useState([])
  

  const searchForEmployees = (query) => {
    console.log(`search query: ${query}`)
  }

  return (
    <div className="App">
      <AlphabetPicker searchForEmployees={searchForEmployees}></AlphabetPicker>
    </div>
  );
}

export default App;
