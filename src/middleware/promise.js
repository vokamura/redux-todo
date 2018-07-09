//check if action doesn't have payload, and if payload isn't a promise
//!action.payload.then checks to see if the payload doesn't have a .then which would return a promise
export default store => next => action => {
    if(!action.payload || !action.payload.then) {
        return next(action);
    }

    action.payload.then(resp=> {
       const newAction = {
           ...action,
           payload: resp
        }; 
        store.dispatch(newAction);
    });

    return action.payload;
}