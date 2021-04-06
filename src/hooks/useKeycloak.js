import Keycloak from "keycloak-js";
import { useEffect, useState } from "react";

/**
 * Get an instance of the keycloak library.
 * @param {string|object} config Keycloak.json location or JavaScript object with configuration
 * @returns {Array<object|string>} [ keycloak, keycloakError ]
 */
export function useKeycloak(config = '/keycloak.json') {

    const [keycloak, setKeycloak] = useState(null)
    const [keycloakError, setKeycloakError] = useState('')

    useEffect(() => {

        const keycloakInstance = new Keycloak(config)

        keycloakInstance.init({ onLoad: 'login-required' })
            .then(authenticated => {
                setKeycloak(keycloakInstance)
            })
            .catch(error => {
                setKeycloakError(error.message)
            })
    }, [])

    return [keycloak, keycloakError];
}