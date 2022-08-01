import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from "react-notifications";
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/actions/post.action';

function PopUpForm({ show, onHide, success }) {

    const dispatch = useDispatch();

    const addPost = async (values) => {
        try {
            // Post Method
            const API = axios.create({ baseURL: 'http://localhost:2303' });
            await API.post('/posts', values);
            const Posts = await API.get('/posts');
            dispatch(getAllPosts(Posts.data.data));
        } catch (error) {
            console.log('404! Not Found')
        }
    }
    function fail() {
        NotificationManager.info('please fill the Form!', 'Warning');
    }

    function doneAndHide() {
        onHide();
        success();
    }


    const formik = useFormik({
        initialValues: {
            title: "",
            user: "",
            body: "",
        },
        onSubmit: (values) => {
            addPost(values);
            onHide();
            formik.resetForm();
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required").max(40, "limit passed").min(2, "min 20 words"),
            user: Yup.number().required('you must specify a number').min(1, 'Min value 0.').max(10, 'Max value 10.'),
            body: Yup.string().required("your message is required"),
        }),
    });

    return (
        <>
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => {
                    onHide();
                    formik.resetForm();
                }}
            >

                <Modal.Header closeButton>

                    <Modal.Title id="contained-modal-title-vcenter">
                        create Post
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={formik.handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text" placeholder="Enter Title" name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                            {formik.touched.title && formik.errors.title ? <p>{formik.errors.title}</p> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="number" placeholder="Enter Author" name="user" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.user} />
                            {formik.touched.user && formik.errors.user && <p>{formik.errors.user}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>New Post</Form.Label>
                            <Form.Control type="text" placeholder="Create Post" name="body" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} />
                            {formik.touched.body && formik.errors.body && <p>{formik.errors.body}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={(() => onHide(),
                            () => formik.values.body && formik.values.user && formik.values.title ? doneAndHide() : fail())
                        }>
                            Add Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <NotificationContainer />
        </>
    )
}

export default PopUpForm;





































