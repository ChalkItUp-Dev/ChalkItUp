import DefaultLayout from "@/layouts/default.tsx";
import {doSignInWithEmailAndPassword} from "@/firebase/auth.ts";
import AuthForm from "@/components/auth/signForm.tsx";

function loginPage() {
    return (
        <DefaultLayout>
            <AuthForm
                buttonText="Sign In"
                onSubmit={doSignInWithEmailAndPassword}
                linkText="Don't have an account? Sign up here."
                linkTo="/register"
            />
        </DefaultLayout>

    );
}

export default loginPage;