import moment from 'moment';
import { Container, Card, Image, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddComment from './AddComment';
import Comments from './Comments';
import { useEffect, useState } from 'react';

function Post({ id }) {

    const posts = useSelector(state => state.postsReducer);
    const users = useSelector(state => state.UsersReducer);

    const [post, setPost] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const getpost = posts?.find(post => post?.id === +id);
        setPost(getpost);
    }, []);

    useEffect(() => {
        const getUser = posts?.find(post => post?.id === +id)?.user;
        setUser(getUser);
    }, []);

    return (
        <>
            {
                user?.firstName ? (
                    < Container className='min-vh-100' >
                        <div key={post?.id} className='d-flex justify-content-between  my-1 bg-light w-75'>
                            <div className='w-100'>
                                <Card.Body className={` ّbg-light`}>
                                    <div className='d-flex align-items-center ms-3'>
                                        <div className='me-3'>
                                            <Image roundedCircle src={user?.imgUrl}></Image>
                                        </div>
                                        <div className='me-3'>
                                            {`${user?.firstName} ${user?.lastName}`}
                                        </div>
                                        <div >
                                            {moment(post?.dateCreated).format(' h:mm a')}
                                        </div>
                                    </div>
                                    <Card.Title className={`ّbg-light m-3`}>{post?.title}</Card.Title>
                                    <Card.Text className={`ّbg-light m-3`}>
                                        {post?.body}
                                    </Card.Text >
                                    <div className={` d-flex align-items-center justify-content-between bg-light`}>
                                        <div className='w-100'>
                                            <AddComment post={post} />
                                        </div>
                                    </div>
                                </Card.Body>
                            </div>
                        </div>
                        <div>
                            <Comments post={post} />
                        </div>
                    </Container >
                ) : <Spinner animation='border' variant='primary' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            }
        </>
    );
}
export default Post;
