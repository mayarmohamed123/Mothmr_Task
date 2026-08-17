'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';
import { register as apiRegister } from '@/lib/api/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import type { RegisterPayload } from '@/types/auth';

const ROLES = [
  { value: 'advertiser', labelAr: 'معلن', labelEn: 'Advertiser', emoji: '📢' },
  { value: 'influencer', labelAr: 'مؤثر', labelEn: 'Influencer', emoji: '⭐' },
] as const;

export default function RegisterPage() {
  const { login } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'advertiser' | 'influencer'>('advertiser');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setError('');
    setIsLoading(true);
    try {
      const payload: RegisterPayload = { name, email, password, role };
      const res = await apiRegister(payload);
      login(res.data.token, res.data.user);
      router.push('/ads');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : lang === 'ar'
          ? 'حدث خطأ أثناء إنشاء الحساب'
          : 'Failed to create account',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div
          className="rounded-3xl border border-border p-8 shadow-xl animate-fade-in-up"
          style={{ background: 'var(--card)' }}
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-bg-secondary border border-border p-2 shadow-sm">
              <Image
                src="/logo.svg"
                alt="Mothmer Logo"
                width={36}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-extrabold text-foreground">
              {lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}
            </h1>
            <p className="text-sm text-muted">
              {lang === 'ar' ? 'انضم إلى مثمر وابدأ رحلتك' : 'Join Mothmer and start your journey'}
            </p>
          </div>

          {/* Role selector */}
          <div className="flex gap-3 mb-6" role="group" aria-label={lang === 'ar' ? 'نوع الحساب' : 'Account type'}>
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                aria-pressed={role === r.value}
                className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-200
                  ${role === r.value
                    ? 'border-[#F97316] bg-[#F97316]/10 text-[#F97316]'
                    : 'border-border text-muted hover:border-[#F97316]/40'
                  }`}
              >
                <span className="text-2xl" aria-hidden="true">{r.emoji}</span>
                {lang === 'ar' ? r.labelAr : r.labelEn}
              </button>
            ))}
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-xl text-sm font-medium text-red-700 dark:text-red-300 animate-fade-in-up"
              style={{ background: '#dc262615', border: '1px solid #dc262630' }}
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'ar' ? 'الاسم' : 'Name'}
              </label>
              <div className="relative">
                <User className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                  required
                  autoComplete="name"
                  className="w-full ps-10 pe-4 py-3 rounded-xl border border-border bg-bg-secondary
                    text-sm text-foreground placeholder:text-muted
                    focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
                <input
                  id="reg-email"
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
              <label htmlFor="reg-password" className="block text-sm font-medium text-foreground mb-1.5">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  autoComplete="new-password"
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
              leftIcon={!isLoading ? <UserPlus className="w-4 h-4" /> : undefined}
              className="w-full mt-2"
            >
              {lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}
            </Button>
          </form>

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
            {lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
            <Link href="/login" className="font-semibold text-[#F97316] hover:underline">
              {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
