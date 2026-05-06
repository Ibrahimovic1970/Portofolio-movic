import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', color: 'var(--text-primary)', textAlign: 'center', padding: '24px' }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '16px', color: '#ef4444' }}>500</h1>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Terjadi Kesalahan</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '500px' }}>Maaf, terjadi error tidak terduga. Silakan refresh halaman.</p>
                    <button onClick={() => window.location.reload()} className="btn-primary"><span>Refresh Halaman</span></button>
                </div>
            );
        }
        return this.props.children;
    }
}