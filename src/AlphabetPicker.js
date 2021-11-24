import React, { useState, useRef, createRef, useEffect } from 'react';
import onlyUnique from './utils/onlyUnique';
import addClassToString from "./utils/addClassToString";
import removeClassFromString from "./utils/removeClassFromString";
import "./AlphabetPicker.css"

export function AlphabetPicker(props) {
    const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
    // states
    const [pickedLetters, setPickedLetters] = useState("");

    const letterRefs = useRef(new Array());
    const activeClassName = "alphabet__letter--active";

    useEffect(() => {
        setPickedLetters(props.pickedLetters)
        // for (let i = 0; i < letterRefs.length; i++) {
        //     const letterRef = letterRefs[i];
        //     let classNameStr = letterRef.className
        //     const activeClassName = "alphabet__letter--active";

        //     if (!(/.*alphabet__letter--active.*/g.test(classNameStr))
        //         && props.pickedLetters.indexOf(letterRef.current.innerText.toLowerCase()) !== -1) {
        //         classNameStr = addClassToString(classNameStr, activeClassName);
        //         letterRef.className = classNameStr;
        //     }
        // }
    }, [props.pickedLetters])

    // fucntions
    const handleLetterClick = (letter, i) => {
        // get ref
        const letterRef = letterRefs.current[i]
        let classNameStr = letterRef.className
        console.log(`classNameStr: ${classNameStr}, ${letter}, ${i}`)
        // check if active class exists
        const activeClassName = "alphabet__letter--active";

        if (/.*alphabet__letter--active.*/g.test(classNameStr)) {
            // // if exists remove it  
            // classNameStr = removeClassFromString(classNameStr, activeClassName);
            // letterRef.className = classNameStr;
            // and remove it from picked letters
            let pickedLettersLocal = pickedLetters;
            pickedLettersLocal = pickedLettersLocal.replace(letter, '')
            pickedLettersLocal = onlyUnique(pickedLettersLocal.split("")).join("")
            console.log(pickedLettersLocal)
            setPickedLetters(pickedLettersLocal)
        }
        else {
            // // if not exists add it 
            // classNameStr = addClassToString(classNameStr, activeClassName);
            // letterRef.className = classNameStr;
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
                        return (<button
                            key={i}
                            className={`btn btn--alphabet-letter alphabet__letter 
                            ${pickedLetters.indexOf(letter.toLowerCase()) !== -1 ? activeClassName : ""}`}
                            ref={(element) => letterRefs.current.push(element)}
                            onClick={() => handleLetterClick(letter, i)}>{letter}</button>)
                    })
                }
            </div>
            <div>
                <button className="btn btn--alphabet-picker" onClick={() => props.searchForEmployees(pickedLetters)}>Search!</button>
            </div>
        </div>
    )
}

export default AlphabetPicker;