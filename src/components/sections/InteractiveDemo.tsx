import React, { useState } from 'react';
import { Check, AlertTriangle, Terminal, Zap } from 'lucide-react';

type Tab = 'nplus1' | 'override' | 'drilldown';

export default function InteractiveDemo() {
  const [tab, setTab] = useState<Tab>('nplus1');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'nplus1', label: 'Eloquent N+1', icon: <AlertTriangle className="h-3.5 w-3.5" /> },
    { id: 'override', label: 'Export Override', icon: <Zap className="h-3.5 w-3.5" /> },
    { id: 'drilldown', label: 'CLI Drill-Down', icon: <Terminal className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="glass-panel rounded-2xl p-2">
      <div className="flex flex-wrap gap-1 border-b border-white/5 p-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              tab === t.id ? 'bg-brand-accent text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5 font-mono text-sm">
        {tab === 'nplus1' && <NPlusOne />}
        {tab === 'override' && <Override />}
        {tab === 'drilldown' && <DrillDown />}
      </div>
    </div>
  );
}

function NPlusOne() {
  const [analyzed, setAnalyzed] = useState(false);
  return (
    <div className="space-y-4">
      <div className="text-gray-400">// app/Http/Controllers/UserController.php</div>
      <pre className="rounded-lg bg-black/50 p-4 text-xs leading-relaxed text-gray-300">{`$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count(); // 💥 query per user
}`}</pre>
      <button
        onClick={() => setAnalyzed(true)}
        className="rounded-lg bg-brand-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-accent/90"
      >
        Analyze with Pinpoint
      </button>
      {analyzed && (
        <div className="animate-in space-y-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-xs">
          <div className="font-bold text-rose-400">⚠️ N+1 detected: User → posts (x100)</div>
          <div className="text-emerald-300">
            ✅ Suggested fix: <span className="text-white">User::with('posts')-&gt;get();</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Override() {
  return (
    <div className="space-y-3">
      <div className="text-gray-400">// config/pinpoint.php</div>
      <pre className="rounded-lg bg-black/50 p-4 text-xs leading-relaxed text-gray-300">{`'route_threshold_overrides' => [
    'exports.csv' => 5000, // skip CRITICAL alert fatigue
],`}</pre>
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-3 text-xs text-emerald-200">
        <Check className="h-4 w-4" />
        A 3000ms CSV export no longer falsely triggers a CRITICAL p95 alert.
      </div>
    </div>
  );
}

function DrillDown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-300">
        <span className="text-emerald-400">❯</span> php artisan pinpoint:report --route=api.orders
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:border-brand-accent/40"
      >
        {open ? '▾' : '▸'} Expand query fingerprint waterfall
      </button>
      {open && (
        <div className="space-y-1.5 rounded-lg bg-black/50 p-4 text-xs">
          {[
            ['SELECT * FROM orders', '1.2ms', 'good'],
            ['SELECT * FROM items WHERE order_id IN (...)', '0.4ms', 'good'],
            ['SELECT * FROM products (x14)', '38ms', 'bad'],
          ].map(([q, t, s]) => (
            <div key={q} className="flex items-center justify-between">
              <span className="text-gray-300">{q}</span>
              <span className={s === 'bad' ? 'text-rose-400' : 'text-emerald-400'}>{t}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
