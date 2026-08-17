'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { login as apiLogin } from '@/lib/api/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError('');
    setIsLoading(true);
    try {
      const res = await apiLogin({ email, password });
      login(res.data.token, res.data.user);
      router.push('/ads');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : lang === 'ar'
          ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
          : 'Invalid email or password',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-3xl border border-border p-8 shadow-xl animate-fade-in-up"
          style={{ background: 'var(--card)' }}
        >
          {/* Logo mark */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-bg-secondary border border-border p-2 shadow-sm">
              <Image
                src="/logo.svg"
                alt="Mothmer Logo"
                width={36}
                height={32}
                style={{ width: 'auto', height: 'auto' }}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-extrabold text-foreground">
              {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </h1>
            <p className="text-sm text-muted">
              {lang === 'ar' ? 'مرحبًا بك مجددًا في مثمر' : 'Welcome back to Mothmer'}
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-xl text-sm font-medium text-red-700 dark:text-red-300 animate-fade-in-up"
              style={{ background: '#dc262615', borderColor: '#dc262630', border: '1px solid' }}
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoComplete="email"
                  className="w-full ps-10 pe-4 py-3 rounded-xl border border-border bg-bg-secondary
                    text-sm text-foreground placeholder:text-muted
                    focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full ps-10 pe-10 py-3 rounded-xl border border-border bg-bg-secondary
                    text-sm text-foreground placeholder:text-muted
                    focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              leftIcon={!isLoading ? <LogIn className="w-4 h-4" /> : undefined}
              className="w-full mt-2"
            >
              {lang === 'ar' ? 'دخول' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs text-muted">
                {lang === 'ar' ? 'أو' : 'or'}
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-muted">
            {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
            <Link
              href="/register"
              className="font-semibold text-[#F97316] hover:underline transition-colors"
            >
              {lang === 'ar' ? 'سجّل الآن' : 'Register'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
