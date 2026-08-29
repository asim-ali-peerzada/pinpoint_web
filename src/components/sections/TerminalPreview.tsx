import React, { useState } from 'react';
import { Terminal, Code2, Check, ArrowRight, CornerDownRight } from 'lucide-react';

export default function TerminalPreview() {
  const [activeTab, setActiveTab] = useState<'cli' | 'ide'>('cli');

  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl shadow-black/80">
      {/* Window Controls Header */}
      <div className="bg-brand-card/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-xs font-mono text-gray-400 ml-2">pinpoint-diagnostic — zsh</span>
          </div>
          <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/5 text-xs font-mono">
            <button
              onClick={() => setActiveTab('cli')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-all ${activeTab === 'cli' ? 'bg-brand-accent text-white font-semibold shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Output</span>
            </button>
            <button
              onClick={() => setActiveTab('ide')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-all ${activeTab === 'ide' ? 'bg-brand-accent text-white font-semibold shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Jump-to-Code</span>
            </button>
          </div>
        </div>

        {/* Console Viewport */}
        <div className="p-6 font-mono text-sm overflow-x-auto min-h-[380px] bg-[#080B11]">
          {activeTab === 'cli' ? (
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <span className="text-emerald-400 mr-2">❯</span>
                <span className="text-gray-200">php artisan pinpoint:report</span>
              </div>

              {/* Styled CLI Table */}
              <div className="border border-white/10 rounded-lg overflow-hidden bg-black/40">
                <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs uppercase tracking-wider text-gray-400 border-b border-white/5 bg-white/[0.02]">
                  <div className="col-span-4 text-left">Route</div>
                  <div className="col-span-2 text-right">p95</div>
                  <div className="col-span-2 text-right">Avg</div>
                  <div className="col-span-2 text-center">Tier</div>
                  <div className="col-span-2 text-center">N+1?</div>
                </div>

                <div className="divide-y divide-white/5">
                  <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-white/[0.03] transition-colors cursor-pointer group" onClick={() => setActiveTab('ide')}>
                    <div className="col-span-4 font-semibold text-white flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2"></span>
                      api.orders.index
                    </div>
                    <div className="col-span-2 text-right text-rose-400 font-bold">1420<span className="text-gray-500 text-xs">ms</span></div>
                    <div className="col-span-2 text-right text-gray-300">890<span className="text-gray-500 text-xs">ms</span></div>
                    <div className="col-span-2 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">CRITICAL</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white animate-pulse">Yes (x14)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center text-gray-300">
                    <div className="col-span-4 text-gray-200 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                      api.orders.show
                    </div>
                    <div className="col-span-2 text-right text-emerald-400">210<span className="text-gray-500 text-xs">ms</span></div>
                    <div className="col-span-2 text-right text-gray-400">140<span className="text-gray-500 text-xs">ms</span></div>
                    <div className="col-span-2 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">GOOD</span>
                    </div>
                    <div className="col-span-2 text-center text-gray-600">No</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 flex items-center space-x-2">
                <CornerDownRight className="w-3.5 h-3.5 text-brand-accent" />
                <span>Click on any slow route to inspect query fingerprints and caller stack frame.</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-2">
                <span className="text-brand-accent">app/Http/Controllers/OrderController.php:42</span>
                <span className="text-emerald-400 flex items-center"><Check className="w-3 h-3 mr-1" /> Jump target resolved</span>
              </div>

              {/* Code Snippet with Suggestion */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 text-xs space-y-1">
                <div className="text-gray-500">// Offending Controller Action</div>
                <div className="text-gray-400"><span className="text-purple-400">public function</span> <span className="text-blue-400">index</span>()</div>
                <div className="text-gray-400">{'{'}</div>
                <div className="bg-rose-500/10 border-l-2 border-rose-500 px-3 py-1 text-rose-200">
                  <span className="text-gray-500 mr-4">42</span>
                  $orders = Order::where('status', 'pending')-&gt;get(); <span className="text-rose-400 font-bold">// ⚠️ N+1: items relation</span>
                </div>
                <div className="text-gray-400"><span className="text-gray-500 mr-4">43</span>  return view('orders.index', compact('orders'));</div>
                <div className="text-gray-400">{'}'}</div>
              </div>

              {/* Actionable Suggestion Box */}
              <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                <div className="font-bold flex items-center text-emerald-400">
                  <span>💡 Suggested Fix (Actionable Recommendation)</span>
                </div>
                <div className="font-mono text-gray-300">
                  Order::with('items.product')-&gt;where('status', 'pending')-&gt;get();
                </div>
              </div>

              <button
                onClick={() => setActiveTab('cli')}
                className="flex items-center gap-1.5 text-xs text-brand-accent hover:underline"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
