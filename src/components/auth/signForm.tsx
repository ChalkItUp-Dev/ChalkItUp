import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';
import { EyeFilledIcon, EyeSlashFilledIcon } from './passwordEye.tsx';
import { signInWithGoogle, signInWithGithub } from '../../firebase/auth.ts';
import { Divider } from '@heroui/divider';
import './signForm.css';
import { UserCredential } from 'firebase/auth';
import { fetchPlayer, savePlayer } from '../../service/api.service.ts'; // Importieren

interface AuthFormProps {
    buttonText: string;
    onSubmit: (email: string, password: string) => Promise<UserCredential>;
    linkText: string;
    linkTo: string;
}

const AuthForm = ({
    buttonText,
    onSubmit,
    linkText,
    linkTo,
}: AuthFormProps) => {
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
            const user = await signInWithGoogle();
            try {
                // Prüfen, ob der Spieler bereits existiert
                await fetchPlayer(user.uid);
            } catch (e) {
                // Wenn nicht, neuen Spieler erstellen
                await savePlayer(
                    user.uid,
                    user.displayName || user.email!,
                    user.email!
                );
            }
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const user = await signInWithGithub();
            try {
                // Prüfen, ob der Spieler bereits existiert
                await fetchPlayer(user.uid);
            } catch (e) {
                // Wenn nicht, neuen Spieler erstellen
                await savePlayer(
                    user.uid,
                    user.displayName || user.email!,
                    user.email!
                );
            }
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <main className="main">
            <div className={'form'}>
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
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type={isVisible ? 'text' : 'password'}
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
                <p className={'margin'}>
                    <Link to={linkTo} className="hover:underline">
                        {linkText}
                    </Link>
                </p>
                {/* 🔹 Divider mit Abstand */}
                <div className="flex items-center my-6">
                    <Divider className="flex-grow" />
                </div>
                <p className={'margin'}>
                    Or sign in with your auth provider below.
                </p>
                {/* 🔹 Google & GitHub Login mit Icons */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="transition duration-300"
                        aria-label="Sign in with Google"
                    >
                        <i className="fa-brands fa-google"></i>
                    </button>
                    <button
                        onClick={handleGithubSignIn}
                        className="transition duration-300"
                        aria-label="Sign in with GitHub"
                    >
                        <i className="fa-brands fa-github"></i>
                    </button>
                </div>

                {error && <p>{error}</p>}
            </div>
        </main>
    );
};

export default AuthForm;
