import { useState } from "react"
import { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { KeycloakContext } from "../../context/KeycloakContext"
import withKeycloak from "../../hoc/withKeycloak"

const Profile = () => {

    const { keycloak, initialising } = useContext(KeycloakContext)
    const history = useHistory()

    const [state, setState] = useState({
        profile: null,
        loading: true
    })

    useEffect(() => {

        if (initialising) return;

        keycloak.loadUserProfile()
            .then(profile => {
                console.log(profile);
                setState({
                    loading: false,
                    profile
                })
            })
    }, [])

    const onLogoutClick = () => {

        if (!window.confirm('Are you sure?')) {
            return;
        }

        keycloak.logout().then(() => {
            history.push('/')
        });
    }

    return (
        <main>
            <h1>Profile</h1>
            <p>Welcome to your profile</p>
            <button onClick={onLogoutClick}>Logout</button>
            <p>
                <Link to="/timeline">Back to posts</Link>
            </p>
            <pre>
                {JSON.stringify(state.profile)}
            </pre>
        </main>
    )
}
export default withKeycloak(Profile)