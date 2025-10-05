import React, { useState, useRef } from 'react';
import Icon from './Icon';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess();
    };

    return (
        <div className="flex min-h-screen flex-col justify-center bg-slate-900 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center text-sky-400">
                    <Icon icon="robot" className="h-12 w-auto" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Or{' '}
                    <button onClick={onNavigateToSignup} className="font-medium text-sky-400 hover:text-sky-300">
                        create a new account
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div 
                    ref={cardRef} 
                    onMouseMove={handleMouseMove} 
                    className="glow-card py-8 px-4 shadow-xl rounded-lg sm:px-10"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input block w-full rounded-md py-2 px-3 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input block w-full rounded-md py-2 px-3 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-sky-400 hover:text-sky-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gradient-to-br from-sky-500 to-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;