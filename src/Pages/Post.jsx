import "../Styling/Post.css"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getUserToken } from '../utils/authToken';

const PostComponent = (props) => {

    const token = getUserToken()
    const [post, setPost] = useState([])
    // state for formData
    const [newForm, setNewForm] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
    });


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

    const handleChange = (e) => {
        setNewForm({ ...newForm, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...newForm }
        // check any fields for property data types / truthy value (function call - stretch)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            // 2. specify request method , headers, Content-Type
            // 3. make fetch to BE - sending data (requestOptions)

            // 3a fetch sends the data to API - (mongo)
            const response = await fetch(BASE_URL, requestOptions)
            // 4. check our response - 
            // 5. parse the data from the response into JS (from JSON) 
            const createdPost = await response.json()
            // update local state with response (json from be)
            setPost([...post, createdPost])
            // reset newForm state so that our form empties out
            setNewForm({
                title: "",
                description: "",
                image: "",
                price: ""
            })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    const loaded = () => {
        return post.map((post) => {
            return (
                <>
                    <div key={post._id} className="mappedPosts">
                        <Link to={`/posts/${post._id}`}>
                            <p> Product -- {post.title}</p>
                            <p>Description -- {post.description}</p>
                            <img src={post.image} style={{ width: 80, height: 80 }} />
                            <p>Price -- {post.price}</p>
                        </Link>

                    </div>
                </>
            );
        });
    };

    const loading = () => (
        <section className="loadingFunctionSection">
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
        <div className="createPostInputFields">
            <section >
                <h2>Create a new post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newForm.title}
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={newForm.description}
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={newForm.image}
                        name="image"
                        placeholder="image"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        value={newForm.price}
                        name="price"
                        placeholder="price"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Create Post" />
                </form>
            </section>
            {post && post.length ? loaded() : loading()}
        </div >

    )
}

export default PostComponent
