import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from "react-notifications";
import { useState, useEffect } from 'react';



function TagPopUp({ show, onHide, success, post }) {

    const [tags, setTags] = useState([]);

    const API = axios.create({ baseURL: 'http://localhost:2303' });

    const getTags = async () => {
        try {
            const res = await API.get('/tags');
            setTags(res.data.data);
            return res.data.data;
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTags().then(res => console.log(res));
    }, []);

    const addTag = async (values) => {
        try {
            await API.post('tags/link', values);
            // const tagsData = await API.get('/tags');
            // setTags(tagsData);
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
            tagId: [],
            postId: post?.id,
        },
        onSubmit: (values) => {
            addTag(values);
            onHide();
            formik.resetForm();
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required").max(40, "limit passed").min(2, "min 20 words"),
            user: Yup.number().required('you must specify a number').min(1, 'Min value 0.').max(10, 'Max value 10.'),
            body: Yup.string().required("your message is required"),
        }),
    });

    // if (tags?.length === 0) {
    //     return (
    //         <div>
    //             loading
    //         </div>
    //     )
    // }

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
                        Add Tag
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" >
                            <ListGroup name="tagId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tagId} horizontal>
                                {tags.length ? tags.map(tag => <ListGroup.Item key={tag.id}>{tag["name"]}</ListGroup.Item> ): <p>loading</p>}
                            </ListGroup>
                            {formik.touched.tagId && formik.errors.tagId && <p>{formik.errors.tagId}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(() => onHide(),
                            () => formik.values.tagId ? doneAndHide() : fail())
                        }>
                            Add tag
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <NotificationContainer />
        </>
    )
}

export default TagPopUp;





































