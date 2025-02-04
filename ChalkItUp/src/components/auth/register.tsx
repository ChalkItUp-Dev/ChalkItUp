import {doCreateUserWithEmailAndPassword} from '@/firebase/auth.ts';
import AuthForm from './signForm';

const Register = () => {
    return (
        <AuthForm
            title="Welcome"
            buttonText="Sign Up"
            onSubmit={doCreateUserWithEmailAndPassword}
            linkText="Already have an account? Sign in here."
            linkTo="/login"
        />
    );
};

export default Register;
