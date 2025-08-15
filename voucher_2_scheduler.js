// Node.js High-Precision Scheduler - Voucher 1
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');

// Konfigurasi Voucher 2
const CONFIG = {
    voucherId: 2,
    url: 'https://shopee.co.id/api/v2/voucher_wallet/save_voucher',
    targetHour: 12,      // Jam eksekusi default (bisa diubah via parameter)
    targetMinute: 0,     // Menit eksekusi default (bisa diubah via parameter)
    targetSecond: 0,     // Detik eksekusi default (bisa diubah via parameter)
    targetMillisecond: 0, // Millisecond eksekusi default (bisa diubah via parameter)
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'SPC_EC=.VWQ4R3VIamRNc2h0dWgyOUmiOCPQvg/KfFB3V6jdEeT6ScPjhWYUzQUf4177mXXs3ZD74BfunJPgtMBYNTdNhk5fU2H0i+5H2hikZLinTcjePvFjIh3aFapk3KTZgfcdQiKzsA3+Yzf+oUnVB7nINmdTKXEXX/lcKp0LvjA1NSOsLBl6NFmB2O6np4ZJegt3B/Mj36ivt74x/lzjbF2B6LG92kBWKqHqeGLcM4k6AujwnaA6YkLuddHC4xZ9w3Lo;shopee_webUnique_ccd=znivLcwRKpqbm1zHFHxNNQ%3D%3D%7CfOD3rMvhZsO9zFMihgOHbKi7wlMe7wZdKdGPX4HxOghVc8fjird0m2GUcmbt6i1%2B76%2FfSDOwxik6GQ%3D%3D%7CBLraLg16JrJR9LKX%7C08%7C3;SPC_U=1466459814;_QPWSDCXHZQA=d9209f9b-b00c-4659-98d7-6d9090948aff;_ga=GA1.3.2037218368.1725279741;SPC_SI=lBabaAAAAAB2d05mQlVpVASgCAAAAAAAOERqYnRGazA=;csrftoken=4NDY06jhyYBnygeO9Rm5HYciI1TrbE8k;ds=60252df619bd0b72b8ccfe7cb25e999d;_ga_SW6D8G0HXK=GS1.1.1725279740.1.0.1725279741.59.0.0;_sapid=80fb42c16aa797a785a68ec3372324af96400a72067d90b93b1880f1;REC7iLP4Q=ea798962-6e7b-49b2-ba2e-d9b3d67b0a09;REC_T_ID=e0dcabb1-68f6-11ef-9b0b-ca58774012b6;SPC_CDS_CHAT=05f1554b-03af-4774-8e0d-59fd65222b9c;SPC_CLIENTID=S2rTNPH0ms4hP5Lmycchmymgwiizhzou;SPC_F=S2rTNPH0ms4hP5LmYxhkOLqDEE7oAgEz;SPC_R_T_ID=gFKCmGXYd/0c+8+zYKWn4wzAaTFqQGTWfl6go+Xa5Fl7gPtoYYkVLsGLnSIeQa9BDzNgYOFW6mlWnEP82x7GsOZw0YB/kNYJZlDIhSANjHoeo3DE5hdXgBH2ioNN25T7uS0dH3KNwsjKlcEEZwYPrMmmc63YvD8VEm1JHzF2Nvs=;SPC_R_T_IV=OG5BaDFITmlqWmRSdjRJdA==;SPC_SEC_SI=v1-RVRxY2dnbm95dHB6U3F5TYhRTfGblFytvjh3Lkd+hiwGBJV9EJ7WH5nmhEt3YZJB3gO12b/tg+/6hV3SDeAfJ6U7wxjM5mXn/UlkxTC92ds=;SPC_ST=.a3ppMGRja3NQclNOdkhSMbCEmt+iJuK5XRSjrE+GoKRrnRVD8Mc7Gd2lS2N3ibpH/9RxwlUdZQxYrFZG6z1NrSo7dnt+CqZPSBixip4ZA9jdBRQUK4vyuKwG2fIQzBO0DmmJaosW7trgZzlkGGNxuqAcqvbPHzt4jlV9x1JJsWhgc/SVZMYegH4UMyjwSCdoan/le3Ripk9v02nNrtAP6q2zS/2i4piV+amkY3D5/q/JqcXxex2csAQSqrSs/nQW;SPC_T_ID=gFKCmGXYd/0c+8+zYKWn4wzAaTFqQGTWfl6go+Xa5Fl7gPtoYYkVLsGLnSIeQa9BDzNgYOFW6mlWnEP82x7GsOZw0YB/kNYJZlDIhSANjHoeo3DE5hdXgBH2ioNN25T7uS0dH3KNwsjKlcEEZwYPrMmmc63YvD8VEm1JHzF2Nvs=;SPC_T_IV=OG5BaDFITmlqWmRSdjRJdA=='
    },
    payload: {
        voucher_promotionid: 1216545213005824,
        signature: "98f6d93be884ac548c83dd126ddbc0cf696570d089de0a9a10cd6be8ed191adb",
        signature_source: "0"
    }
};

