const UsersReducer = (state = [], action)=>{
    switch (action.type) {
        case "getAllUsers":
            // console.log(state)
            return action.payload;
        default:
            // console.log(state)
            return state;
    }
}
export default UsersReducer;