import { Container, Card, Button, Image } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Vote from './Vote';
import TagPopUp from './TagPopUp';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { VscComment } from "react-icons/vsc";

function Posts() {
    const [modalShow, setModalShow] = useState(false);
    const success = () => {
        NotificationManager.success('Post Added Successfully', 'success');
    }
    const posts = useSelector(state => state.postsReducer);
    const users = useSelector(state => state.UsersReducer);

    let user = {};
    return (
        <Container className='py-1 '>
            {
                posts.map(post => {
                    { user = users?.find(user => user.id === post?.user.id) }
                    return (
                        <div key={post?.id} className='d-flex justify-content-between p-1 my-3 bg-light w-75'>
                            <div className='my-4'>
                                <Vote post={post} />
                            </div>
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
                                        <div className='ms-3'>
                                            <Link to={'/post/' + post?.id}>
                                                <VscComment className='me-3' />
                                            </Link>
                                            {post?.commentsTotal} Comments
                                        </div>
                                        <div >
                                            <Button className='me-5' variant="outline-warning" onClick={() => setModalShow(true)}>Add Tags</Button>
                                            <Link to={'/post/' + post?.id}><Button variant="outline-danger">show more</Button></Link>
                                        </div>
                                    </div>
                                    <TagPopUp show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        post={post}
                                        success={success} />
                                </Card.Body>
                            </div>
                        </div>
                    )
                })
            }
        </Container>
    );
}
export default Posts;
