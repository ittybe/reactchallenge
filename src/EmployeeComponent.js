import { useState } from "react";

export function EmployeeComponent(props) {
    // props
    // id
    // firstName
    // lastName

    const [isActive, setIsActive] = useState(props.isActive)


    const onIsActiveChange = (event) => {
        let value = event.target.value;
        setIsActive(value === "active");
        console.log(`value onIsActiveChange: ${value}`)
        props.handleIsActiveChange(props.id, value === "active");
    }

    return (
        <div>
            <div>{props.firstName} {props.lastName}</div>
            <form>
                <div onChange={onIsActiveChange}>
                    <input defaultChecked={isActive === false} type="radio" value="notactive" name="IsActive" /> Not Active
                    <input defaultChecked={isActive === true} type="radio" value="active" name="IsActive" /> Active
                </div>
            </form>
        </div>
    )
}

export default EmployeeComponent;