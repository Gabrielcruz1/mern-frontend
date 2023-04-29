import { useState, useEffect } from 'react';

const PostComponent = (props) => {
    const [post, setPost] = useState([])

    const BASE_URL = "http://localhost:4000/posts"

    const getPost = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPosts = await response.json()
            setPost(allPosts)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    console.log(`There are ${post.length} posts available to render`)

    const loaded = () => {
        return post.map((post) => {
            return (
                <div key={post._id}>
                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <img src={post.image} />
                    <p>{post.price}</p>
                </div>
            );
        });
    };

    const loading = () => (
        <section>
            <h1>
                Loading...
                <span>
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                    />{" "}
                </span>
            </h1>
        </section>
    );




    return (
        <section>
            {post && post.length ? loaded() : loading()}
        </section>
    )
}

export default PostComponent
