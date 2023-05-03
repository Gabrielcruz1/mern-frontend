import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { UserContext } from '../Data'
import { setUserToken, clearUserToken } from '../utils/authToken'
import RegisterForm from '../Components/RegisterForm';


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

    return (
        <section className='container'>
            <RegisterForm signUp={registerUser} />
        </section>
    )
}

export default Auth;