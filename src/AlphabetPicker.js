import React, { useState, useRef, createRef, useEffect } from 'react';
import onlyUnique from './utils/onlyUnique';
import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";

export function AlphabetPicker(props) {
    const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
    // states
    const [pickedLetters, setPickedLetters] = useState("");

    useEffect(()=> {
        setPickedLetters(props.pickedLetters)
    }, [props.pickedLetters])
    
    const letterRefs = useRef(new Array());
    // fucntions
    const handleLetterClick = (letter, i) => {
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
            // and remove it from picked letters
            let pickedLettersLocal = pickedLetters;
            pickedLettersLocal = pickedLettersLocal.replace(letter, '')
            pickedLettersLocal = onlyUnique(pickedLettersLocal.split("")).join("")
            console.log(pickedLettersLocal)
            setPickedLetters(pickedLettersLocal)
        }
        else {
            // if not exists add it 
            classNameStr = addClassToString(classNameStr, activeClassName);
            letterRef.className = classNameStr;
            // and add it to pickedLetters
            let pickedLettersLocal = pickedLetters;
            pickedLettersLocal += letter;
            pickedLettersLocal = onlyUnique(pickedLettersLocal.split("")).join("")
            console.log(pickedLettersLocal)
            setPickedLetters(pickedLettersLocal)
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
                <button onClick={() => props.searchForEmployees(pickedLetters)}>Search!</button>
            </div>
        </div>
    )
}

export default AlphabetPicker;