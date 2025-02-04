import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/auth/passwordEye.tsx";
import { signInWithGoogle, signInWithGithub } from "../../firebase/auth";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import { Divider } from "@heroui/divider";
import "./signForm.css"

interface AuthFormProps {
    title: string;
    buttonText: string;
    onSubmit: (email: string, password: string) => Promise<void>;
    linkText: string;
    linkTo: string;
}

const AuthForm = ({buttonText, onSubmit, linkText, linkTo }: AuthFormProps) => {
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
        <main className="flex items-center justify-center min-h-screen  px-4">
            <div className={"form"}>
                <Form validationBehavior="native" onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        className="relative"
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
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        className="w-full"
                    >
                        {isSubmitting ? 'Loading...' : buttonText}
                    </Button>
                </Form>

                {/* 🔹 Divider mit Abstand */}
                <div className="flex items-center my-6">
                    <Divider className="flex-grow"/>
                </div>

                {/* 🔹 Google & GitHub Login mit Icons */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="p-3 rounded-full border border-gray-300 hover:shadow-md transition duration-300"
                        aria-label="Sign in with Google"
                    >
                        <FcGoogle size={28} />
                    </button>
                    <button
                        onClick={handleGithubSignIn}
                        className="p-3 rounded-full border border-gray-300 hover:shadow-md transition duration-300"
                        aria-label="Sign in with GitHub"
                    >
                        <FaGithub size={28} />
                    </button>
                </div>

                <p>
                    <Link to={linkTo} className="hover:underline font-bold">
                        {linkText}
                    </Link>
                </p>

                {error && <p>{error}</p>}
            </div>
        </main>
    );
};

export default AuthForm;