// Fungsi untuk mendapatkan waktu WIB
function getWIBTime() {
    // Gunakan offset UTC+7 untuk timezone Jakarta
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const jakartaTime = new Date(utcTime + (7 * 3600000)); // UTC+7
    return jakartaTime;
}

// Fungsi untuk logging dengan timestamp presisi
function log(message, level = 'INFO') {
    const wibTime = getWIBTime();
    const timestamp = wibTime.getFullYear() + '-' +
        String(wibTime.getMonth() + 1).padStart(2, '0') + '-' +
        String(wibTime.getDate()).padStart(2, '0') + ' ' +
        String(wibTime.getHours()).padStart(2, '0') + ':' +
        String(wibTime.getMinutes()).padStart(2, '0') + ':' +
        String(wibTime.getSeconds()).padStart(2, '0') + '.' +
        String(wibTime.getMilliseconds()).padStart(3, '0');
    
    const logLine = `[${timestamp}] [${level}] [VOUCHER-${CONFIG.voucherId}] ${message}`;
    console.log(logLine);
    
    // Simpan ke file log
    fs.appendFileSync(`voucher_${CONFIG.voucherId}_scheduler.log`, logLine + '\n', 'utf8');
}

// Fungsi untuk eksekusi request dengan timing presisi
function executeVoucherRequest() {
    return new Promise((resolve, reject) => {
        const executionTime = getWIBTime();
        const timeStr = executionTime.getFullYear() + '-' +
            String(executionTime.getMonth() + 1).padStart(2, '0') + '-' +
            String(executionTime.getDate()).padStart(2, '0') + ' ' +
            String(executionTime.getHours()).padStart(2, '0') + ':' +
            String(executionTime.getMinutes()).padStart(2, '0') + ':' +
            String(executionTime.getSeconds()).padStart(2, '0') + '.' +
            String(executionTime.getMilliseconds()).padStart(3, '0');
        
        log(`🚀 Menjalankan request voucher ${CONFIG.voucherId} pada: ${timeStr} WIB`);
        
        const postData = JSON.stringify(CONFIG.payload);
        const url = new URL(CONFIG.url);
        
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname,
            method: 'POST',
            headers: {
                ...CONFIG.headers,
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 30000, // Increased to 30 seconds
            keepAlive: true,
            keepAliveMsecs: 10000
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                log(`📊 Status Code: ${res.statusCode}`);
                log(`📊 Response: ${data}`);
                
                if (res.statusCode === 200) {
                    log('✅ Request voucher berhasil!');
                    resolve({ success: true, status: res.statusCode, data });
                } else {
                    log(`❌ Request voucher gagal dengan status: ${res.statusCode}`, 'ERROR');
                    resolve({ success: false, status: res.statusCode, data });
                }
            });
        });
        
        req.on('error', (err) => {
            log(`❌ Error saat mengirim request: ${err.message}`, 'ERROR');
            reject(err);
        });
        
        req.on('timeout', () => {
            log('❌ Request timeout', 'ERROR');
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.write(postData);
        req.end();
    });
}

// High-precision timing function
function waitUntilPreciseTime(targetTime) {
    return new Promise((resolve) => {
        function checkTime() {
            const now = getWIBTime().getTime();
            const target = targetTime.getTime();
            const diff = target - now;
            
            if (diff <= 0) {
                resolve();
                return;
            }
            
            // Gunakan setTimeout dengan interval yang adaptif
            if (diff > 1000) {
                setTimeout(checkTime, 100); // Check setiap 100ms jika masih lama
            } else if (diff > 100) {
                setTimeout(checkTime, 10);  // Check setiap 10ms jika mendekati
            } else {
                setTimeout(checkTime, 1);   // Check setiap 1ms jika sangat dekat
            }
        }
        
        checkTime();
    });
}

