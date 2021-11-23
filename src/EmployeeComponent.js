import { useState } from "react";

export function EmployeeComponent(props) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [id, setId] = useState(props.id);
    const [isActive, setIsActive] = useState(props.isActive)


    const onIsActiveChange = (event) => {
        let value = event.target.value;
        setIsActive(value === "active");
        console.log(`value onIsActiveChange: ${value}`)
        // props.handleIsActiveChange(event);
    }

    return (
        <div>
            <div>{firstName} {lastName}</div>
            <div onChange={onIsActiveChange}>
                <input type="radio" value="notactive" name="IsActive" /> Not Active
                <input type="radio" value="active" name="IsActive" /> Active
            </div>
        </div>
    )
}

export default EmployeeComponent;