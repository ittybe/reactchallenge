export function removeClassFromString(string, className) {
    let classNames = string.split(" ")
    const index = classNames.indexOf(className);
    if (index > -1) {
        classNames.splice(index, 1);
    }
    return classNames.join(" ").trim();
}

export default removeClassFromString;