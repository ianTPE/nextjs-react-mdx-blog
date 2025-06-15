"use client";

import APIEndpoint from './APIEndpoint';

export default function GetUserOrdersEndpoint() {
  return (
    <APIEndpoint
      method="GET"
      path="/orders/user/{user_id}"
      description="獲取指定用戶的所有訂單記錄"
      parameters={[
        {
          name: "user_id",
          type: "integer",
          required: true,
          description: "用戶的唯一識別碼"
        }
      ]}
      responses={[
        {
          status: 200,
          description: "成功獲取用戶訂單",
          example: {
            success: true,
            data: [
              {
                id: 1,
                user_id: 123,
                store_name: "茶語時光 - 信義店",
                items: [
                  {
                    product_name: "珍珠奶茶",
                    quantity: 2,
                    price: 60
                  }
                ],
                total_amount: 120,
                status: "completed",
                order_time: "2025-06-15T10:30:00Z",
                pickup_time: "2025-06-15T11:00:00Z"
              }
            ],
            total: 1
          }
        },
        {
          status: 404,
          description: "用戶不存在",
          example: {
            success: false,
            error: "User not found"
          }
        }
      ]}
      example={`curl -X GET "https://api.chayu-time.com/orders/user/123" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}
    />
  );
}