import { useParams } from 'react-router-dom';
import Post from "../Components/post";

function PostDetails() {

    const { id } = useParams();

    return (
        <Post id={id} />
    )
}

export default PostDetails;
