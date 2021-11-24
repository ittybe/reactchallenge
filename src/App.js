import './App.css';

import AlphabetPicker from './AlphabetPicker';
import EmployeeComponent from './EmployeeComponent';
import LetterSection from "./LetterSection";
import DobMonth from "./DobMonth";

import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";

import react, { useRef, useState, createRef, useEffect } from 'react';

import getAllEmployees from "./data";

import axios from 'axios';

export class App extends react.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      activeEmployees: [],
      searchQuery: [],
      birthdates: []
    }
    this.pickerElWrapper = createRef();
    this.sessionStorageKey = "allData";
    // methods bindings
    this.searchForEmployees = this.searchForEmployees.bind(this);
    this.getEmployeesBirthdates = this.getEmployeesBirthdates.bind(this);
    this.displayEmployeeBirthdates = this.displayEmployeeBirthdates.bind(this);
    this.handleIsActiveChange = this.handleIsActiveChange.bind(this);
  }

  componentDidUpdate() {
    // save session storage after every update
    const sessionStorage = window.sessionStorage;

    // save 
    let jsonToSave = {
      activeEmployees: this.state.activeEmployees,
      searchQuery: this.state.searchQuery,
      birthdates: this.state.birthdates
    }
    console.log(`json to save ${jsonToSave}`)
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(jsonToSave))
  }

  componentDidMount() {
    getAllEmployees().then(allEmployees => {
      this.setState({ employees: allEmployees })
      console.log("employees parsed")
    })
    // session storage load 
    const sessionStorage = window.sessionStorage;
    if (sessionStorage.getItem(this.sessionStorageKey) !== null) {
      let data = sessionStorage.getItem(this.sessionStorageKey);
      console.log(`data after reload: ${data}`)
      data = JSON.parse(data);
      this.setState({
        activeEmployees: data.activeEmployees,
        searchQuery: data.searchQuery,
        birthdates: data.birthdates
      })
    }
  }

  searchForEmployees(query) {
    console.log(`search query: ${query}`)
    this.pickerElWrapper.current.className = addClassToString(this.pickerElWrapper.current.className, "hidden");
    this.setState({ searchQuery: query.split("") })
  }

  handleIsActiveChange(id, isActive) {
    let activeEmployeesLocal = [...this.state.activeEmployees];
    if (isActive) {
      activeEmployeesLocal.push(id)
    }
    else {
      let removeid = activeEmployeesLocal.indexOf(id)
      activeEmployeesLocal.splice(removeid, 1)
    }
    console.log(`active employees ${activeEmployeesLocal}`)
    this.setState({ activeEmployees: activeEmployeesLocal }, () => {
      console.log(this.state.searchQuery);
      this.displayEmployeeBirthdates();
    });
  }
  setActiveEmployees(employees) {
    this.setState({ activeEmployees: employees });
  }
  getEmployeesBirthdates() {
    // new Array(12).fill([]) do not create new instances of array, so if you add to one it will be added to all arrays
    const birthdates = [[], [], [], [], [], [], [], [], [], [], [], []]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const activeEmployees = this.state.activeEmployees;
    const employees = this.state.employees;
    for (let i = 0; i < activeEmployees.length; i++) {
      // get month of emp dob
      const empId = activeEmployees[i];
      const empArr = employees.filter((emp) => emp.id === empId);
      if (empArr.length > 0) {
        const employee = JSON.parse(JSON.stringify(empArr[0]));
        const date = new Date(employee.dob);
        const monthIndex = date.getMonth();
        // convert employee dob into string
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log(date.toLocaleDateString("en-US", options))
        employee.dob = date.toLocaleDateString("en-US", options)
        // add accordinly to the month array
        birthdates[monthIndex].push(employee);
      }
    }
    // sort all months
    for (let i = 0; i < birthdates.length; i++) {
      const month = birthdates[i];
      birthdates[i] = month.sort(function (a, b) {
        var textA = a.lastName.toUpperCase();
        var textB = b.lastName.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    console.log(`birthdates ${birthdates}`);

    // format data
    // get current month index
    let today = new Date();
    let todayMonthIndex = today.getMonth();

    // for loop with i that index
    let resultBirthdates = [];
    let index = birthdates.length;
    for (let i = todayMonthIndex; index > 0; index--) {
      const month = birthdates[i];
      resultBirthdates.push({
        "monthName": months[i],
        "employees": month
      })
      // increment i or set it to zero
      i + 1 < birthdates.length ? i++ : i = 0
    }
    return resultBirthdates;
  }

  displayEmployeeBirthdates() {
    this.setState({ birthdates: this.getEmployeesBirthdates() })
  }

  render() {
    const getEmployeesStartWithLetter = (letter) => {
      let employees = [...this.state.employees]
      employees = employees.filter(employee => {
        return employee.firstName.toLowerCase().startsWith(letter)
      }).sort(function (a, b) {
        var textA = a.firstName.toUpperCase();
        var textB = b.firstName.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
      return employees;
    }
    const getBirthdatesElement = () => {
      let birthdates = this.state.birthdates.map((month, i) => {
        return <DobMonth key={i} monthName={month.monthName} employees={month.employees} />
      })
      return this.state.activeEmployees.length > 0 ? birthdates : <div className="months-wrapper__no-employees">Employees List is empty</div>
    }
    return (
      <div className="app">
        <div className="alphabet-wrapper" ref={this.pickerElWrapper}>
          <AlphabetPicker searchForEmployees={this.searchForEmployees} pickedLetters={this.state.searchQuery.join("")}></AlphabetPicker>
        </div>
        <div className="app__data-wrapper">
          <div className="employees">
            <div className="employees__heading">
              Employees
            </div>
            <div className="info-wrapper info-wrapper--lettersection">
              {
                this.state.searchQuery.map((letter, i) => {
                  return <LetterSection
                    letter={letter.toUpperCase()}
                    key={i}
                    employees={getEmployeesStartWithLetter(letter)}
                    activeEmployees={this.state.activeEmployees}
                    handleIsActiveChange={this.handleIsActiveChange} />
                })
              }
            </div>
          </div>
          <div className="birthdates">
            <div className="birthdates__heading">
              Employees Birthday
            </div>
            <div className="info-wrapper">
              {
                getBirthdatesElement()
              }
            </div>

          </div>
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
