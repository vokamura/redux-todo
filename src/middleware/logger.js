
//es6
//this is logging actions
export default store => next => action => {
    //code goes here
    console.log('ACTION: ', action);

    return next(action);
}

//es5
// export default function(store){
//     return function(next){
//         return function(action){
//             code goes here
//         }
//     } 
// }