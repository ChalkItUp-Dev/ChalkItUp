import DefaultLayout from "../layouts/default.tsx";
import {doCreateUserWithEmailAndPassword} from "../firebase/auth.ts";
import AuthFormRegister from '../components/auth/registerForm';

function registerPage() {
    return (
        <DefaultLayout>
            <AuthFormRegister
                buttonText="Register"
                onSubmit={doCreateUserWithEmailAndPassword}
                linkText="Already have an account? Sign in here."
                linkTo="/login"
            />
        </DefaultLayout>
    );
}

export default registerPage;