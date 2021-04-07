const { useContext } = require("react")
const { Redirect } = require("react-router")
const { KeycloakContext } = require("../context/KeycloakContext")

const withKeycloak = Component => props => {

    const { keycloak, initialising } = useContext(KeycloakContext)

    if (initialising) {
        return (
            <p>Initialising...</p>
        )
    }

    if (!initialising && keycloak && keycloak.authenticated) {
        return (
            <Component {...props} />
        )
    }


    return <Redirect to="/" />

}

export default withKeycloak