export function onlyUnique(array) {
    var unique = array.filter((value, index) => {
        return array.indexOf(value) === index;
    });
    return unique;
}

export default onlyUnique;