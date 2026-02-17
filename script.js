function getLocation() {
  if (!navigator.geolocation) {
    document.getElementById("result").textContent =
      "このブラウザは位置情報に対応していません";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const acc = position.coords.accuracy;

      document.getElementById("result").textContent =
        `緯度: ${lat}\n経度: ${lon}\n精度: ±${acc}m`;
    },
    (error) => {
      document.getElementById("result").textContent =
        "拒否されました / エラー: " + error.message;
    }
  );
}
