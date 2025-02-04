import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/auth/passwordEye.tsx";
import { signInWithGoogle, signInWithGithub } from "../../firebase/auth";  // Google & GitHub Import

interface AuthFormProps {
    title: string;
    buttonText: string;
    onSubmit: (email: string, password: string) => Promise<void>;
    linkText: string;
    linkTo: string;
}

const AuthForm = ({ title, buttonText, onSubmit, linkText, linkTo }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await onSubmit(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
        setIsSubmitting(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await signInWithGithub();
            navigate("/");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <main className="w-full h-screen flex self-center place-content-center place-items-center">
            <div>
                <h3>{title}</h3>
                <Form className="w-full max-w-xs" validationBehavior="native" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Input
                        isRequired
                        className="max-w-xs"
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                )}
                            </button>
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit"
                            disabled={isSubmitting}
                            color="primary">{isSubmitting ? 'Loading...' : buttonText}
                    </Button>
                </Form>

                {/* 🔹 Google & GitHub Login Buttons */}
                <div className="flex flex-col space-y-3 mt-4">
                    <Button
                        onPress={handleGoogleSignIn}
                        color="danger"
                        className="w-full">
                        Sign in with Google
                    </Button>
                    <Button
                        onPress={handleGithubSignIn}
                        color="default"
                        className="w-full">
                        Sign in with GitHub
                    </Button>
                </div>

                <p className="text-center text-sm mt-4">
                    <Link to={linkTo} className="hover:underline font-bold">
                        {linkText}
                    </Link>
                </p>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            </div>
        </main>
    );
};

export default AuthForm;
