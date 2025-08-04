import {doCreateUserWithEmailAndPassword} from "../firebase/auth.ts";
import AuthFormRegister from '../components/auth/registerForm';
import Navbar from '../components/navbar';

function registerPage() {
    return (
        <>
            <Navbar title={"Register"}/>
            <div className="pt-20">
                <AuthFormRegister
                    buttonText="Register"
                    onSubmit={doCreateUserWithEmailAndPassword}
                    linkText="Already have an account? Sign in here."
                    linkTo="/login"
                />
            </div>
        </>

    );
}

export default registerPage;