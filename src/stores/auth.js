import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'



export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()

    const errorMsg = ref('')
    const errorCodes = {
        'auth/invalid-login-credentials': 'Favor de revisar su correo o contraseña'
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user
            }
        })
    })

    //Usuario acceda con una dirección de correo electrónico y una contraseña
    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                authUser.value = user
                router.push({name: 'admin-properties'})

            })
            .catch((error) => {
                errorMsg.value = errorCodes[error.code]
                console.log(error.code)
                console.log(error.message)
            });
    }

    const logout = () => {
        signOut(auth).then(() => {
            authUser.value = null
            router.push({name: 'login'})
        }).catch(error => {
            console.log(error)
        })
    }

    const hasError = computed(() => {
        return errorMsg.value
    })

    const isAuth = computed(() => {
        return authUser.value
    })

    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth
    }
})