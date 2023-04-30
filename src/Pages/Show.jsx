import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';
// import PostComponent from './Post';

const ShowComponent = (props) => {
  const [post, setPost] = useState(null)
  const { id } = useParams()
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

  useEffect(() => {
    getPost();
  }, [])

  const loaded = () => {
    <div>
      <h1>Show Page</h1>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <img src={post.image} alt={post.name + "image"} />
    </div>
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

  return post && post.length ? loaded() : loading()
}

export default ShowComponent
