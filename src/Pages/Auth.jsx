import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { UserContext } from '../Data'
import { getUserToken, setUserToken, clearUserToken } from '../utils/authToken'
import RegisterForm from '../Components/RegisterForm';
import LoginForm from '../Components/LoginForm'


function Auth() {
    const { setAuth, setUser } = useContext(UserContext)
    // console.log("Testing Context", setAuth, setUser)
    const registerUser = async (data) => {
        try {

            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const newUser = await fetch(
                "http://localhost:4000/auth/register",
                configs
            )
            console.log(newUser)

            const parsedUser = await newUser.json()

            if (parsedUser.token) {
                // sets local storage
                setUserToken(parsedUser.token)
                // put the returned user object in state
                setUser(parsedUser.user)
                // adds a boolean cast of the responses isAuthenticated prop
                setAuth(parsedUser.isLoggedIn)

                // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
                // this would also require reconfiguring our backend so we only send tokens with a signup

                return parsedUser
            } else {
                throw `Server Error: ${parsedUser.err}`
            }

        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
            return null
        }
    }

    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const response = await fetch(
                "http://localhost:4000/auth/login",
                configs
            )
    
            const currentUser = await response.json()
            // console.log(currentUser)
    
            if (currentUser.token) {
                // sets local storage
                setUserToken(currentUser.token)
                // put the returned user object in state
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)
    
                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }

    return (
        <section className='container'>
            <RegisterForm signUp={registerUser} />
            <LoginForm signIn={loginUser} />
        </section>
    )
}

export default Auth;