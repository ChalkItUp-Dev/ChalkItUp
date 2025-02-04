import {doSignInWithEmailAndPassword} from '@/firebase/auth.ts';
import AuthForm from './signForm';

const Login = () => {
    return (
        <AuthForm
            title="Welcome Back"
            buttonText="Sign In"
            onSubmit={doSignInWithEmailAndPassword}
            linkText="Don't have an account? Sign up here."
            linkTo="/register"
        />
    );
};

export default Login;
