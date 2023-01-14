import { FormEvent, useEffect, useState } from 'react'
import { ListPlus, GoogleLogo } from 'phosphor-react'
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth } from '../services/firebase'
import { motion } from 'framer-motion'
import axios from 'axios'

export function Login() {
    useEffect(() => {
        document.title = 'TODO App - Login'
    }, [])

    const [userGoogleInfo, setUserGoogleInfo] = useState<User>({} as User)
    const [userId, setUserId] = useState<string>('')
    const [sucssecLogin, isSucssesLogin] = useState<boolean>(false)

    async function handleGoogleLogin(event: FormEvent) {
        event.preventDefault()

        const provider = new GoogleAuthProvider()

        await signInWithPopup(auth, provider)
        .then((result) => {
            setUserGoogleInfo(result.user)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    async function getUserId() {
        try {
            await axios.post('http://localhost:3333/users/login', {
                name: userGoogleInfo.displayName,
                email: userGoogleInfo.email,
                picture: userGoogleInfo.photoURL
            }).then(response => {
                setUserId(response.data)
            })           
        } catch(error) {
            console.log(error)
        }
    }

    if (Object.keys(userGoogleInfo).length > 0 && !sucssecLogin) {
        getUserId()
        isSucssesLogin(true) 
    }
    
    if (userId != '') {
        location.href = `home/${userId}`
    }

    return (
        <div className="w-full flex flex-col items-center">
            <header className="w-full h-24 flex justify-center items-center gap-2 border-b border-gray-300">
                <ListPlus size={28} weight="bold" />
                <h1 className="font-fredoka text-2xl">TODO App</h1>
            </header>
            <form onSubmit={handleGoogleLogin} className="w-full flex flex-col items-center gap-6 mt-40 text-white">
                <span className="font-semibold text-black">Realize login or register with Google to use the TODO App</span>
                <motion.div whileHover={{scale: 1.05}}>
                    <button type="submit" className="w-[400px] h-12 border border-white rounded flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-red-400">
                        <GoogleLogo size={20} weight="bold" />
                        <span>Continue with Google</span>
                    </button>
                </motion.div>
            </form>
        </div>
    )
}
