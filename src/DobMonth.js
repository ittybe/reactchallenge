export function DobMonth(props) {
    // props
    // monthName
    // employees array
    const getEmployeesToDisplay = () => {
        let employees = props.employees.map((employee, i) => {
            return <li key={employee.id}>{employee.firstName} {employee.lastName} - {employee.dob}</li>
        })

        return employees.length > 0 ? employees : "No employees";
    }
    return (
        <div>
            <div>{props.monthName}</div>
            <div>
                <ul>
                {
                    getEmployeesToDisplay()
                }
                </ul>
                
            </div>
        </div>
    )
}

export default DobMonth;