import { doSignInWithEmailAndPassword } from '../firebase/auth.ts';
import AuthForm from '../components/auth/signForm.tsx';
import Navbar from '../components/navbar';

function loginPage() {
    return (
        <>
            <Navbar title={'Log In'} />
            <div className="pt-20">
                <AuthForm
                    buttonText="Sign In"
                    onSubmit={doSignInWithEmailAndPassword}
                    linkText="Don't have an account? Sign up here."
                    linkTo="/register"
                />
            </div>
        </>
    );
}

export default loginPage;
