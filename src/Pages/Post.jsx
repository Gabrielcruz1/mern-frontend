import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const PostComponent = (props) => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = await createPost()
        // reset the form
        setNewForm({ title: "", description: "", image: "", price: "" })
    }


    const createPost = async (postData) => {
        try {
            const newPost = await fetch(URL, {
                method: "post",
                headers: {
                    "Content-Type": "appliation/json"
                },
                body: JSON.stringify(postData)
            });
            // trigger fetch of updated post to replace stale content
            getPost();

        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getPost()
    }, [])

    const loaded = () => {
        return post.map((post) => {
            return (
                <div key={post._id} className="postsThatAreMapped">
                    <Link to={`/posts/${post._id}`}> 
                    <p> The Post/Product -- {post.title}</p>
                    <p>The Post/Product Description -- {post.description}</p>
                    <img src={post.image} style={{ width: 400, height: 300 }} />
                    <p>The Price/Possibly something else -- {post.price}</p>
                    </Link>
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

    <section>
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
                name="descrption"
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


    return (
        <section>
            {post && post.length ? loaded() : loading()}
        </section>
    )
}

export default PostComponent
