/* eslint-disable no-useless-catch */
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
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
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
    return user
    // console.log('Usuário autenticado com Google:', user);
  } catch (error) {
    // console.error('Erro ao fazer login com Google:', error);
    throw error
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
    return user
    // console.log('Usuário criado com email e senha:', user);
  } catch (error) {
    // console.error('Erro ao criar conta com email e senha:', error);
    throw error
  }
}

// Função para fazer login com email e senha
const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    return user
    // console.log('Usuário logado com email e senha:', user);
  } catch (error) {
    // console.error('Erro ao fazer login com email e senha:', error);
    throw error
  }
}

// Função para fazer logout e remover os dados do localStorage
const logout = async (): Promise<void> => {
  try {
    // Desloga o usuário do Firebase
    await signOut(auth)

    // Remove os dados do usuário (como uid) do localStorage, se disponível
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user') // Caso você tenha armazenado dados personalizados lá
      localStorage.removeItem('firebaseui-auth-container')
    }

    // console.log('Usuário deslogado e dados removidos do localStorage');
  } catch (error) {
    // console.error('Erro ao deslogar:', error);
  }
}

// Inicializa Analytics e Performance se necessário
let analytics, performance
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app) // Inicializa Analytics
  performance = getPerformance(app) // Inicializa Performance
}

export {
  analytics,
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  logout,
  performance,
}
