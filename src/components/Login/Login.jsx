import { useContext } from "react"
import { Redirect } from "react-router"
import { KeycloakContext } from "../../context/KeycloakContext"

const Login = () => {

    const { keycloak, initialising } = useContext(KeycloakContext)

    console.log(keycloak);
    console.log(initialising);

    const onLoginClick = async event => {
        event.preventDefault();
        try {
            const authenticated = keycloak.login();
            console.log(authenticated);
        }
        catch (error) {
            console.error('Login Error', error);
        }
    }

    return (
        <>
            { initialising && <p>Initialising...</p>}
            { !initialising &&
                <main>
                    {(keycloak && keycloak.authenticated) &&
                        <Redirect to="/timeline" />
                    }
                    <h1>Login to get started</h1>
                    <p>Use our 1-Click Sign</p>

                    <button onClick={onLoginClick}>Sign in with Keycloak</button>
                </main>
            }
        </>
    )
}

export default Login