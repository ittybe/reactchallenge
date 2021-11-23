import './App.css';

import AlphabetPicker from './AlphabetPicker';
import EmployeeComponent from './EmployeeComponent';
import LetterSection from "./LetterSection";

import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";

import { useRef, useState } from 'react';

import getAllEmployees from "./data";

import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([])
  const [activeEmployees, setActiveEmployees] = useState({})
  
  async function initEmployees() {
    const allEmployees = await getAllEmployees();
    setEmployees(allEmployees);
  }
  initEmployees();
  
  const pickerElWrapper = useRef(null);

  const searchForEmployees = (query) => {
    console.log(`search query: ${query}`)
    pickerElWrapper.current.className = addClassToString(pickerElWrapper.current.className, "hidden");

    let q = query.split("");
  }

  return (
    <div className="App">
      <div ref={pickerElWrapper}>
        <AlphabetPicker searchForEmployees={searchForEmployees}></AlphabetPicker>
      </div>
      <div>
        <LetterSection letter={"a"} employees={employees} activeEmployees={activeEmployees}/>
      </div>
    </div>
  );
}

export default App;
