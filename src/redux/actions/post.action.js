export const getAllPosts = (posts) => {
    return {
        type: "getAllPosts",
        payload: posts,
    }
};