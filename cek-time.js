
// file: cek-waktu.js
import https from "node:https";

const URL = "https://time.google.com";

https.get(URL, (res) => {
  const dateHeader = res.headers["date"];
  if (!dateHeader) {
    console.error("Tidak ada header Date dari server.");
    process.exit(1);
  }

  // Waktu dari Google (UTC)
  const serverTime = new Date(dateHeader);

  // Waktu lokal container (UTC)
  const localTime = new Date();

  // Selisih dalam ms
  const diffMs = localTime.getTime() - serverTime.getTime();

  console.log("Server time (UTC):", serverTime.toISOString());
  console.log("Local  time (UTC):", localTime.toISOString());
  console.log(
    `Difference: ${diffMs} ms (${diffMs >= 0 ? "lokal lebih cepat" : "lokal lebih lambat"})`
  );
}).on("error", (err) => {
  console.error("Error:", err);
});
