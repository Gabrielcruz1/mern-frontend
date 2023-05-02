import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import PostComponent from './Post';

const ShowComponent = (props) => {
  const [post, setPost] = useState(null)
  const [editForm, setEditForm] = useState(post)
  const { id } = useParams()
  const navigate = useNavigate()
  const URL = `http://localhost:4000/posts/${id}`


  const getPost = async () => {
    try {
      const response = await fetch(URL)
      const result = await response.json()
      setPost(result)
    } catch (err) {
      console.log(err)
    }
  }

  const removePost = async () => {
    try {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(URL, options)
      const deletedPost = await response.json()
      navigate('/')
      // navigate will change the browser's URL
      // whic
    } catch (err) {
      console.log(err);
      navigate(URL)
    }
  }

  const updatePost = async (e) => {
    e.preventDefault()
    try{
      await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm)
      })
      // trigger a re-render after the fetch is complete
      getPost()
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = event => {
    setEditForm({...editForm, [event.target.name] : event.target.value })
  }

  useEffect(() => {
    getPost();
  }, [])

  const loaded = () => {
    return (
    <div>
      <h1>Show Page</h1>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <img style={{height:300, width:400 }} src={post.image} alt={post.name + "image"} />
      <div>
        <button onClick={removePost}> Remove Post</button>
      </div>
      <section>
        <h2>Edit this post</h2>
      </section>
    </div>
    )
  }

  const loading = () => {
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
  };

  return post ? loaded() : loading()
}

export default ShowComponent
