# Arcade Dental ERP

Sistem web **ERP klinik gigi** dengan halaman profil klinik (landing), dashboard operasional, manajemen pasien & janji temu, billing, inventori, laporan analitik (Chart.js), autentikasi berbasis peran, dukungan **Bahasa Indonesia / English**, dan mode terang/gelap.

> Demo project — data disimpan di `localStorage` browser (bukan database server).

---

## Daftar isi

- [Fitur utama](#fitur-utama)
- [Tech stack](#tech-stack)
- [Persyaratan](#persyaratan)
- [Instalasi & menjalankan](#instalasi--menjalankan)
- [Variabel lingkungan](#variabel-lingkungan)
- [Akun demo & peran](#akun-demo--peran)
- [Alur bisnis klinik](#alur-bisnis-klinik)
- [Halaman & rute](#halaman--rute)
- [Bahasa & tema](#bahasa--tema)
- [SEO & performa](#seo--performa)
- [Struktur folder](#struktur-folder)
- [Skrip npm](#skrip-npm)
- [Dokumentasi pengguna](#dokumentasi-pengguna)
- [Build production](#build-production)

---

## Fitur utama

| Area | Keterangan |
|------|------------|
| **Landing page** | Hero, tentang, layanan, tim dokter, kontak — bilingual (ID/EN) |
| **Login** | Email + password wajib sesuai akun demo; toast error jika gagal |
| **Dashboard** | Statistik, flowchart alur pasien, grafik Chart.js, janji terbaru |
| **CRUD** | Pasien, janji temu, perawatan, dokter, inventori, billing (invoice) |
| **Laporan** | Pendapatan per layanan, pasien per gender, ringkasan inventori |
| **Notifikasi** | Janji hari ini, stok rendah, tagihan belum lunas (sesuai peran) |
| **Role-based access** | Super Admin, Admin, Dokter — menu & halaman dibatasi |
| **Konfirmasi** | Hapus data & reset via modal (bukan `alert` browser) |
| **Persistensi** | Data klinik, auth, tema, bahasa, notifikasi dibaca → `localStorage` |

---

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Charts:** Chart.js 4 + react-chartjs-2
- **Icons:** Lucide React
- **Bahasa:** i18n custom (`lib/i18n/`)
- **Gambar:** `next/image` + Unsplash

---

## Persyaratan

- Node.js 20+
- npm (atau pnpm / yarn)

---

## Instalasi & menjalankan

```bash
# Clone / masuk ke folder project
cd dental-clinic

# Instal dependensi
npm install

# Salin env (opsional, untuk SEO production)
copy .env.example .env.local

# Mode development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

```bash
# Build production
npm run build
npm start
```

---

## Variabel lingkungan

Buat file `.env.local` (lihat `.env.example`):

| Variabel | Contoh | Keterangan |
|----------|--------|------------|
| `NEXT_PUBLIC_SITE_URL` | `https://www.arcadedental.com` | URL publik untuk canonical, sitemap, Open Graph |

Jika tidak di-set, default `http://localhost:3000`.

---

## Akun demo & peran

Login hanya berhasil dengan kombinasi email & password berikut.

| Peran | Email | Password | Akses |
|-------|-------|----------|--------|
| **Super Admin** | `superadmin@arcadedental.com` | `super123` | Semua modul + **Pengaturan** & reset data |
| **Admin** | `admin@arcadedental.com` | `admin123` | Operasional penuh (tanpa pengaturan sistem) |
| **Dokter** | `dokter@arcadedental.com` | `dokter123` | Dashboard, janji temu, pasien, perawatan |

### Matriks menu dashboard

| Menu | Super Admin | Admin | Dokter |
|------|:-----------:|:-----:|:------:|
| Dashboard | ✅ | ✅ | ✅* |
| Janji Temu | ✅ | ✅ | ✅ |
| Pasien | ✅ | ✅ | ✅ |
| Perawatan | ✅ | ✅ | ✅ |
| Dokter & Staff | ✅ | ✅ | ❌ |
| Inventori | ✅ | ✅ | ❌ |
| Billing | ✅ | ✅ | ❌ |
| Laporan | ✅ | ✅ | ❌ |
| Pengaturan | ✅ | ❌ | ❌ |

\*Dokter: dashboard tanpa kartu pendapatan/stok & tanpa grafik pendapatan bulanan.

Akses halaman terlarang → redirect ke dashboard + pesan toast.

---

## Alur bisnis klinik

```
Registrasi Pasien → Janji Temu → Perawatan → Billing → Selesai
```

1. **Pasien** — daftarkan pasien baru (`/dashboard/patients`).
2. **Janji temu** — jadwalkan kunjungan, pilih dokter & layanan (`/dashboard/appointments`).
3. **Perawatan** — perbarui status janji (Menunggu → Diproses → Selesai).
4. **Billing** — buat invoice & catat pembayaran (`/dashboard/billing`).
5. **Laporan** — pantau performa klinik (`/dashboard/reports`).

Data mock awal ada di `data/initial-data.json` dan bisa di-reset oleh Super Admin di Pengaturan.

---

## Halaman & rute

| Rute | Publik | Keterangan |
|------|--------|------------|
| `/` | ✅ | Landing page klinik |
| `/login` | ✅ | Login staf (noindex SEO) |
| `/dashboard` | 🔒 | Dashboard utama |
| `/dashboard/patients` | 🔒 | CRUD pasien |
| `/dashboard/appointments` | 🔒 | CRUD janji temu |
| `/dashboard/treatments` | 🔒 | Master layanan |
| `/dashboard/doctors` | 🔒 | Data dokter |
| `/dashboard/inventory` | 🔒 | Stok bahan |
| `/dashboard/billing` | 🔒 | Invoice |
| `/dashboard/reports` | 🔒 | Laporan |
| `/dashboard/settings` | 🔒 | Super Admin only |
| `/robots.txt` | ✅ | Aturan crawler |
| `/sitemap.xml` | ✅ | Sitemap halaman publik |

---

## Bahasa & tema

- **Bahasa:** ikon globe (🌐) di navbar / header dashboard → **Bahasa Indonesia** atau **English**. Pilihan disimpan di `localStorage` (`arcade_dental_locale`).
- **Tema:** terang / gelap / ikuti sistem — ikon matahari/bulan (`arcade_dental_theme`).
- Halaman **login** mengikuti bahasa dari navbar (tanpa toggle bahasa di halaman login).

---

## SEO & performa

- Metadata lengkap (title, description, Open Graph, Twitter Card)
- JSON-LD Schema.org (`DentalClinic`, `WebSite`)
- `robots.txt` & `sitemap.xml`
- Dashboard/login: `noindex`
- Optimasi gambar AVIF/WebP, lazy load chart, `optimizePackageImports`

Detail konfigurasi: `lib/site.ts`, `lib/metadata.ts`, `next.config.ts`.

---

## Struktur folder

```
dental-clinic/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing (SEO + JSON-LD)
│   ├── login/
│   ├── dashboard/          # Modul ERP
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── landing/            # Hero, About, Services, ...
│   ├── dashboard/          # Sidebar, charts, CRUD table, modal
│   ├── providers/          # AppProviders
│   └── seo/                # JsonLd, SkipToContent
├── contexts/               # Auth, Data, Theme, Locale, Toast, Confirm
├── data/
│   └── initial-data.json   # Mock data default
├── lib/
│   ├── auth-users.ts       # Akun demo
│   ├── sidebar-access.ts   # RBAC per role
│   ├── i18n/               # Kamus ID & EN
│   ├── chart-analytics.ts
│   └── client-storage.ts   # Kunci localStorage
├── scripts/
│   └── generate-panduan-docx.py
├── public/
│   └── icon.svg
├── Panduan_Penggunaan_Arcade_Dental_ERP.docx
└── README.md
```

### Kunci localStorage

| Kunci | Isi |
|-------|-----|
| `arcade_dental_data` | Data klinik (pasien, janji, dll.) |
| `arcade_dental_auth` | User login |
| `arcade_dental_theme` | `light` / `dark` / `system` |
| `arcade_dental_locale` | `id` / `en` |
| `arcade_dental_notifications_read` | ID notifikasi yang sudah dibaca |

---

## Skrip npm

| Perintah | Fungsi |
|--------|--------|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm start` | Jalankan build |
| `npm run lint` | ESLint |

---

## Dokumentasi pengguna

Panduan alur bisnis untuk staf klinik (non-teknis):

- **Word:** `Panduan_Penggunaan_Arcade_Dental_ERP.docx` (di root project)
- **Generate ulang:**

  ```bash
  py scripts/generate-panduan-docx.py
  ```

---

## Build production

```bash
npm run build
npm start
```

Pastikan `NEXT_PUBLIC_SITE_URL` di-set ke domain production sebelum deploy agar SEO (canonical, sitemap, OG) benar.

---

## Lisensi & catatan

Project privat/demo untuk pembelajaran dan presentasi ERP klinik gigi. Bukan produk medis bersertifikasi — jangan digunakan untuk data pasien riil tanpa keamanan backend yang memadai.

---

**Arcade Dental ERP** · Next.js · Chart.js · i18n ID/EN
