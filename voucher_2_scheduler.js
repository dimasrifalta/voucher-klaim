// Node.js High-Precision Scheduler - Voucher 1
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');

// Konfigurasi Voucher 1
const CONFIG = {
    voucherId: 2,
    url: 'https://shopee.co.id/api/v2/voucher_wallet/save_voucher',
    targetHour: 20,      // Jam eksekusi default (bisa diubah via parameter)
    targetMinute: 0,     // Menit eksekusi default (bisa diubah via parameter)
    targetSecond: 0,     // Detik eksekusi default (bisa diubah via parameter)
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'SPC_EC=.ZGZCaWJZeFI2bEV1eXJncSnklSDckCAKZoUQZDYJcsJZr5glzBHas54EvtoVyyvWygza/OHzKp6Anh/D4vVHaKEpraPEoJh+VEdz1g90T8FrSx5iMlp016E+ZV4yAsnjIgSyfjYwlf7GHcOzZx2MCS9hxw6Je564Idb1OjXrRq4PFWpDO4n3cBh5pPRxmSTv6DQJH4TM0NEVjFI+mutQsN9P+zQxfxsuN5yRRhsieB4Z16yK3StdL7jX1LVGrS7S;shopee_webUnique_ccd=znivLcwRKpqbm1zHFHxNNQ%3D%3D%7CfOD3rMvhZsO9zFMihgOHbKi7wlMe7wZdKdGPX4HxOghVc8fjird0m2GUcmbt6i1%2B76%2FfSDOwxik6GQ%3D%3D%7CBLraLg16JrJR9LKX%7C08%7C3;SPC_U=1466459814;_QPWSDCXHZQA=d9209f9b-b00c-4659-98d7-6d9090948aff;_ga=GA1.3.2037218368.1725279741;SPC_SI=DUB3aAAAAABqbWZGaWRkR+hJnwAAAAAAelFXQ3V1clo=;csrftoken=Zcm8JLkbvQoAUluEags87OQ5sHpSTOE8;ds=60252df619bd0b72b8ccfe7cb25e999d;_ga_SW6D8G0HXK=GS1.1.1725279740.1.0.1725279741.59.0.0;_sapid=80fb42c16aa797a785a68ec3372324af96400a72067d90b93b1880f1;REC7iLP4Q=ea798962-6e7b-49b2-ba2e-d9b3d67b0a09;REC_T_ID=e0dcabb1-68f6-11ef-9b0b-ca58774012b6;SPC_CDS_CHAT=e60d9a32-91d2-41e4-ac77-7d2e240f070c;SPC_CLIENTID=S2rTNPH0ms4hP5Lmycchmymgwiizhzou;SPC_F=S2rTNPH0ms4hP5LmYxhkOLqDEE7oAgEz;SPC_R_T_ID=716ltMbsSlzh09nL+t7vAMqrrgjB7CzkhCbx8jkd0YXj8VT9kaLLAN+oNfFtkJwNzACquwHEv/Fn7bGSOR6dNsu2AfC8zghF+fcseNtPy813cBkpN0Cwf9Gw+LVtNu2SPkHVrFs0TGqRR30Lljv9CB9/P/GtcIBAyjs3U8c3AXo=;SPC_R_T_IV=ZEhreGFiakdKZDBFZFRibg==;SPC_SEC_SI=v1-dHp3dXFxVE85TG1zNEMwN2iLkJ+F5tUoyNxKK1IkqwIthRzHCw5SCfYnieSAW6Mm9LqI7FthuTmv1joGh5gtrG/x1q+zXRk5r3pBNeU/uvs=;SPC_ST=.M0w1d2xYTDh4SHJaMUlEOa26DEfpXniFSCSzvojPAmwPTjlyYHELy9aln/YQMM7hIILRPoAKShIkYiGMGTNcnrWVMc6k5vcWxEzV0C6mjXZZQ8RRwuzjUNUZQ5xcbP3AL1XmVi4U8iX4q/9Thhdh248ZFnZ32E2W7QH+BAw4O6TRnpIFz32ltnBsMFxlNYvIecSfuv9GGHTf01j0WaNrhNEGP9iGklIzxvLLQHKBtr6GKCaWw+f7P7GxbmK7QkMu;SPC_T_ID=716ltMbsSlzh09nL+t7vAMqrrgjB7CzkhCbx8jkd0YXj8VT9kaLLAN+oNfFtkJwNzACquwHEv/Fn7bGSOR6dNsu2AfC8zghF+fcseNtPy813cBkpN0Cwf9Gw+LVtNu2SPkHVrFs0TGqRR30Lljv9CB9/P/GtcIBAyjs3U8c3AXo=;SPC_T_IV=ZEhreGFiakdKZDBFZFRibg=='
    },
    payload: {
        voucher_promotionid: 1206237979754496,
        signature: "ef913cd8d09e22caf44f348c9c99bcaf7e33b7880aa1e7c8cd8befe1e3e5798f",
        signature_source: "0"
    }
};

