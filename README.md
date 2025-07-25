# Panduan Lengkap - Shopee Voucher Auto Scheduler

## 📋 Deskripsi
Script untuk menjalankan request voucher Shopee secara otomatis tepat pada waktu yang ditentukan (default **20:00:00.000 WIB**) dengan presisi tinggi. Mendukung multiple vouchers, custom timing, dan berbagai mode eksekusi.

## ✨ Features Utama

✅ **Eksekusi Otomatis** - Berjalan tepat di jam 20:00:00.000 WIB  
✅ **Presisi Milidetik** - Timing yang sangat akurat (±1-3ms)  
✅ **3 Voucher Berbeda** - Scheduler terpisah untuk setiap voucher  
✅ **Custom Time Parameters** - Bisa ubah waktu eksekusi untuk testing  
✅ **Staggered Execution** - Delay 50ms antar voucher untuk menghindari collision  
✅ **Multiple Options** - Node.js, Python, PowerShell, Task Scheduler  
✅ **Auto Loop** - Mode harian untuk eksekusi berulang  
✅ **Error Handling** - Logging dan penanganan error yang lengkap  
✅ **Cross Platform** - Windows, Linux, macOS support

## 🎯 Format Custom Time

Semua scheduler mendukung 2 format waktu:
- **HH:MM:SS** - Contoh: `--time=14:30:15` (jam 14:30:15)  
- **HH:MM** - Contoh: `--time=14:30` (jam 14:30:00)

## 🎯 **Pilihan Implementasi**

### **🔥 MULTIPLE VOUCHERS (3 Request Sekaligus)**

#### **1. Master Scheduler (Node.js - TERBAIK)**
**File:** `master_scheduler.js`

```bash
# Jalankan 3 voucher dengan staggered timing
node master_scheduler.js --once

# Test semua voucher sekarang
node master_scheduler.js --test
```

**Fitur:**
- ✅ Presisi tertinggi (±1-3ms)
- ✅ Staggered timing untuk menghindari collision
- ✅ Monitoring terpusat
- ✅ Error handling per voucher

**Timing Detail:**
- Voucher 1: `20:00:00.000 WIB`
- Voucher 2: `20:00:00.050 WIB` (+50ms)
- Voucher 3: `20:00:00.100 WIB` (+100ms)

#### **2. Individual Schedulers (Node.js)**
**Files:** `voucher_1_scheduler.js`, `voucher_2_scheduler.js`, `voucher_3_scheduler.js`

```bash
# Jalankan individual dengan custom time
node voucher_1_scheduler.js --once --time=14:30:15
node voucher_2_scheduler.js --once --time=14:30:20  
node voucher_3_scheduler.js --once --time=14:30:25

# Jalankan dengan default time (20:00:00)
node voucher_1_scheduler.js --once
node voucher_2_scheduler.js --once
node voucher_3_scheduler.js --once

# Atau jalankan semua sekaligus
run_all_vouchers.bat

# Test dengan custom time
test_custom_time.bat
```

**Fitur:**
- ✅ Kontrol granular per voucher
- ✅ Log terpisah per voucher
- ✅ Dapat dijalankan selective
- ✅ Konfigurasi berbeda per voucher

#### **3. Batch Script (Windows)**
**File:** `run_all_vouchers.bat`

```cmd
run_all_vouchers.bat
```

**Fitur:**
- ✅ One-click execution
- ✅ Windows native
- ✅ Multiple terminal windows

---

### **📱 SINGLE VOUCHER**

### 1. **Python Script** (Direkomendasikan)
**File:** `auto_voucher_scheduler.py`

#### Instalasi Dependencies:
```bash
pip install requests schedule
```

#### Cara Menjalankan:
```bash
# Mode sekali (hari ini jam 20:00:00.000 WIB)
python auto_voucher_scheduler.py
# Pilih opsi 1

# Mode harian (setiap hari jam 20:00:00.000 WIB)
python auto_voucher_scheduler.py
# Pilih opsi 2

# Test request sekarang
python auto_voucher_scheduler.py
# Pilih opsi 3
```

