import DefaultLayout from "@/layouts/default.tsx";
import {doCreateUserWithEmailAndPassword} from "@/firebase/auth.ts";
import AuthForm from "@/components/auth/signForm.tsx";

function registerPage() {
    return (
        <DefaultLayout>
            <AuthForm
                buttonText="Sign Up"
                onSubmit={doCreateUserWithEmailAndPassword}
                linkText="Already have an account? Sign in here."
                linkTo="/login"
            />
        </DefaultLayout>
    );
}

export default registerPage;