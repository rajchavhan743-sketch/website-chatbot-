import React from 'react';
import Icon from './Icon';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToLogin, onNavigateToSignup }) => {
  return (
    <div className="relative isolate overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <Icon icon="robot" className="w-8 h-8 text-sky-400" />
              SiteBot AI
          </div>
          <div>
            <button onClick={onNavigateToLogin} className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">
              Log In
            </button>
          </div>
        </nav>
      </header>

      <div 
        className="absolute inset-0 -z-10" 
        style={{ 
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%,rgba(56, 189, 248, 0.15),hsla(0,0%,100%,0))'
        }}
      ></div>

      <div className="relative z-10 text-center px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-slate-300 ring-1 ring-white/20 hover:ring-white/30 transition-all">
              Announcing our new platform.{' '}
              <a href="#" className="font-semibold text-sky-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-gradient">
            Add an AI Chatbot to Your Website in Minutes
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Train a custom AI chatbot on your own data and embed it on your website. No coding required. Improve customer support and engagement instantly.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onNavigateToSignup}
              className="rounded-md bg-gradient-to-br from-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-opacity duration-200"
            >
              Get Started for Free
            </button>
            <a href="#" className="text-sm font-semibold leading-6 text-white group">
              Live demo <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
       <footer className="absolute bottom-4 text-center text-slate-500 text-sm w-full">
            <p>&copy; {new Date().getFullYear()} SiteBot AI. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default LandingPage;