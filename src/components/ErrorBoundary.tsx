import React from 'react';

interface State { failed: boolean }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State { return { failed: true }; }

  render() {
    if (!this.state.failed) return this.props.children;
    return <main role="alert" className="min-h-screen bg-[#fcfaf7] dark:bg-[#0b0f19] p-6 flex items-center justify-center">
      <div className="max-w-md rounded-3xl border border-amber-300 bg-white dark:bg-slate-900 p-8 text-center shadow-xl">
        <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Kaca durung bisa dibukak</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Coba muat maneh kaca iki. Data pasinaonmu tetep ana ing browser iki.</p>
        <button type="button" onClick={() => window.location.reload()} className="mt-5 min-h-11 rounded-xl bg-emerald-600 px-5 text-white font-bold">Muat maneh</button>
      </div>
    </main>;
  }
}
