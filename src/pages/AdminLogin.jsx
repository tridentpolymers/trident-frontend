import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function AdminLogin() {
  const { user, login, checking } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "admin@tridententerprise.com", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (checking) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      await login(form.email, form.password);
      nav("/admin");
    } catch (e) {
      const detail = e.response?.data?.detail;
      const msg = typeof detail === "string" ? detail : "Login failed";
      setErr(msg);
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10"><Logo /></div>
        <div className="bg-white border border-slate-200 p-8 shadow-sm">
          <h1 className="text-2xl font-display font-semibold text-slate-900 mb-2">Admin Sign-In</h1>
          <p className="text-sm text-slate-500 mb-8">Manage Trident Enterprise content & inquiries.</p>

          {err && <div className="mb-5 p-3 bg-red-50 border border-red-200 text-sm text-red-800" data-testid="admin-login-error">{err}</div>}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="input-field pl-10" data-testid="admin-email-input" />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="input-field pl-10" data-testid="admin-password-input" />
              </div>
            </div>
            <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-50" data-testid="admin-login-btn">
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-6 text-center">Default: admin@tridententerprise.com / Admin@123</p>
        </div>
      </div>
    </div>
  );
}
