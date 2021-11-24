import { useState } from "react";
import EmployeeComponent from "./EmployeeComponent";
import "./LetterSection.css";

export function LetterSection(props) {
    // props
    // employees
    // letter
    // activeEmployees
    const getEmployeesToDisplay = () => {
        let employees = props.employees.map((employee, i) => {
            const isActive = props.activeEmployees.indexOf(employee.id) !== -1 ? true : false;
            return (<EmployeeComponent
                key={employee.id}
                id={employee.id}
                firstName={employee.firstName}
                lastName={employee.lastName}
                isActive={isActive}
                handleIsActiveChange={props.handleIsActiveChange} />)
        })
        return employees.length > 0 ? employees : <div className="lettersection__noemployees">No Employees</div>
    }
    return (
        <div className="lettersection">
            <div className="lettersection__heading">{props.letter}</div>
            <div className="lettersection__employees">
                {
                    getEmployeesToDisplay()
                }
            </div>
        </div>
    )
}

export default LetterSection;