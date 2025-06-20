import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Cambiar a los datos correctos para conectar con firebase

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)