#!/usr/bin/env bash
# Setup chrony agar sinkron ke time.google.com dengan tampilan offset ms
# Tested for Ubuntu/Debian

set -e

echo "=== 1. Update paket & install chrony ==="
sudo apt update -y
sudo apt install -y chrony

echo "=== 2. Set timezone ke Asia/Jakarta (boleh skip kalau mau) ==="
sudo timedatectl set-timezone Asia/Jakarta || true

echo "=== 3. Ubah konfigurasi /etc/chrony/chrony.conf agar pakai time.google.com ==="
CONF="/etc/chrony/chrony.conf"

# backup dulu
if [ ! -f "${CONF}.bak" ]; then
  sudo cp "$CONF" "${CONF}.bak"
fi

# kalau sudah ada baris server/pool default, kita ganti jadi time.google.com
# ini cara sederhana: kalau ada pool di baris awal, kita ganti
if grep -qE '^pool ' "$CONF"; then
  sudo sed -i 's/^pool .*/server time.google.com iburst/' "$CONF"
elif grep -qE '^server ' "$CONF"; then
  # kalau sudah ada server sebelumnya, tambahkan saja server baru
  echo "server time.google.com iburst" | sudo tee -a "$CONF" >/dev/null
else
  # kalau ga ada keduanya, ya tulis aja
  echo "server time.google.com iburst" | sudo tee -a "$CONF" >/dev/null
fi

echo "=== 4. Restart dan enable service chrony ==="
sudo systemctl restart chrony
sudo systemctl enable chrony

echo "=== 5. Paksa sinkronisasi sekarang (makestep) ==="
sudo chronyc makestep || true

echo "=== 6. Tampilkan status tracking chrony ==="
chronyc tracking

echo "=== 7. Tampilkan offset dalam milidetik ==="
chronyc tracking | awk -F': +' '/Last offset/ {printf("Last offset = %.3f ms\n", $2*1000)}'

echo "=== 8. Tampilkan sumber waktu yang aktif ==="
chronyc sources -v || true

echo
echo "Selesai. Kalau ingin monitor offset terus-menerus, jalankan:"
echo 'while true; do offset=$(chronyc tracking | awk -F": +" "/Last offset/ {printf(\"%.3f\", \$2*1000)}"); echo "$(date +%Y-%m-%d\ %T.%3N) offset=${offset} ms"; sleep 5; done'
