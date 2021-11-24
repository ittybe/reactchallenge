import "./DobMonth.css";

export function DobMonth(props) {
    // props
    // monthName
    // employees array
    const getEmployeesToDisplay = () => {
        let employees = props.employees.map((employee, i) => {
            return <li className="month__employee" key={employee.id}>{employee.firstName} {employee.lastName} - {employee.dob}</li>
        })

        return employees.length > 0 ? employees : <li className="month__employee">No employees</li> ;
    }
    return (
        <div className="month">
            <div className="month__heading">{props.monthName}</div>
            <div>
                <ul className="month__employees-list">
                {
                    getEmployeesToDisplay()
                }
                </ul>
                
            </div>
        </div>
    )
}

export default DobMonth;