export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

// export const findValueByKey = (ob, id) => {
//     let result = [];
//     if (ob === id) {
//         result.push(ob[id])
//     }
//     let keys = Object.keys(ob);

//     keys.map( key=> {
//         if ( typeof ob[key] === 'object') {
//             result.push(findValueByKey(ob[key], key))
//             if () {
//                 return ;
//             }
//         }
//     })

//     return result;

// }