#### Fitur:
- ✅ Timing presisi hingga milidetik
- ✅ Timezone WIB otomatis
- ✅ Logging lengkap dengan timestamp
- ✅ Error handling
- ✅ Mode sekali dan harian

---

### 2. **PowerShell Script** (Windows Native)
**File:** `auto_voucher_scheduler.ps1`

#### Cara Menjalankan:
```powershell
# Mode sekali
.\auto_voucher_scheduler.ps1 -Once

# Mode harian
.\auto_voucher_scheduler.ps1 -Daily

# Test request
.\auto_voucher_scheduler.ps1 -Test
```

#### Fitur:
- ✅ Native Windows support
- ✅ High-precision timing
- ✅ WIB timezone support
- ✅ Detailed logging

---

### 3. **Node.js Script** (Presisi Tertinggi)
**File:** `auto_voucher_scheduler.js`

#### Instalasi:
```bash
# Tidak perlu dependencies tambahan
```

#### Cara Menjalankan:
```bash
# Mode sekali
node auto_voucher_scheduler.js --once

# Mode harian
node auto_voucher_scheduler.js --daily

# Test request
node auto_voucher_scheduler.js --test
```

#### Fitur:
- ✅ Presisi timing terbaik (1ms accuracy)
- ✅ High-performance execution
- ✅ Cross-platform compatible

---

### 4. **Windows Task Scheduler** (Set & Forget)
**Files:** `run_voucher_scheduler.bat` + `VoucherScheduler_Task.xml`

#### Setup:
1. Buka **Task Scheduler** sebagai Administrator
2. Import task: **Action** → **Import Task** → Pilih `VoucherScheduler_Task.xml`
3. Atau jalankan command:
```cmd
schtasks /create /xml "VoucherScheduler_Task.xml" /tn "ShopeeVoucherScheduler"
```

#### Fitur:
- ✅ Otomatis berjalan bahkan ketika komputer restart
- ✅ Berjalan di background
- ✅ Windows service integration

---

## 🚀 **Quick Start - Pilihan Tercepat:**

### **Untuk 3 Voucher Sekaligus (Node.js - RECOMMENDED):**
```bash
# Opsi 1: Master scheduler dengan staggered timing (presisi tertinggi)
node master_scheduler.js --once

# Opsi 2: Batch file untuk menjalankan 3 scheduler terpisah
run_all_vouchers.bat
```

### **Untuk 1 Voucher Saja (Node.js):**
```bash
# Voucher 1
node voucher_1_scheduler.js --once

# Voucher 2
node voucher_2_scheduler.js --once

# Voucher 3
node voucher_3_scheduler.js --once

# Atau voucher original
node auto_voucher_scheduler.js --once
```

### **Untuk Kemudahan (Python):**
```bash
pip install requests schedule
python auto_voucher_scheduler.py
# Pilih opsi 1
```

### **Untuk Windows Native (PowerShell):**
```powershell
.\auto_voucher_scheduler.ps1 -Once
```

---

## ⚡ Presisi Timing

### Akurasi Timing per Method:
1. **Node.js Master Scheduler**: ±1-3 milidetik (TERBAIK)
2. **Node.js Individual**: ±1-5 milidetik
3. **Python**: ±5-10 milidetik  
4. **PowerShell**: ±10-50 milidetik
5. **Task Scheduler**: ±100-1000 milidetik

### Target Eksekusi (3 Voucher Staggered):
```
Voucher 1: 20:00:00.000 WIB
Voucher 2: 20:00:00.050 WIB (+50ms)
Voucher 3: 20:00:00.100 WIB (+100ms)
```

---

## 📊 Monitoring & Logging

### Log Files untuk Multiple Vouchers:
- `master_scheduler.log` (Master scheduler)
- `voucher_1_scheduler.log` (Voucher 1)
- `voucher_2_scheduler.log` (Voucher 2)  
- `voucher_3_scheduler.log` (Voucher 3)
- `multiple_scheduler.log` (Batch execution)

