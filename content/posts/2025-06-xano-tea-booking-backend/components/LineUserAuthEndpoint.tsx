"use client";

import APIEndpoint from './APIEndpoint';

export default function LineUserAuthEndpoint() {
  return (
    <APIEndpoint
      method="GET"
      path="/auth/user/{line_user_id}"
      description="通過 LINE User ID 獲取用戶認證信息和個人資料"
      parameters={[
        {
          name: "line_user_id",
          type: "string",
          required: true,
          description: "LINE 平台的用戶唯一識別碼"
        }
      ]}
      responses={[
        {
          status: 200,
          description: "成功獲取用戶認證信息",
          example: {
            success: true,
            data: {
              user_id: 123,
              line_user_id: "U1234567890abcdef1234567890abcdef1",
              profile: {
                display_name: "張小明",
                picture_url: "https://profile.line-scdn.net/...",
                status_message: "喝茶是生活的藝術 🍵"
              },
              account_status: {
                is_verified: true,
                registration_date: "2025-01-15T08:30:00Z",
                last_login: "2025-06-15T09:45:00Z",
                total_orders: 25
              },
              preferences: {
                favorite_store_id: 3,
                notification_enabled: true,
                loyalty_points: 450,
                membership_tier: "silver"
              },
              auth_token: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                expires_in: 3600,
                token_type: "Bearer"
              }
            }
          }
        },
        {
          status: 404,
          description: "LINE 用戶不存在或未註冊",
          example: {
            success: false,
            error: "LINE user not found",
            code: "USER_NOT_REGISTERED",
            message: "此 LINE 用戶尚未註冊茶語時光服務"
          }
        },
        {
          status: 403,
          description: "用戶帳號被停用",
          example: {
            success: false,
            error: "Account suspended",
            code: "ACCOUNT_SUSPENDED",
            message: "此帳號因違反服務條款而被暫時停用"
          }
        },
        {
          status: 401,
          description: "LINE Token 驗證失敗",
          example: {
            success: false,
            error: "Invalid LINE credentials",
            code: "INVALID_LINE_TOKEN",
            message: "LINE 認證憑證無效或已過期"
          }
        }
      ]}
      example={`curl -X GET "https://api.chayu-time.com/auth/user/U1234567890abcdef1234567890abcdef1" \\
  -H "Authorization: Bearer LINE_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "X-Line-Channel-Id: YOUR_CHANNEL_ID"`}
    />
  );
}