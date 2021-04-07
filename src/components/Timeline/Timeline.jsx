import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import withKeycloak from "../../hoc/withKeycloak"

const Timeline = () => {

    console.log('Timeline.render()');

    const [state, setState] = useState({
        posts: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                setState({
                    posts,
                    loading: false,
                    error: ''
                })
            })
            .catch(error => {
                setState({
                    ...state,
                    loading: false,
                    error: error.message
                })
            })
    }, [])

    return (
        <main>
            {state.error && <p>{state.error}</p>}
            {state.loading && <p>Loading posts...</p>}
            <Link to="/profile">View your profile</Link>
            <h1>Posts</h1>
            {state.posts.map(post => <p key={post.id}>{post.title}</p>)}
        </main>
    )
}
export default withKeycloak(Timeline)