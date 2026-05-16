import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { LayoutDashboard, FileEdit, Boxes, MessageSquareQuote, HelpCircle, Settings, Inbox, LogOut, Save, Trash2, ExternalLink, AlertCircle, Mail, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import Logo from "../components/Logo";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "content", label: "Home Content", icon: FileEdit },
  { id: "products", label: "Products", icon: Boxes },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
];

function JsonEditor({ name, label }) {
  const [text, setText] = useState("");
  const [original, setOriginal] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true); setErr(""); setMsg(null);
    api.get(`/content/${name}`).then((r) => {
      const formatted = JSON.stringify(r.data, null, 2);
      setText(formatted); setOriginal(formatted);
    }).catch(() => setErr("Failed to load")).finally(() => setLoading(false));
  }, [name]);

  const save = async () => {
    setErr(""); setMsg(null);
    let parsed;
    try { parsed = JSON.parse(text); }
    catch (e) { setErr("Invalid JSON: " + e.message); return; }
    setSaving(true);
    try {
      await api.put(`/content/${name}`, { data: parsed });
      setOriginal(text);
      setMsg("Saved successfully");
      setTimeout(() => setMsg(null), 2500);
    } catch (e) {
      setErr(e.response?.data?.detail || "Save failed");
    } finally { setSaving(false); }
  };

  const dirty = text !== original;

  if (loading) return <div className="text-slate-500">Loading…</div>;

  return (
    <div data-testid={`editor-${name}`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-display font-semibold text-slate-900">{label}</h2>
          <p className="text-xs text-slate-500 mt-1">Edit the JSON below. Save to update <code className="bg-slate-100 px-1.5 py-0.5">{name}.json</code> on the server.</p>
        </div>
        <div className="flex items-center gap-3">
          {dirty && <span className="text-xs text-amber-600 font-semibold">Unsaved changes</span>}
          <button onClick={save} disabled={saving || !dirty} className="btn-primary disabled:opacity-50" data-testid={`save-${name}-btn`}>
            <Save size={16} /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {msg && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-sm text-green-800">{msg}</div>}
      {err && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-sm text-red-800 flex gap-2"><AlertCircle size={16} /> {err}</div>}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full font-mono text-xs bg-slate-50 border border-slate-200 p-4 min-h-[600px] focus:outline-none focus:border-blue-700"
        spellCheck={false}
        data-testid={`textarea-${name}`}
      />
    </div>
  );
}

function Inquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/inquiries").then((r) => setItems(r.data)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    await api.delete(`/inquiries/${id}`);
    load();
  };

  return (
    <div data-testid="inquiries-tab">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-display font-semibold text-slate-900">Customer Inquiries</h2>
          <p className="text-xs text-slate-500 mt-1">{items.length} total submissions</p>
        </div>
      </div>
      {loading ? <div>Loading…</div> : items.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 p-12 text-center">
          <Inbox className="text-slate-300 mx-auto mb-4" size={40} />
          <p className="text-slate-500">No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((q) => (
            <div key={q.id} className="bg-white border border-slate-200 p-5" data-testid={`inquiry-${q.id}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-display font-semibold text-slate-900">{q.name} {q.company && <span className="text-slate-500 font-normal">· {q.company}</span>}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
                    <a href={`mailto:${q.email}`} className="flex items-center gap-1 hover:text-blue-700"><Mail size={12} />{q.email}</a>
                    {q.phone && <a href={`tel:${q.phone}`} className="flex items-center gap-1 hover:text-blue-700"><Phone size={12} />{q.phone}</a>}
                    {q.product && <span className="bg-blue-50 text-blue-700 px-2 py-0.5">{q.product}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-slate-400">{new Date(q.created_at).toLocaleString()}</span>
                  <button onClick={() => remove(q.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition" data-testid={`delete-inquiry-${q.id}`}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border-l-2 border-blue-700">{q.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Overview() {
  const [counts, setCounts] = useState({ products: 0, testimonials: 0, faq: 0, inquiries: 0 });
  useEffect(() => {
    Promise.all([
      api.get("/content/products"),
      api.get("/content/testimonials"),
      api.get("/content/faq"),
      api.get("/inquiries"),
    ]).then(([p, t, f, i]) => setCounts({ products: p.data.length, testimonials: t.data.length, faq: f.data.length, inquiries: i.data.length })).catch(() => {});
  }, []);
  const cards = [
    { label: "Products", value: counts.products },
    { label: "Testimonials", value: counts.testimonials },
    { label: "FAQ Items", value: counts.faq },
    { label: "Inquiries", value: counts.inquiries },
  ];
  return (
    <div data-testid="overview-tab">
      <h2 className="text-xl font-display font-semibold text-slate-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-slate-200 p-5">
            <div className="text-3xl font-display font-bold text-slate-900">{c.value}</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 mt-2">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 border border-blue-200 p-6">
        <h3 className="font-display font-semibold text-slate-900 mb-2">Welcome back</h3>
        <p className="text-sm text-slate-700 leading-relaxed">All website content is stored as JSON files on the backend. Use the navigation tabs to edit any section. Changes are reflected on the public site immediately.</p>
        <Link to="/" target="_blank" className="text-sm text-blue-700 font-semibold inline-flex items-center gap-1 mt-3 hover:text-blue-900">View public site <ExternalLink size={12} /></Link>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, checking, logout } = useAuth();
  const [tab, setTab] = useState("overview");

  if (checking) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-shell flex" data-testid="admin-dashboard">
      <aside className="admin-sidebar w-64 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Logo variant="light" />
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.id} className={`admin-nav-item ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)} data-testid={`admin-tab-${t.id}`}>
                <Icon size={16} /> {t.label}
              </div>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 mb-3">{user.email}</div>
          <button onClick={logout} className="admin-nav-item w-full" data-testid="admin-logout-btn">
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen overflow-x-auto">
        <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between">
          <Logo variant="light" />
          <select value={tab} onChange={(e) => setTab(e.target.value)} className="bg-slate-800 text-white px-3 py-2 text-sm">
            {TABS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div className="p-6 md:p-10 max-w-5xl">
          {tab === "overview" && <Overview />}
          {tab === "content" && <JsonEditor name="content" label="Home Page Content" />}
          {tab === "products" && <JsonEditor name="products" label="Products Catalog" />}
          {tab === "testimonials" && <JsonEditor name="testimonials" label="Testimonials" />}
          {tab === "faq" && <JsonEditor name="faq" label="Frequently Asked Questions" />}
          {tab === "settings" && <JsonEditor name="settings" label="Site Settings (Contact, Social, SEO)" />}
          {tab === "inquiries" && <Inquiries />}
        </div>
      </main>
    </div>
  );
}
