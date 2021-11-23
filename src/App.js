import './App.css';

import AlphabetPicker from './AlphabetPicker';
import EmployeeComponent from './EmployeeComponent';
import LetterSection from "./LetterSection";

import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";

import react, { useRef, useState, createRef, useEffect } from 'react';

import getAllEmployees from "./data";

import axios from 'axios';

export class App extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees : [],
      activeEmployees: {},
      searchQuery: []
    }
    this.pickerElWrapper = createRef();

    // methods bindings
    this.searchForEmployees = this.searchForEmployees.bind(this);
  }
  componentDidMount() {
    getAllEmployees().then(allEmployees => {
      this.setState({employees: allEmployees})
      console.log("employees parsed")
    })
  }

  searchForEmployees(query) {
    console.log(`search query: ${query}`)
    this.pickerElWrapper.current.className = addClassToString(this.pickerElWrapper.current.className, "hidden");
    this.setState({searchQuery: query.split("")})
  }
  render() {
    const getEmployeesStartWithLetter = (letter) => {
      let employees = [...this.state.employees]
      employees = employees.filter(employee => {
        return employee.firstName.toLowerCase().startsWith(letter)
      }).sort((a, b) => {
        if(a.firstname < b.firstname) { return -1; }
        if(a.firstname > b.firstname) { return 1; }
        return 0;
      })
      console.log(`employees ${employees}`)
      return employees;
    }
    return (
      <div className="App">
        <div ref={this.pickerElWrapper}>
          <AlphabetPicker searchForEmployees={this.searchForEmployees}></AlphabetPicker>
        </div>
        <div>
          {
            this.state.searchQuery.map((letter, i) => {
              return <LetterSection key={i} letter={letter} employees={getEmployeesStartWithLetter(letter)} activeEmployees={this.state.activeEmployees}/>
            })
          }
        </div>
      </div>
    );
  }
}

// function App() {
//   const [employees, setEmployees] = useState([])
//   const [activeEmployees, setActiveEmployees] = useState({})
//   const [searchQuery, setSearchQuery] = useState([])

//   const pickerElWrapper = useRef(null);
//   useEffect(
//     () => {
//       getAllEmployees().then(allEmployees => {
//         setEmployees(allEmployees)
//         console.log("employees parsed")
//       })
//     }
//   )
  
//   const searchForEmployees = (query) => {
//     console.log(`search query: ${query}`)
//     pickerElWrapper.current.className = addClassToString(pickerElWrapper.current.className, "hidden");
//     setSearchQuery(query.split(""))
//   }

//   const getEmployeesStartWithLetter = (letter) => {
//     const tmp = [...employees].filter(employee => { employee.firstName.startsWith(letter) })
//     console.log(`letter ${letter} employees ${tmp}`)
//     return tmp;
//   }
//   getEmployeesStartWithLetter("a");
//   return (
//     <div className="App">
//       <div ref={pickerElWrapper}>
//         <AlphabetPicker searchForEmployees={searchForEmployees}></AlphabetPicker>
//       </div>
//       <div>
//         {/* {
//           searchQuery.map((letter, i) => {
//             return <LetterSection key={i} letter={letter} employees={getEmployeesStartWithLetter(letter)} activeEmployees={activeEmployees}/>
//           })
//         } */}
//       </div>
//     </div>
//   );
// }

export default App;
