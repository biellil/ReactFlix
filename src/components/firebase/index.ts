import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const performance = getPerformance(app)

// Inicializa a autenticação e define a persistência
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence) // Persiste a sessão no localStorage

// Provedores de login
const googleProvider = new GoogleAuthProvider()

// Função para fazer login com Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    console.log('Usuário autenticado com Google:', user)
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error)
  }
}

// Função para criar usuário com email e senha
const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    console.log('Usuário criado com email e senha:', user)
    return user
  } catch (error) {
    console.error('Erro ao criar conta com email e senha:', error)
    throw error
  }
}

// Função para fazer logout
const logout = async () => {
  try {
    await signOut(auth)
    console.log('Usuário deslogado com sucesso')
  } catch (error) {
    console.error('Erro ao deslogar:', error)
  }
}

export {
  analytics,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  logout,
  performance,
}
