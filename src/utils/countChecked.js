// Count checked items given an array of todos
export const countChecked = (array) => {
    if(array.length === 0) return 0;
    let counter = 0;
    array.forEach((element) => {
        if(element.checked === true) counter++;
    })
    return counter;
}