export interface AnalyticsResDto {
  id: string;
  route: string;
  timestamp: string;
  city: string;
  user_agent: string;
  language: string;
  platform: string;
  screen_width: number;
  screen_height: number;
  timezone: string;
  sessionId: string;
  fingerprint: string;
  ip_address: string;
  country: string;
  bot_detection: boolean;
  authenticate_user_id?: string;
}
