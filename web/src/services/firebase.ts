import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDUZZke1y2y08ZGsiIesfdnrG-WQpy1J20',
  authDomain: 'auth-13e80.firebaseapp.com',
  projectId: 'auth-13e80',
  storageBucket: 'auth-13e80.appspot.com',
  messagingSenderId: '672475330156',
  appId: '1:672475330156:web:b9f5e96f53f15923168a49'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
