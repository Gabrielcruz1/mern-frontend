import { Link } from 'react-router-dom'

function Home(props) {
    return (
        <section>
            <h2>Welcome to App</h2>
            <p>Sign in to connect with posts</p>
            <Link to="/auth">CONNECT</Link>
        </section>
    )
}

export default Home