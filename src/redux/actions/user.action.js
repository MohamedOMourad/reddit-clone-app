export const getAllUsers = (users) => {
    // console.log(users)
    return {
        type: "getAllUsers",
        payload: users
    }
}