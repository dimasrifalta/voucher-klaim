## Shopee Voucher High-Precision Scheduler

Proyek kecil ini berisi skrip Node.js dan beberapa batch helper untuk mencoba menyimpan (save) voucher Shopee pada waktu yang sangat presisi (milidetik). Cocok untuk pengujian timing voucher yang rilis pada jam tertentu.

## Ringkasan
- Bahasa: Node.js (vanilla) + beberapa file batch (`.bat`) untuk helper di Windows
- Tujuan: Menjalankan request `save_voucher` tepat pada waktu target (high-precision)
- Platform utama: Windows (PowerShell / CMD)

## Persyaratan
- Node.js (v14+ direkomendasikan)
- Koneksi internet aktif
- Di Windows: disarankan menyinkronkan waktu sistem (ada skrip `sync_time.bat` / `sync_google_time.bat`)

## Struktur file (penting)
- `voucher_1_scheduler.js`, `voucher_2_scheduler.js`, `voucher_3_scheduler.js`, `voucher_4_scheduler.js` — scheduler Node.js untuk tiap voucher (entry point untuk tiap voucher)
- `voucher_*_scheduler.log` — log hasil eksekusi setiap script
- `test_custom_time.bat` — helper interaktif untuk mengetes scheduler pada waktu custom (menjalankan `node voucher_x_scheduler.js --once --time=...`)
- `sync_time.bat`, `sync_google_time.bat` — helper untuk sinkronisasi waktu Windows dengan time.google.com dan mendaftarkan scheduled task
- `shopee-save-voucher-*.http` — contoh HTTP request (template) untuk endpoint `POST /api/v2/voucher_wallet/save_voucher`
- `Pilok_12-08-2025.txt` — daftar voucher / metadata (contoh data yang digunakan)

## Cara pakai singkat (PowerShell)
1) Buka PowerShell di folder proyek:

```powershell
cd 'C:\Users\dimas\Downloads\Compressed\Shoppe Voucher'
```

2) Sinkronkan waktu sistem (opsional tapi sangat direkomendasikan):

```powershell
.\sync_google_time.bat
# atau
.\sync_time.bat
```

3) Menjalankan satu scheduler untuk testing sekali jalan pada waktu custom:

```powershell
# contoh: jalankan voucher 1 pada 11:59:59
node voucher_1_scheduler.js --once --time=11:59:59

# atau jalankan test singkat (jika tersedia flag --test di script)
node voucher_1_scheduler.js --test
```

4) Menjalankan beberapa voucher bersamaan (contoh lewat `test_custom_time.bat`):

```powershell
.\test_custom_time.bat
# Ikuti prompt untuk memasukkan waktu dan memilih voucher
```

5) Lihat log masing-masing voucher untuk hasil dan debug:

```powershell
Get-Content .\voucher_1_scheduler.log -Tail 100 -Wait
```

## Contoh penggunaan untuk automasi
- Untuk menjalankan script secara otomatis pada waktu tertentu, gunakan Task Scheduler Windows atau utilitas cron-like. Pastikan sistem waktu ter-sinkron.

## Catatan teknis singkat
- Skrip menggunakan HTTP(S) request ke endpoint internal Shopee (`/api/v2/voucher_wallet/save_voucher`). Sesuaikan header, cookie, dan payload sesuai akun/authorization Anda.
- Logging sederhana ditulis ke file `voucher_*_scheduler.log`.
- Banyak faktor (jitter jaringan, server-side validation, auth) dapat mempengaruhi hasil meskipun timing lokal sangat presisi.

## Troubleshooting
- Response error "Maaf, voucher ini belum dapat digunakan" — kemungkinan server belum membuka voucher atau server-side gating; pastikan waktu target benar dan server sudah aktif.
- Error auth / 401 / "Failed to authenticate" — periksa header Authorization / cookie dan pastikan token masih valid.
- Timing meleset ~> pastikan Windows time sinkron dengan NTP server (jalankan `sync_time.bat`).

## Pengembangan & kontribusi
- Perbaikan kecil: menambahkan validasi argumen CLI, memisahkan konfigurasi voucher ke file JSON, dan menambah unit test ringan.

## Lisensi
Proyek ini bebas digunakan pribadi; tambahkan lisensi jika ingin membagikan ke publik (mis. MIT).

---


Status: README ditambahkan ke root proyek.
