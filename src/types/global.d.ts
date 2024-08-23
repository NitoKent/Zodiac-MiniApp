// src/types/global.d.ts
interface TelegramWebviewProxy {
  postEvent(eventType: string, eventData?: any): void;
}

interface Window {
  TelegramWebviewProxy?: TelegramWebviewProxy;
}
