export function addClassToString(string, className) {
    let classNames = string.split(" ")
    const index = classNames.indexOf(className);
    if (index === -1) {
        classNames.push(className);
    }
    return classNames.join(" ").trim()
}

export default addClassToString;
