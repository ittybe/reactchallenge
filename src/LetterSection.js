import { useState } from "react";
import EmployeeComponent from "./EmployeeComponent";

export function LetterSection(props) {
    // props
    // employees
    // letter
    // activeEmployees
        
    return (
        <div>
            <div>{props.letter}</div>
            <div>
                {
                    props.employees.map((employee, i) => {
                        const isActive =  employee.id in props.activeEmployees ? props.activeEmployees[employee.id] : null;
                        return (<EmployeeComponent 
                            id={employee.id} 
                            firstName={employee.firstName} 
                            lastName={employee.lastName} 
                            isActive={isActive}/>)
                    })
                }
            </div>
        </div>
    ) 
}

export default LetterSection;