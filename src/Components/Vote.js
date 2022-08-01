import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllPosts } from '../redux/actions/post.action';
import { TbArrowBigTop, TbArrowBigDown } from "react-icons/tb";

function Vote({ post }) {
    const dispatch = useDispatch();

    const addRemoveVote = async (val) => {
        const vote = {
            userId: 1,
            postId: post?.id,
            value: val,
        }
        try {
            const API = axios.create({ baseURL: 'http://localhost:2303' });
            await API.post(`/votes`, vote);
            const getPosts = await API.get('/posts');
            dispatch(getAllPosts(getPosts.data.data));
        } catch (error) {
            console.log('404! Not Found')
        }
    }

    return (
        <div>
            <TbArrowBigTop className='ms-1' size={"1.5em"} onClick={() => addRemoveVote(1)} />
            <div className=' d-flex justify-content-center w-100 mx-1'> {post.upVotesTotal}</div>
            <TbArrowBigDown className='ms-1' size={"1.5em"} onClick={() => addRemoveVote(-1)} />
        </div>
    )
}

export default Vote;