### Log Files untuk Single Voucher:
- `voucher_scheduler.log` (Python/PowerShell)
- `voucher_scheduler_node.log` (Node.js original)

Format log:
```
[2025-07-25 20:00:00.123] [INFO] 🚀 Menjalankan request voucher pada: 2025-07-25 20:00:00.123 WIB
[2025-07-25 20:00:00.456] [INFO] 📊 Status Code: 200
[2025-07-25 20:00:00.789] [INFO] ✅ Request berhasil!
```

---

## 🛠️ Troubleshooting

### Jika Request Gagal:
1. **Periksa koneksi internet**
2. **Update cookies** jika expired
3. **Periksa signature** voucher masih valid
4. **Cek firewall/antivirus** blocking request

### Update Cookies:
1. Buka browser → Login Shopee
2. Buka Developer Tools (F12)
3. Copy cookies dari Network tab
4. Replace di script yang dipilih

### Error Timezone:
- Script otomatis handle WIB (UTC+7)
- Jika perlu manual: Set environment variable `TZ=Asia/Jakarta`

---

## 🚀 Quick Start (Recommended)

### Untuk Pemula - Gunakan Python:
```bash
# 1. Download/install Python dari python.org
# 2. Install dependencies
pip install requests schedule

# 3. Jalankan script
python auto_voucher_scheduler.py
# Pilih opsi 1 untuk sekali atau 2 untuk harian
```

### Untuk Advanced - Gunakan Node.js:
```bash
# 1. Install Node.js dari nodejs.org
# 2. Jalankan langsung
node auto_voucher_scheduler.js --once
```

### Untuk Set & Forget - Gunakan Task Scheduler:
```cmd
# Import task XML ke Windows Task Scheduler
# Script akan berjalan otomatis setiap hari jam 20:00 WIB
```

---

## 🔧 Troubleshooting

### ❌ Error: "URL is not defined"
**Problem:** Error terjadi saat eksekusi otomatis tapi tidak saat manual  
**Solusi:**
```bash
# 1. Periksa variable scope di file .js
# 2. Pastikan CONFIG object terdefinisi dengan benar
# 3. Restart terminal dan coba lagi
# 4. Gunakan node versi terbaru (minimal v14+)
```

### ❌ Error: "Cannot connect" / Network timeout
**Solusi:**
- Periksa koneksi internet
- Periksa cookies masih valid
- Coba ganti DNS ke 8.8.8.8

### ❌ Error: "Invalid time format"
**Solusi:**
- Gunakan format: `--time=HH:MM:SS` atau `--time=HH:MM`
- Contoh valid: `--time=14:30:15` atau `--time=14:30`

### ❌ Timing tidak akurat
**Solusi:**
- Gunakan Node.js version (paling akurat)
- Tutup aplikasi lain yang berat
- Jangan minimize terminal saat eksekusi

---

## ⚠️ Important Notes

1. **Backup cookies**: Save cookies di tempat aman
2. **Test dulu**: Gunakan mode test sebelum jadwal sebenarnya  
3. **Monitor logs**: Periksa log file untuk memastikan berhasil
4. **Update signature**: Ganti signature voucher jika berbeda
5. **Keep computer on**: Untuk script local, pastikan komputer menyala

---

## 📱 Status Codes

- **200**: ✅ Berhasil
- **400**: ❌ Bad request (periksa payload)
- **401**: ❌ Unauthorized (periksa cookies)
- **403**: ❌ Forbidden (signature invalid)
- **500**: ❌ Server error (coba lagi nanti)

## 🎉 Success!

Jika berhasil, Anda akan melihat log seperti ini:
```
[2025-07-25 20:00:00.123] [INFO] 🚀 Menjalankan request voucher pada: 2025-07-25 20:00:00.123 WIB
[2025-07-25 20:00:00.456] [INFO] 📊 Status Code: 200
[2025-07-25 20:00:00.789] [INFO] ✅ Request berhasil!
```

**Happy voucher hunting! 🎫**
