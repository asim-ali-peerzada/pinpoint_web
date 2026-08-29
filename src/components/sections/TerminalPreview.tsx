import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

type View = 'output' | 'source';

interface RouteRow {
  key: string;
  p95: string;
  avg: string;
  queries: number;
  mem: string;
  status: 'Critical' | 'Healthy';
  dupes: string;
  pattern: string | null;
  execs: string | null;
  source: string | null;
}

const routes: RouteRow[] = [
  {
    key: 'api.orders.index',
    p95: '1.42s',
    avg: '890ms',
    queries: 42,
    mem: '12.4 MB',
    status: 'Critical',
    dupes: '14×',
    pattern: 'select * from users where id = ?',
    execs: 'Executed 14×',
    source: 'OrderController.php:84',
  },
  {
    key: 'api.orders.show',
    p95: '210ms',
    avg: '140ms',
    queries: 8,
    mem: '6.1 MB',
    status: 'Healthy',
    dupes: '—',
    pattern: null,
    execs: null,
    source: null,
  },
];

export default function TerminalPreview() {
  const [view, setView] = useState<View>('output');
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-brand-border bg-brand-card shadow-lg shadow-black/30">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-[3px] bg-brand-accent"></span>
          <span className="font-semibold text-white">Pinpoint</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">Diagnostics</span>
        </div>
        <div className="flex items-center gap-4">
          {(['output', 'source'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`border-b-2 pb-0.5 text-[13px] transition-colors ${
                view === v
                  ? 'border-brand-accent text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {v === 'output' ? 'Output' : 'Source'}
            </button>
          ))}
        </div>
      </div>

      {view === 'output' ? (
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[13px] text-gray-300">
            <span className="text-brand-accent">$</span>
            <span>php artisan pinpoint:report</span>
          </div>

          {/* Route table */}
          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="grid grid-cols-[minmax(0,1.8fr)_85px_85px_120px_70px] sm:grid-cols-[minmax(0,2fr)_95px_95px_130px_75px] items-center gap-4 sm:gap-6 px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                <div className="text-left">Route</div>
                <div className="w-full text-right justify-self-end">P95</div>
                <div className="w-full text-right justify-self-end">Avg</div>
                <div className="w-full text-center justify-self-center">Status</div>
                <div className="w-full text-right justify-self-end">N+1</div>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {routes.map((r, i) => {
                  const critical = r.status === 'Critical';
                  const expanded = open === i;
                  const hasDetails = Boolean(r.pattern);
                  return (
                    <React.Fragment key={r.key}>
                      <button
                        onClick={() => hasDetails && setOpen(expanded ? null : i)}
                        className={`block w-full rounded-md text-left transition-colors ${
                          hasDetails
                            ? expanded
                              ? 'bg-white/[0.03]'
                              : 'hover:bg-white/[0.02] cursor-pointer'
                            : 'cursor-default'
                        }`}
                      >
                        <div className="grid grid-cols-[minmax(0,1.8fr)_85px_85px_120px_70px] sm:grid-cols-[minmax(0,2fr)_95px_95px_130px_75px] items-center gap-4 sm:gap-6 px-3 py-2.5">
                          <div className="flex min-w-0 items-center gap-1.5 font-mono text-sm font-medium text-white text-left">
                            <span className="truncate">{r.key}</span>
                            {hasDetails && (
                              <ChevronDown
                                className={`h-3.5 w-3.5 -mt-0.5 shrink-0 text-gray-600 transition-transform duration-200 ${
                                  expanded ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </div>
                          <div className={`w-full text-right justify-self-end font-mono text-[13px] tabular-nums ${critical ? 'font-medium text-red-300' : 'text-gray-300'}`}>
                            {r.p95}
                          </div>
                          <div className="w-full text-right justify-self-end font-mono text-[13px] tabular-nums text-gray-400">
                            {r.avg}
                          </div>
                          <div className="flex w-full items-center justify-center gap-1.5 font-mono text-[13px] justify-self-center text-center">
                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${critical ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                            <span className={critical ? 'font-medium text-red-300' : 'text-emerald-400'}>{r.status}</span>
                          </div>
                          <div className={`w-full text-right justify-self-end font-mono text-[13px] tabular-nums ${critical ? 'font-medium text-red-300' : 'text-gray-500'}`}>
                            {r.dupes}
                          </div>
                        </div>
                      </button>

                    {expanded && r.pattern && (
                      <div className="border-t border-white/[0.05] bg-black/30 px-4 py-4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {(
                            [
                              ['P95', r.p95],
                              ['Avg', r.avg],
                              ['Queries', String(r.queries)],
                              ['Memory', r.mem],
                            ] as [string, string][]
                          ).map(([label, value]) => (
                            <div key={label}>
                              <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
                              <p className="mt-0.5 font-mono text-sm tabular-nums text-white">{value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <p className="text-[11px] uppercase tracking-wider text-gray-500">Query pattern</p>
                          <pre className="mt-1.5 overflow-x-auto rounded-md border border-white/[0.06] bg-black/40 p-2.5 font-mono text-xs text-gray-300">{r.pattern}</pre>
                          <p className="mt-1.5 text-xs text-gray-500">
                            <span className="font-mono text-gray-300">{r.dupes}</span> {r.execs}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-500">Source</p>
                            <p className="font-mono text-xs text-gray-200">{r.source}</p>
                          </div>
                          <button
                            onClick={() => setView('source')}
                            className="flex items-center gap-1 text-xs text-brand-accent hover:underline"
                          >
                            View source <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-xs">
            <span className="font-mono text-brand-accent">app/Http/Controllers/OrderController.php:84</span>
            <span className="font-medium text-emerald-400">jump target resolved</span>
          </div>

          <div className="mt-3 space-y-1 rounded-lg border border-white/[0.06] bg-black/40 p-4 font-mono text-xs leading-relaxed">
            <div className="text-gray-500">// Offending controller action</div>
            <div className="text-gray-400">
              <span className="text-indigo-400">public function</span> <span className="text-sky-400">index</span>()
            </div>
            <div className="text-gray-400">{'{'}</div>
            <div className="border-l-2 border-brand-accent bg-red-500/10 px-3 py-1 text-rose-200">
              <span className="mr-4 text-gray-500">84</span>
              $orders = Order::where('status', 'pending')-&gt;get();{' '}
              <span className="font-semibold text-red-300">// ⚠️ N+1: items relation</span>
            </div>
            <div className="text-gray-400">
              <span className="mr-4 text-gray-500">85</span> return view('orders.index', compact('orders'));
            </div>
            <div className="text-gray-400">{'}'}</div>
          </div>

          <div className="mt-3 space-y-1 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3.5 text-xs">
            <p className="font-semibold text-emerald-400">Suggested fix</p>
            <p className="font-mono text-gray-300">
              Order::with('items.product')-&gt;where('status', 'pending')-&gt;get();
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
