import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {keycloak} from "./keycloak.ts";

await keycloak.init({
    onLoad: "check-sso",
    silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
