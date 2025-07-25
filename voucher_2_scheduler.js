// Node.js High-Precision Scheduler - Voucher 2
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');

// Konfigurasi Voucher 2
const CONFIG = {
    voucherId: 2,
    url: 'https://shopee.co.id/api/v2/voucher_wallet/save_voucher',
    targetHour: 20,      // Jam eksekusi default (bisa diubah via parameter)
    targetMinute: 0,     // Menit eksekusi default (bisa diubah via parameter)
    targetSecond: 0,     // Detik eksekusi default (bisa diubah via parameter)
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'SPC_EC=.YUk0QThrdjBnOHlwVmZsc8dZjI/PQrz7sUsolIYDbq7Yj4n+v9VLZ8Rl7lzHhhkBXzFNQ3VAj5cwkzjwQxilv35MBSMIM50CfAq/k21bYzdiIoN9SI/AypTjMgccVhelSOgo0vqVDUuT9MbV+8zztIJDtUZ/GBkBx184YP1n6j57UtNH5MbIiXTLxmji989Pxn0vZelFuOP6SfulpJxfi/fblpU7DhAqhe8bql0zk6Kq605i1gVVASemZeJ3Ose2;shopee_webUnique_ccd=6HlDvCeZRRKEMS%2FIyCAHpA%3D%3D%7C%2F3XSv1s2LLFZRXvdtbO00DndL5O%2FZPkGurh1%2BkmwE5y%2BmxinFqvqKZfNkCxrUFD%2BvERaOnYvb2IZgUpk%7Cd6xwQEAdisEDofxV%7C08%7C3;SPC_U=197644546;_QPWSDCXHZQA=30e4e084-1f75-4cff-c405-23c74d259d89;SPC_IA=1;_ga=GA1.3.1785154148.1728259408;SPC_SI=KEB3aAAAAAB5VFRmcW1FMV/QlQAAAAAAa1JJOGR0TDc=;_ga_8TJ45E514C=GS1.1.1744553054.1.0.1744553055.59.0.0;csrftoken=LbMM6NpZDUXjcrYbMSSeeo0JAB0HJNaR;ds=30ad4800058e6fb8cf3c8b746f6b16b9;_fbc=fb.2.1750508542635.PAQ0xDSwLDg0NleHRuA2FlbQEwAGFkaWQBqxT9Y-QJ4wGnheatiZhjQ_4iHU1-wqrpz-lVL1AW--co2WTR5QT2nlKbJ8btHlRBrlcVjYQ_aem_9KgO4HrTT4HACwXNfqF7Xg;_ga_SW6D8G0HXK=GS2.1.s1750550588$o148$g1$t1750550588$j60$l0$h0;_fbp=fb.2.1728258689216.516011602901317675;_gcl_au=1.1.201036373.1753378052;_sapid=e00a8b199d28887ee557471bbb8a09d949fdc34845dc405ed2efb494;REC7iLP4Q=167e91c4-2aee-453d-9e0c-54a644ff5e35;REC_T_ID=97d49245-8115-11ef-8731-0a1018c31593;SPC_CLIENTID=eL8Y2TKrrae6VnNEheqsgilzdgkjpkrn;SPC_F=eL8Y2TKrrae6VnNEvFdK2VhWv9ZpBZBn;SPC_R_T_ID=CVnkdp2AtQgjbamg5DsLfG/s/XBp4VI5/VX6HCrre2DTNmtejBszldn7i3fi20YTW4fewCI6fmkeonWqlzoOuPVoHfTBG8rOSc2WOmTGcp8uIHz7kvPirPV58FJtOX1iIGr61iWOosoavPCb6PCfUO+Bm5IdFwcccTzq+2xxT34=;SPC_R_T_IV=MldMakY4WFJwSkVyN2Yxdw==;SPC_SEC_SI=v1-RE9VNk8wNXFMb1RFQXdzbWCP9N7rExoEQsYJ5IUksFzNwGXFGajLjtiuf7ISkjtQOLReSFIBJt658ohPDOtTcNEM6CAWyjX1DfM0OC3mMkA=;SPC_ST=.MUZ6bWQxQnNEZmFaSGFuWBQwYLg7N0htEAamuoJ0LlhAn+SbdGVcjYKXxdii2KcxvNblDEl4nSBx+DDhtp6pe3p21achto4FL1xhF5C7a+bWJsESjUFDHCJszK3Au6EYaknIU6znavUXbDdUiRxa5BqbiB8AAy9sQawbPfnSxzQ5nZk4X/15Nc472qBPCGMRlX1UhZEu6EXRxh9S1lfmJ0HfFF8HbvHKCFf6mK/mZa6K05pPWLXbqds1c8grLRtg;SPC_T_ID=CVnkdp2AtQgjbamg5DsLfG/s/XBp4VI5/VX6HCrre2DTNmtejBszldn7i3fi20YTW4fewCI6fmkeonWqlzoOuPVoHfTBG8rOSc2WOmTGcp8uIHz7kvPirPV58FJtOX1iIGr61iWOosoavPCb6PCfUO+Bm5IdFwcccTzq+2xxT34=;SPC_T_IV=MldMakY4WFJwSkVyN2Yxdw=='
    },
    payload: {
        voucher_promotionid: 1206237979754497, // Different voucher ID for voucher 2
        signature: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2", // Different signature
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
            timeout: 10000
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
