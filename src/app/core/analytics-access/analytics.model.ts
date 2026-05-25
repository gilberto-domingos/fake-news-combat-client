export interface AnalyticsCrtDto {
  route: string;
  timestamp: string;
  user_agent: string;
  language: string;
  platform: string;
  screen_width: number;
  screen_height: number;
  timezone: string;
  sessionId: string;
  fingerprint: string;
  authenticate_user_id?: string;
}
