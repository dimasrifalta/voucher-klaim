// Node.js High-Precision Scheduler - Voucher 1
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');

// Konfigurasi Voucher 3
const CONFIG = {
    voucherId: 3,
    url: 'https://shopee.co.id/api/v2/voucher_wallet/save_voucher',
    targetHour: 18,      // Jam eksekusi default (bisa diubah via parameter)
    targetMinute: 0,     // Menit eksekusi default (bisa diubah via parameter)
    targetSecond: 0,     // Detik eksekusi default (bisa diubah via parameter)
    targetMillisecond: 0, // Millisecond eksekusi default (bisa diubah via parameter)
    headers: {
        'Content-Type': 'application/json',
        'Cookie': 'SPC_EC=.NnFBdTF6N3Z1Q1FZemdMTKahlA/f0pdsIOdO7bfMZUNaiwHAbcLrA3ng56VA42V2RfzxBhr1uhDhnPNj9SoerNwBYsONYLs2O9YKMG6n60StVye0HSuBfMxrgTb1BCYLiZ/Syla8Lt+aeATz/UR8i7Ba2srzzktaeuByqExeFU4X94xuEOV5WyTqfOpWOV8Ml58lMbAw6pa6cNHIuZwy64zruJlqkHNQxh52n1aWyA2+MULuTVJCripEN1WSuhPB;shopee_webUnique_ccd=6HlDvCeZRRKEMS%2FIyCAHpA%3D%3D%7C%2F3XSv1s2LLFZRXvdtbO00DndL5O%2FZPkGurh1%2BkmwE5y%2BmxinFqvqKZfNkCxrUFD%2BvERaOnYvb2IZgUpk%7Cd6xwQEAdisEDofxV%7C08%7C3;SPC_U=197644546;_QPWSDCXHZQA=30e4e084-1f75-4cff-c405-23c74d259d89;SPC_IA=1;_ga=GA1.3.1785154148.1728259408;SPC_SI=CEB3aAAAAAA1Y254Zm10S2mSKgMAAAAAUE1KRVNtVWU=;_ga_8TJ45E514C=GS1.1.1744553054.1.0.1744553055.59.0.0;csrftoken=ocFHJEHsQhLRkp4kiLDCp4A3zH1phZ5M;ds=30ad4800058e6fb8cf3c8b746f6b16b9;_fbc=fb.2.1750508542635.PAQ0xDSwLDg0NleHRuA2FlbQEwAGFkaWQBqxT9Y-QJ4wGnheatiZhjQ_4iHU1-wqrpz-lVL1AW--co2WTR5QT2nlKbJ8btHlRBrlcVjYQ_aem_9KgO4HrTT4HACwXNfqF7Xg;_ga_SW6D8G0HXK=GS2.1.s1750550588$o148$g1$t1750550588$j60$l0$h0;_fbp=fb.2.1728258689216.516011602901317675;_gcl_au=1.1.201036373.1753378052;_sapid=e00a8b199d28887ee557471bbb8a09d949fdc34845dc405ed2efb494;REC7iLP4Q=167e91c4-2aee-453d-9e0c-54a644ff5e35;REC_T_ID=97d49245-8115-11ef-8731-0a1018c31593;SPC_CLIENTID=eL8Y2TKrrae6VnNEheqsgilzdgkjpkrn;SPC_F=eL8Y2TKrrae6VnNEvFdK2VhWv9ZpBZBn;SPC_R_T_ID=8VfJbrU4evhIB3E7WdpWiRp6HVcRbxoRaRAo+jFGb5gP02IhZ0mJc3JQGbTwCRiDkjrwizqiJ8QcJf43zSj+GXyZBu88imEFKcgLCxbjKjRxdeTeHNoJGUzPTgeQGQPIA9SGne1kurNt8Z1ycMXxZhGKfIEPySrTVgXlfz7oxQw=;SPC_R_T_IV=MW1OcXBBVXd6cDhiWUNkMg==;SPC_SEC_SI=v1-WkRzcFp2ZW1iMWRwSTRuNfw4a9LpS9Vs6xqhNAdoi2gSXlID185Ob2pZjVLO9+hHfT95J86d+JRhpUC2lrSpAxXOV9hYpEUT+E/sEab1Yk0=;SPC_ST=.a3lpUlZLeEkzTm82YUlhTasVSRG1n+lFZYjwHx5wD0WgzEeZ/DVfL3fOzn2OLsI7TdKoiIJsf9zVhLDXOFbVNkH82oxhcYi8+TzWG2sBLk8xve7OlV9uB+9LGJay76AXHgefjP5q80JiCVCKrXijQzMJwjF5Eh2N1RVkrZm7d8u1xByyq0FWVzfC8jTyRBLdt2gdxwxp5H6gbKJ1FT1KP6yNz8eInR04cn4VUdNhq4w4Fwy8lp8oT1PCApDtELRY;SPC_T_ID=8VfJbrU4evhIB3E7WdpWiRp6HVcRbxoRaRAo+jFGb5gP02IhZ0mJc3JQGbTwCRiDkjrwizqiJ8QcJf43zSj+GXyZBu88imEFKcgLCxbjKjRxdeTeHNoJGUzPTgeQGQPIA9SGne1kurNt8Z1ycMXxZhGKfIEPySrTVgXlfz7oxQw=;SPC_T_IV=MW1OcXBBVXd6cDhiWUNkMg=='
    },
    payload: {
        voucher_promotionid: 1216541983784960,
        signature: "259bae137d5da67a0de25b3f4eb9660033760c93d1ee58e54c1a22ea6d07e746",
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
