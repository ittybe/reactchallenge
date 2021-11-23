import './App.css';

import AlphabetPicker from './AlphabetPicker';
import EmployeeComponent from './EmployeeComponent';

import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";

import { useRef, useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([])

  const pickerElWrapper = useRef(null)
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
        <EmployeeComponent firstName="some" lastName="somela" id="theid" isActive={false}/>
      </div>
    </div>
  );
}

export default App;
