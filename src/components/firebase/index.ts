// src/components/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getPerformance } from 'firebase/performance'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
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
// Configura a autenticação e os provedores
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider('apple.com')

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

// Função para fazer login com Apple
const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider)
    const user = result.user
    console.log('Usuário autenticado com Apple:', user)
  } catch (error) {
    console.error('Erro ao fazer login com Apple:', error)
  }
}

export { analytics, signInWithGoogle, signInWithApple, performance }
