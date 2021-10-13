import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import urls from "../../utils/urls";
import {FcAddImage} from 'react-icons/fc'
import _ from "../../styles/CreatePost.module.scss";
import {useRouter} from 'next/router'

const CreatePost = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {
        auth: { isLoggedIn, account },
    } = useSelector((state) => state);
    const [post, setPost] = useState({ content: "", media: "" });

    const createPost = async (event) => {
        event.preventDefault();
        if (
            post.content ||
            (post.media && post.media.type.startsWith("image/"))
        ) {
            const formData = new FormData();
            formData.append("content", post.content);
            formData.append("post", post.media);
            const response = await fetch(urls.createPost + account._id, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const data = await response.json();
            console.log(data);
        }
    };

    useEffect(() => {
        dispatch({type: 'LOAD'})
        if(!isLoggedIn) 
            router.replace('/')
        dispatch({type: 'STOP_LOAD'})
    }, [])

    return (
        <div className={_.createPost}>
            <h1>Create a Post</h1>
            <form action="">
                <textarea
                    placeholder="Start writing here..."
                    value={post.content}
                    onChange={({ target: { value } }) =>
                        setPost({ ...post, content: value })
                    }
                />
                <div className={_.postImage}>
                    <label htmlFor='post'>
                        <FcAddImage/>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name='post'
                        onChange={({ target: { files } }) =>
                            setPost({ ...post, media: files[0] })
                        }
                    />
                </div>
                {post.media && <p>{post.media.name} uploaded successfully</p>}
                <input type="submit" value="Upload" onClick={createPost} />
            </form>
        </div>
    );
};

export default CreatePost;