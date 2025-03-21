import './App.css'
import {keycloak} from "./keycloak.ts";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

interface UserInfo {
    name: string;
    preferred_username: string;
    email: string
}

function Login() {
    return (
        <button onClick={async () => await keycloak.login()}>
            login
        </button>
    )
}

function Logout() {
    return (
        <button onClick={async () => await keycloak.logout()}>
            logout
        </button>
    )
}

function App() {
    const [user, setUser] = useState<UserInfo|null>(null);

    const decodeToken = (token: string): UserInfo => {
        return jwtDecode<UserInfo>(token)
    }

    useEffect(() => {
        if (keycloak.authenticated) {
            setUser(decodeToken(keycloak.token!));
        }
    }, []);

    return (
        <>
            <h1>Hello World</h1>
            <div className="body">
                <div className="action">
                    {!keycloak.authenticated ? (
                        <Login/>
                    ): (
                        <>
                            <Logout/>
                            <h4>User info</h4>
                            <p>Name: {user?.name}</p>
                            <p>Username: {user?.preferred_username}</p>
                            <p>Email: {user?.email}</p>
                        </>
                    )}
                </div>
                <div className="info">
                    <div>
                        <a href="http://localhost:8180/realms/keycloak-example/account" target={'_blank'}>Keycloak Account Console</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
