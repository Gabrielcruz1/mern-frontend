import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShowComponent = (props) => {
  const [post, setPost] = useState(null)
  const { id } = useParams()
  const URL = `http://localhost:4000/posts/${id}`

  const getPost = async () => {
    try {
      const response = await fetch(URL)
      const result = await response.json()
      setPost(result)
    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <h1>Show Component </h1>
  )
}

export default ShowComponent
