// Return the next id for a new todo 
export const getNewId = (array) => {
    if(array.length === 0) return 1;
    const lastId = array[array.length - 1].id + 1;
    return lastId;
}