import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 800);
  };

  const handleDemoLogin = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onSuccess('trader@tradingview.demo');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#131722] border border-[#2a2e39] rounded-2xl overflow-hidden shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white p-1 cursor-pointer"
        >
          ✕
        </button>

        {/* Brand Monogram */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <svg className="h-6 w-auto text-white" fill="currentColor" viewBox="0 0 36 28">
              <path d="M14 2H2V9.5H14V2Z" />
              <path d="M8 9.5H2V26H8V9.5Z" />
              <circle cx="21" cy="6" r="4.2" />
              <path d="M34 2L24.5 26H18.5L28 2H34Z" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-white text-center">Where the world does markets</h2>
        <p className="text-xs text-zinc-400 text-center mt-1 mb-6">
          Log in or create your free account in seconds.
        </p>

        {/* Quick OAuth Simulations */}
        <div className="space-y-2.5 mb-5">
          <button
            onClick={handleDemoLogin}
            disabled={isSubmitted}
            className="w-full py-2.5 px-4 bg-white hover:bg-zinc-100 text-black font-semibold text-xs rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer shadow"
          >
            {/* Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={handleDemoLogin}
            disabled={isSubmitted}
            className="w-full py-2.5 px-4 bg-[#1e222d] hover:bg-[#2a2e39] text-white font-semibold text-xs rounded-xl border border-zinc-700 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>⚡ Quick Demo Trader Login</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-zinc-800 w-full" />
          <span className="bg-[#131722] px-2 text-[10px] uppercase font-bold text-zinc-500 absolute">
            or with email
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Email address</label>
            <input
              type="email"
              required
              placeholder="trader@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitted}
            className="w-full py-3 get-started-gradient text-white font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition mt-2 cursor-pointer"
          >
            {isSubmitted ? 'Signing in...' : 'Sign in to TradingView'}
          </button>
        </form>

        <p className="text-[10px] text-zinc-500 text-center mt-4">
          By signing in, you agree to our Terms of Use and Privacy Policy. $0 forever, no credit card required.
        </p>
      </div>
    </div>
  );
};
