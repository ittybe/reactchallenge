import React, { useState, useRef, createRef } from 'react';
import onlyUnique from './utils/onlyUnique';
import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";

export function AlphabetPicker(props) {
    const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");

    // states
    const [pickedLetters, setPickedLetters] = useState("");

    const letterRefs = useRef(new Array());

    // fucntions
    const handleLetterClick = (letter, i) => {
        // set state
        let pickedLettersLocal = pickedLetters;
        pickedLettersLocal += letter;
        setPickedLetters(pickedLettersLocal)

        // get ref
        const letterRef = letterRefs.current[i]
        let classNameStr = letterRef.className
        console.log(`classNameStr: ${classNameStr}, ${letter}, ${i}`)
        // check if active class exists
        const activeClassName = "alphabet__letter--active";
        if (/.*alphabet__letter--active.*/g.test(classNameStr)) {
            // if exists remove it  
            classNameStr = removeClassFromString(classNameStr, activeClassName);
            letterRef.className = classNameStr;
        }
        else {
            // if not exists add it 
            classNameStr = addClassToString(classNameStr, activeClassName);
            letterRef.className = classNameStr;
        }
    }

    return (
        <div className="alphabet-picker">
            <div className="alphabet">
                {
                    alphabetArray.map((letter, i) => {
                        return (<button key={i} className={`alphabet__letter`} ref={(element) => letterRefs.current.push(element)} onClick={() => handleLetterClick(letter, i)} >{letter}</button>)
                    })
                }
            </div>
            <div>
                <button></button>
            </div>
        </div>
    )
}

export default AlphabetPicker;