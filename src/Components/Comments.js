import React from 'react';
import { Container, Card, Image } from 'react-bootstrap';
import moment from 'moment';

function Comments({ post }) {
    return (
        <Container className='py-1 '>
            {
                post?.comments?.map(comment => {
                    return (
                        <div key={comment.id} className='d-flex justify-content-between p-1 my-3 bg-light w-75'>
                            <div className='w-100'>
                                <Card.Body className={` ّbg-light`}>
                                    <div className='d-flex align-items-center ms-3'>
                                        <div className='me-3'>
                                            <Image roundedCircle src={comment?.user?.imgUrl}></Image>
                                        </div>
                                        <div className='me-3'>
                                            {`${comment?.user?.firstName} ${comment?.user?.lastName}`}
                                        </div>
                                        <div >
                                            {moment(comment?.dateCreated).format(' h:mm a')}
                                        </div>
                                    </div>
                                    <Card.Text className={`ّbg-light m-3`}>
                                        {comment?.body}
                                    </Card.Text >
                                </Card.Body>
                            </div>
                        </div>
                    )
                })
            }
        </Container>
    )
}
export default Comments;
