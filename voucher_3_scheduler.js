// Node.js High-Precision Scheduler - Voucher 1
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');

// Konfigurasi Voucher 3
const CONFIG = {
    voucherId: 3,
    url: 'https://shopee.co.id/api/v2/voucher_wallet/save_voucher',
    targetHour: 12,      // Jam eksekusi default (bisa diubah via parameter)
    targetMinute: 0,     // Menit eksekusi default (bisa diubah via parameter)
    targetSecond: 0,     // Detik eksekusi default (bisa diubah via parameter)
    targetMillisecond: 0, // Millisecond eksekusi default (bisa diubah via parameter)
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'SPC_EC=.VFVkNk9xV2xWR0FMdjY2VRvB8xK2dZVbwezR/14zoar5nQCZqWFTJcJrVBa+4LrEeyDgvl/suQLPFvN7GKz2IDiD5jtcstjr7LkFXhoTOuKdR6Wm4qcYodKu1FkhQnv3SHGJddGkh9LUi7zVymnW1Q362lK2w9zawTx1XBXdqQk3WUZRDmkSfMWCuZVTWPS/a00mWRohJlCjNLouJNeyrcW3h6BTno9wVEmAKMIp13maGq+mzwy6ZbRkjbPhZIbp;SPC_U=1546195773;SPC_SI=QxWbaAAAAAB4ZE1JZ3pPUeTNMAAAAAAAV0p1b0Y1Z08=;REC_T_ID=5f37feeb-3d26-11f0-89d3-7606a32079a5;SPC_CLIENTID=nENGc6RvHqUdQ9Sulnbzdmfhrftquiir;SPC_F=nENGc6RvHqUdQ9Su2Z2W4axoKfSOscZy;SPC_R_T_ID=ao7xXRU9xghufVrT+h+oDAmnCLoXnAzNI/+QAqALtbb9HWBC1tsafyqkJmZa2F/U00HvaXINSaM8fUO/6eGFaZ6J0x9585UTRhCXfBQtYaxacfkQp+BgZQFT/X4/28dvVXMY5ywEkCWGrAvmK12Bn7bOIdFGLANzLV+BdpvR8sw=;SPC_R_T_IV=aU04TXN4ZHdKdzdlMkFxbg==;SPC_SEC_SI=v1-YWFVSnNKYkdET1Yxa1VxMsPx6QG2N6FoDNgNHNvjZwXhhk9yiMdU+ZPZZcgew6Wih5UK2/A7jqp7Zkqb+I0lhFj2LPw+HsMIeLSxxHYt9hI=;SPC_ST=.SktFY0hReXRJSUp6dkkxYVMWKZLQvgBFVvmJ1WxDzO9I1zyyYN/M98daHbwkWSQkVAiJHxkqUJsX3vTk60ULz54ZFgGkMpmYC8/hvHfnh60iGNAYRyBi3LJQ9n51qgmKTA8Jscp+bwk4tTMg8pf7wo1MVdl9bxBPE2cpq11cYb6CvcM1j3NVyGCCF/4fBRdFZIxfyRMkSkSPAeQ70yF6q2QR+ffZFDaJ8xlLlgAJdXX/i/OovWAtiDOS2mJ7HGll;SPC_T_ID=ao7xXRU9xghufVrT+h+oDAmnCLoXnAzNI/+QAqALtbb9HWBC1tsafyqkJmZa2F/U00HvaXINSaM8fUO/6eGFaZ6J0x9585UTRhCXfBQtYaxacfkQp+BgZQFT/X4/28dvVXMY5ywEkCWGrAvmK12Bn7bOIdFGLANzLV+BdpvR8sw=;SPC_T_IV=aU04TXN4ZHdKdzdlMkFxbg=='
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
        console.log(`  node voucher_3_scheduler.js --once [--time=HH:MM:SS:mmm]    # Jalankan sekali pada waktu tertentu`);
        console.log(`  node voucher_3_scheduler.js --daily [--time=HH:MM:SS:mmm]   # Schedule harian pada waktu tertentu`);
        console.log(`  node voucher_3_scheduler.js --test                          # Test request sekarang`);
        console.log('');
        console.log('Contoh:');
        console.log(`  node voucher_3_scheduler.js --once                          # Default 18:00:00.000`);
        console.log(`  node voucher_3_scheduler.js --once --time=14:30:15:50       # Custom 14:30:15.050`);
        console.log(`  node voucher_3_scheduler.js --once --time=14:30:15          # Custom 14:30:15.000`);
        console.log(`  node voucher_3_scheduler.js --once --time=14:30             # Custom 14:30:00.000`);
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
