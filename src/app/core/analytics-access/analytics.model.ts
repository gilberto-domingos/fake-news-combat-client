export interface AnalyticsCrtDto {
  route: string;
  timestamp: string;
  userAgent: string;
  language: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  timezone: string;
  sessionId: string;
  fingerprint: string;
  authenticateUserId?: string;
}
