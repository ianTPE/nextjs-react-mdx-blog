"use client";

import APIEndpoint from './APIEndpoint';

export default function QueuePredictionEndpoint() {
  return (
    <APIEndpoint
      method="GET"
      path="/stores/{store_id}/queue-prediction"
      description="🔮 獲取店鋪的即時排隊預測和等待時間估算"
      parameters={[
        {
          name: "store_id",
          type: "integer",
          required: true,
          description: "店鋪的唯一識別碼"
        }
      ]}
      responses={[
        {
          status: 200,
          description: "成功獲取排隊預測數據",
          example: {
            success: true,
            data: {
              store_id: 1,
              store_name: "茶語時光 - 信義店",
              current_queue: {
                total_orders: 12,
                processing_orders: 3,
                pending_orders: 9
              },
              prediction: {
                estimated_wait_time: 25,
                confidence_level: 0.85,
                next_available_slot: "2025-06-15T11:30:00Z",
                peak_hours: [
                  "11:30-13:00",
                  "15:00-17:00",
                  "19:00-21:00"
                ]
              },
              queue_analysis: {
                average_order_time: 3.5,
                current_staff_count: 4,
                efficiency_score: 0.92,
                rush_hour_status: "moderate"
              },
              recommendations: [
                {
                  time_slot: "2025-06-15T14:00:00Z",
                  wait_time: 5,
                  recommendation: "最佳時段 - 人流較少"
                },
                {
                  time_slot: "2025-06-15T16:30:00Z", 
                  wait_time: 8,
                  recommendation: "次佳時段 - 適中人流"
                }
              ],
              last_updated: "2025-06-15T10:45:00Z"
            }
          }
        },
        {
          status: 404,
          description: "店鋪不存在",
          example: {
            success: false,
            error: "Store not found"
          }
        },
        {
          status: 503,
          description: "預測服務暫時不可用",
          example: {
            success: false,
            error: "Queue prediction service temporarily unavailable"
          }
        }
      ]}
      example={`curl -X GET "https://api.chayu-time.com/stores/1/queue-prediction" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}
    />
  );
}