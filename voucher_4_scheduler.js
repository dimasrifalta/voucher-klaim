// Node.js High-Precision Scheduler - Voucher 1
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');

// Konfigurasi Voucher 4
const CONFIG = {
    voucherId: 4,
    url: 'https://shopee.co.id/api/v2/voucher_wallet/save_voucher',
    targetHour: 12,      // Jam eksekusi default (bisa diubah via parameter)
    targetMinute: 0,     // Menit eksekusi default (bisa diubah via parameter)
    targetSecond: 0,     // Detik eksekusi default (bisa diubah via parameter)
    targetMillisecond: 0, // Millisecond eksekusi default (bisa diubah via parameter)
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'SPC_EC=.M0JXbzhhbVVZZnVRcEdaaRwFPZlVoNv4fvtfk6NwXpRbJmZCxz4Q0uQji3xTeRgoTCB0mkV2ALT7WtgX+mHTpiWJeAyr6v0lnI9KfcO/gXkxwq/K247AgJQQmLUt/asRNXIHhid/Q/1Czu0n3tSVVdaFOYY5n8fjtY2R2Mnr5WoCfAij0LkUNS0rSUuQkFGUkDyNAth2pqwtVTpM3AN7eUfB74MCUbLi6QPQ8aKh9hIyXSQNMozTYnjdcp5up/fRS2sH3IM5Enthginy8PVnQQ==;shopee_webUnique_ccd=f%2BR4pCHNvza91n5BtnoavQ%3D%3D%7CbordIwUil1qCciHGWrSUteMC1f6LzgVBAtu1ack%2Fq%2F4FSQBdbCyiTMAO7z1Ms96%2BA6jIUdJkn7j9lcc6%7CB90Oyvq7T5K2860E%7C08%7C3;SPC_U=784192634;_QPWSDCXHZQA=75684dbf-3e38-43f8-decc-aefb52d74eca;SPC_IA=1;_ga=GA1.3.280184295.1757420058;SPC_SI=aRbuaAAAAABGQWlvM1Jtasm3BwAAAAAAaFVYNDVIQlE=;_dc_gtm_UA-61904553-8=1;ds=7fa9435ff6f63adb5479f3319c992340;csrftoken=HgyKsI259DuXYw7zBrZPhxBThOLWdxf6;_med=refer;_ga_SW6D8G0HXK=GS2.1.s1760454777$o2$g1$t1760455511$j41$l1$h1865457950;_fbp=fb.2.1757420057965.291402097102283303;_gcl_au=1.1.1748179512.1757420056;_gid=GA1.3.406617697.1760454778;_sapid=127f3f8c0065ffe41722f38eb01f8a9882c97dccabddc5fccad3a154;AMP_TOKEN=%24NOT_FOUND;REC7iLP4Q=4aa8b4f9-cd2b-4654-877a-f5d240a27c94;REC_T_ID=7f618200-8d76-11f0-866f-92f21c05f9b8;SPC_CDS_CHAT=852d6a76-8aa7-431a-82cd-c49ee5c92253;SPC_CLIENTID=aGRkRTFYekV2UTM5bxjzyhoafjbkxsvg;SPC_F=hddE1XzEvQ399rQlCO5lc0YgztsMAimB;SPC_P_V=EHPv0bOpT7FvLnprUdQv3eZu8yfkKGCqYym6s63KtFGmzGRoJ2dQQQ2PCjDN+hZgURVXK+Y=;SPC_R_T_ID=f4kn4o3ZK3QoHsn3cYC4CtsCWvhxDlx7wBr0SZlUBP813KrSFCEbm+cLiXoHuxHsJ6MeNjU6dbwfFxhTH3UsEVv6ozpzazjP/kDDMvn5Df+B9sD7aGF8SmmnWUKzkP1Ymf0ZdO5vwh3a7JfquxuJesyvfa68PEn+Yq4YTcAnScg=;SPC_R_T_IV=NDh3aWhMTEhsR2c2ZTA3MA==;SPC_SEC_SI=v1-STlQSUFGbzZnWnlZNElrMiywl6tD6cxV34LPty99brp9ZvDQuQNqwLnyBspiJTI5j+doCfvoQhQ5+cPrzaYpuiZq1N3XbfGttQIszi1vFDA=;SPC_ST=.UjV4T1l3UmdpNUhpbGp4a73JUUmAEaCnfU/gHEtQkhuwwptWNGBvqkWLqEj3yqRkhj8y3jXdoyYWnN55CpsZiXKL3Zydhj0+E3Jvesw08JwElvsjcGCy2jWH7Wwk7dm0iPk8NYcHyuWWQNooRw9wK7Jbc0qzuo+Nn0Ez4sGha/Dg0nt8vFAEvZ+SP52KPK3ZpuXbh/8bFH2Qp9k65LmNnm8oZG4O93GrmZHgNTOmM5vC49XD4/Q0TPMSh+EX3PKmX6pm11OWawg7PavduNolow==;SPC_T_ID=f4kn4o3ZK3QoHsn3cYC4CtsCWvhxDlx7wBr0SZlUBP813KrSFCEbm+cLiXoHuxHsJ6MeNjU6dbwfFxhTH3UsEVv6ozpzazjP/kDDMvn5Df+B9sD7aGF8SmmnWUKzkP1Ymf0ZdO5vwh3a7JfquxuJesyvfa68PEn+Yq4YTcAnScg=;SPC_T_IV=NDh3aWhMTEhsR2c2ZTA3MA=='
    },
    payload: {
        voucher_promotionid: 1264977437802496,
        signature: "0ea42da369404d6f77b05f94d29c7fb3fb3ce4304a97eb936eb3942ddc4bdb63",
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
        console.log(`  node voucher_4_scheduler.js --once [--time=HH:MM:SS:mmm]    # Jalankan sekali pada waktu tertentu`);
        console.log(`  node voucher_4_scheduler.js --daily [--time=HH:MM:SS:mmm]   # Schedule harian pada waktu tertentu`);
        console.log(`  node voucher_4_scheduler.js --test                          # Test request sekarang`);
        console.log('');
        console.log('Contoh:');
        console.log(`  node voucher_4_scheduler.js --once                          # Default 18:00:00.000`);
        console.log(`  node voucher_4_scheduler.js --once --time=14:30:15:50       # Custom 14:30:15.050`);
        console.log(`  node voucher_4_scheduler.js --once --time=14:30:15          # Custom 14:30:15.000`);
        console.log(`  node voucher_4_scheduler.js --once --time=14:30             # Custom 14:30:00.000`);
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
