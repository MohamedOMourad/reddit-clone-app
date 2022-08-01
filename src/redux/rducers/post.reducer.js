const PostReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllPosts":
            return action.payload;
            default:
            return state;
    }
}

export default PostReducer;