// Scheduler untuk eksekusi sekali pada jam yang ditentukan
async function scheduleOnce() {
    const now = getWIBTime();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), CONFIG.targetHour, CONFIG.targetMinute, CONFIG.targetSecond, CONFIG.targetMillisecond);
    
    // Jika sudah lewat waktu target hari ini, set untuk hari berikutnya
    if (now.getTime() >= today.getTime()) {
        today.setDate(today.getDate() + 1);
    }
    
    const delayMs = today.getTime() - now.getTime();
    
    const targetTimeStr = today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0') + ' ' +
        String(today.getHours()).padStart(2, '0') + ':' +
        String(today.getMinutes()).padStart(2, '0') + ':' +
        String(today.getSeconds()).padStart(2, '0') + '.' +
        String(today.getMilliseconds()).padStart(3, '0');
    
    log(`⏰ Target waktu voucher ${CONFIG.voucherId}: ${targetTimeStr} WIB`);
    log(`⏰ Delay: ${(delayMs / 1000).toFixed(3)} detik`);
    
    await waitUntilPreciseTime(today);
    
    try {
        await executeVoucherRequest();
    } catch (error) {
        log(`❌ Error saat eksekusi voucher ${CONFIG.voucherId}: ${error.message}`, 'ERROR');
    }
}

// Scheduler untuk eksekusi harian
async function scheduleDailyLoop() {
    log(`📅 Memulai scheduler harian voucher ${CONFIG.voucherId} - Request akan dijalankan setiap hari jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB`);
    
    while (true) {
        try {
            await scheduleOnce();
            
            // Tunggu 2 detik sebelum set schedule berikutnya
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            log(`❌ Error dalam scheduler loop voucher ${CONFIG.voucherId}: ${error.message}`, 'ERROR');
            // Tunggu 5 detik sebelum mencoba lagi jika ada error
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Test function
async function testRequest() {
    log(`🧪 Menjalankan test request voucher ${CONFIG.voucherId}...`);
    try {
        await executeVoucherRequest();
    } catch (error) {
        log(`❌ Error saat test voucher ${CONFIG.voucherId}: ${error.message}`, 'ERROR');
    }
}

// Main function
function main() {
    const args = process.argv.slice(2);
    
    // Parse parameter waktu dari command line
    const timeArg = args.find(arg => arg.startsWith('--time='));
    if (timeArg) {
        const timeStr = timeArg.split('=')[1];
        const timeParts = timeStr.split(':');
        if (timeParts.length >= 2) {
            CONFIG.targetHour = parseInt(timeParts[0]) || CONFIG.targetHour;
            CONFIG.targetMinute = parseInt(timeParts[1]) || CONFIG.targetMinute;
            CONFIG.targetSecond = parseInt(timeParts[2]) || CONFIG.targetSecond;
            CONFIG.targetMillisecond = parseInt(timeParts[3]) || CONFIG.targetMillisecond;
        }
    }
    
    console.log(`🎯 Shopee Voucher Auto Scheduler - Node.js (Voucher ${CONFIG.voucherId})`);
    console.log('='.repeat(60));
    console.log(`⏰ Target waktu: ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB`);
    console.log('='.repeat(60));
    
    if (args.includes('--once')) {
        console.log(`⏰ Mode: Sekali pada jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB (Voucher ${CONFIG.voucherId})`);
        scheduleOnce().then(() => {
            console.log(`✅ Scheduler voucher ${CONFIG.voucherId} selesai`);
            process.exit(0);
        });
    } else if (args.includes('--daily')) {
        console.log(`📅 Mode: Harian setiap jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB (Voucher ${CONFIG.voucherId})`);
        scheduleDailyLoop();
    } else if (args.includes('--test')) {
        testRequest().then(() => {
            process.exit(0);
        });
    } else {
        console.log('Penggunaan:');
        console.log(`  node voucher_2_scheduler.js --once [--time=HH:MM:SS:mmm]    # Jalankan sekali pada waktu tertentu`);
        console.log(`  node voucher_2_scheduler.js --daily [--time=HH:MM:SS:mmm]   # Schedule harian pada waktu tertentu`);
        console.log(`  node voucher_2_scheduler.js --test                          # Test request sekarang`);
        console.log('');
        console.log('Contoh:');
        console.log(`  node voucher_2_scheduler.js --once                          # Default 18:00:00.000`);
        console.log(`  node voucher_2_scheduler.js --once --time=14:30:15:50       # Custom 14:30:15.050`);
        console.log(`  node voucher_2_scheduler.js --once --time=14:30:15          # Custom 14:30:15.000`);
        console.log(`  node voucher_2_scheduler.js --once --time=14:30             # Custom 14:30:00.000`);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log(`❌ Scheduler voucher ${CONFIG.voucherId} dihentikan oleh pengguna (SIGINT)`);
    process.exit(0);
});

process.on('SIGTERM', () => {
    log(`❌ Scheduler voucher ${CONFIG.voucherId} dihentikan oleh sistem (SIGTERM)`);
    process.exit(0);
});

// Jalankan main function
main();
