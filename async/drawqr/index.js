import QR from "wx_base64_qrcode";

let context;

worker.onMessage(e => {
  let { context, screenWidth } = e;
  context = QR.createQrCodeImg(context || 'https://cuvita.relubwu.com', screenWidth * 0.7);
  worker.postMessage({
    context
  });
});