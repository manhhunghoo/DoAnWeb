import React, {useState} from 'react'

import CreateVideo from "./CreateVideo";
import CreatePost from "./CreatePost";
import CreateVideoForm from "../../../../components/Form/CreateVideoForm";
import CreatePostForItem from "../../../../components/Form/CreatePostForItem";

export default function ActionList({ item, user }) {
    const [formCreateVideo, setFormCreateVideo] = useState(false);
    const [formCreatePost, setFormCreatePost] = useState(false);
    return (
        <>
            <button onClick={() => setFormCreateVideo((pre) => !pre)}>
                <CreateVideo></CreateVideo>
            </button>
            <button onClick={() => setFormCreatePost((pre) => !pre)}>
                <CreatePost></CreatePost>
            </button>
            {(user.role === "admin" || user.role === "teacher") &&
                formCreateVideo && (
                    <CreateVideoForm item={item}></CreateVideoForm>
                )}
            {(user.role === "admin" || user.role === "teacher") &&
                formCreatePost && (
                    <CreatePostForItem item={item}></CreatePostForItem>
                )}
        </>
    )
}
