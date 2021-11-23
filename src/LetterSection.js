import { useState } from "react";
import EmployeeComponent from "./EmployeeComponent";

export function LetterSection(props) {
    // props
    // employees
    // letter
    // activeEmployees
    const getEmployeesToDisplay = () => {
        let employees = props.employees.map((employee, i) => {
            const isActive =  employee.id in props.activeEmployees ? true : false;
            return (<EmployeeComponent 
                key={employee.id} 
                id={employee.id} 
                firstName={employee.firstName} 
                lastName={employee.lastName} 
                isActive={isActive} 
                handleIsActiveChange={props.handleIsActiveChange}/>)
        })
        return employees.length > 0 ? employees : "No Employees"
    }
    return (
        <div>
            <div>{props.letter}</div>
            <div>
                {
                    getEmployeesToDisplay()
                }
            </div>
        </div>
    ) 
}

export default LetterSection;