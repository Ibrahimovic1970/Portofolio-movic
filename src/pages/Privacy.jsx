export default function Privacy() {
    return (
        <div className="container" style={{ maxWidth: '800px', margin: '100px auto', padding: '0 24px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 24 }}>Privacy Policy</h1>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>
                    <strong>1. Data yang Kami Kumpulkan</strong><br />
                    Kami hanya mengumpulkan data yang diperlukan untuk menjalankan website ini, termasuk:
                    - Informasi kontak yang Anda berikan melalui form
                    - Data analitik anonim (page views, referrer)
                    - Cookie preferences Anda
                </p>
                <p style={{ marginBottom: 16 }}>
                    <strong>2. Penggunaan Data</strong><br />
                    Data Anda digunakan untuk:
                    - Merespons pertanyaan dan permintaan Anda
                    - Meningkatkan pengalaman website
                    - Mematuhi kewajiban hukum
                </p>
                <p style={{ marginBottom: 16 }}>
                    <strong>3. Hak Anda</strong><br />
                    Anda berhak untuk:
                    - Mengakses data pribadi Anda
                    - Meminta koreksi atau penghapusan data
                    - Menolak pemrosesan data untuk marketing
                </p>
                <p>
                    <strong>4. Kontak</strong><br />
                    Untuk pertanyaan tentang privacy, hubungi: privacy@ahmadibrahim.dev
                </p>
            </div>
        </div>
    );
}