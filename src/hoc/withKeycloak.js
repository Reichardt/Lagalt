import { Redirect } from "react-router"
import { useKeycloak } from "../hooks/useKeycloak"

const withKeycloak = Component => props => {
    const [keycloak] = useKeycloak()

    if (keycloak && keycloak.authenticated) {
        return <Component {...props} />
    } else if (keycloak && !keycloak.authenticated) {
        return <Redirect to="/" />
    }

    return <p>Authenticating...</p>
}
export default withKeycloak