// Fungsi untuk mendapatkan waktu WIB
function getWIBTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (7 * 3600000)); // WIB = UTC+7
}

// Fungsi untuk logging dengan timestamp presisi
function log(message, level = 'INFO') {
    const timestamp = getWIBTime().toISOString().replace('T', ' ').replace('Z', '').slice(0, -1);
    const logLine = `[${timestamp}] [${level}] [VOUCHER-${CONFIG.voucherId}] ${message}`;
    console.log(logLine);
    
    // Simpan ke file log
    fs.appendFileSync(`voucher_${CONFIG.voucherId}_scheduler.log`, logLine + '\n', 'utf8');
}

// Fungsi untuk eksekusi request dengan timing presisi
function executeVoucherRequest() {
    return new Promise((resolve, reject) => {
        const executionTime = getWIBTime();
        log(`🚀 Menjalankan request voucher ${CONFIG.voucherId} pada: ${executionTime.toISOString().replace('T', ' ').replace('Z', '').slice(0, -1)} WIB`);
        
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
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), CONFIG.targetHour, CONFIG.targetMinute, CONFIG.targetSecond, 0);
    
    // Jika sudah lewat waktu target hari ini, set untuk hari berikutnya
    if (now.getTime() >= today.getTime()) {
        today.setDate(today.getDate() + 1);
    }
    
    const delayMs = today.getTime() - now.getTime();
    
    log(`⏰ Target waktu voucher ${CONFIG.voucherId}: ${today.toISOString().replace('T', ' ').replace('Z', '').slice(0, -1)} WIB`);
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
    log(`📅 Memulai scheduler harian voucher ${CONFIG.voucherId} - Request akan dijalankan setiap hari jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')} WIB`);
    
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
        }
    }
    
    console.log(`🎯 Shopee Voucher Auto Scheduler - Node.js (Voucher ${CONFIG.voucherId})`);
    console.log('='.repeat(60));
    console.log(`⏰ Target waktu: ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')} WIB`);
    console.log('='.repeat(60));
    
    if (args.includes('--once')) {
        console.log(`⏰ Mode: Sekali pada jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')} WIB (Voucher ${CONFIG.voucherId})`);
        scheduleOnce().then(() => {
            console.log(`✅ Scheduler voucher ${CONFIG.voucherId} selesai`);
            process.exit(0);
        });
    } else if (args.includes('--daily')) {
        console.log(`📅 Mode: Harian setiap jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')} WIB (Voucher ${CONFIG.voucherId})`);
        scheduleDailyLoop();
    } else if (args.includes('--test')) {
        testRequest().then(() => {
            process.exit(0);
        });
    } else {
        console.log('Penggunaan:');
        console.log(`  node voucher_2_scheduler.js --once [--time=HH:MM:SS]    # Jalankan sekali pada waktu tertentu`);
        console.log(`  node voucher_2_scheduler.js --daily [--time=HH:MM:SS]   # Schedule harian pada waktu tertentu`);
        console.log(`  node voucher_2_scheduler.js --test                      # Test request sekarang`);
        console.log('');
        console.log('Contoh:');
        console.log(`  node voucher_2_scheduler.js --once                      # Default 20:00:00`);
        console.log(`  node voucher_2_scheduler.js --once --time=14:30:15      # Custom 14:30:15`);
        console.log(`  node voucher_2_scheduler.js --once --time=14:30         # Custom 14:30:00`);
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
