import { useState } from "react";
import "./EmployeeComponent.css";

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
        <div className="employee">
            <div className={`employee__fullname ${isActive ? "employee__fullname--active" : ""}`}>{props.firstName} {props.lastName}</div>
            <form className="employee__form">
                <div onChange={onIsActiveChange}>
                    <label className="employee__input-container">Not Active
                        <input className="employee__input" defaultChecked={isActive === false} type="radio" value="notactive" name="isActive" />
                        <span className="employee__checkmark"></span>
                    </label>
                    <label className="employee__input-container">Active
                        <input className="employee__input" defaultChecked={isActive === true} type="radio" value="active" name="isActive" />
                        <span className="employee__checkmark"></span>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default EmployeeComponent;