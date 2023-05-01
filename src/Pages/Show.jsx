import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import PostComponent from './Post';

const ShowComponent = (props) => {
  const [post, setPost] = useState(null)
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
