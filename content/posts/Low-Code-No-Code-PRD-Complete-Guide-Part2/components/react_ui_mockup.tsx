'use client';
"use client";

import React, { useState } from 'react';
import { Settings, AlertCircle, Tag, MessageSquare, Edit3, Mail, Clock, User, ChevronDown } from 'lucide-react';

// 型別定義
type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

type BadgeProps = BaseProps & {
  variant?: 'default' | 'destructive' | 'secondary' | 'outline';
};

type ButtonProps = BaseProps & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

// 由於我們沒有完整安裝 shadcn/ui，這裡使用 Tailwind CSS 來模擬元件
// 自定義元件實現
const Alert: React.FC<BaseProps> = ({ className = "", children }) => (
  <div className={`relative w-full rounded-lg border border-gray-200 p-4 ${className}`}>
    {children}
  </div>
);

const AlertDescription: React.FC<BaseProps> = ({ className = "", children }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);

const Badge: React.FC<BadgeProps> = ({ variant = 'default', className = "", children }) => {
  const variantStyles: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    destructive: 'bg-red-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 bg-transparent'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  variant = 'default', 
  size = 'default', 
  className = "", 
  children, 
  ...props 
}) => {
  const variantStyles: Record<string, string> = {
    default: 'bg-gray-900 text-white hover:bg-gray-800',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
    link: 'text-blue-500 underline-offset-4 hover:underline'
  };
  
  const sizeStyles: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-8',
    icon: 'h-10 w-10'
  };
  
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<BaseProps> = ({ className = "", children }) => (
  <div className={`rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<BaseProps> = ({ className = "", children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<BaseProps> = ({ className = "", children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardDescription: React.FC<BaseProps> = ({ className = "", children }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

const CardContent: React.FC<BaseProps> = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Input: React.FC<BaseProps & React.InputHTMLAttributes<HTMLInputElement>> = ({ 
  className = "", 
  ...props 
}) => (
  <input 
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} 
    {...props} 
  />
);

const Label: React.FC<BaseProps & React.LabelHTMLAttributes<HTMLLabelElement>> = ({ 
  className = "", 
  children, 
  ...props 
}) => (
  <label 
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} 
    {...props}
  >
    {children}
  </label>
);

// Select 相關元件已移除，改用原生 HTML select 元素

const Textarea: React.FC<BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ 
  className = "", 
  ...props 
}) => (
  <textarea 
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} 
    {...props} 
  />
);

const Separator: React.FC<BaseProps> = ({ className = "" }) => (
  <div className={`shrink-0 bg-gray-200 h-[1px] w-full ${className}`} />
);

const TicketDetailMockup = () => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [assignedAgent, setAssignedAgent] = useState('');
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* 頁面標題 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">工單詳情頁原型</h1>
        <p className="text-gray-600">使用 shadcn/ui 組件庫製作的高保真介面原型</p>
      </div>
      
      {/* 主要内容区域 */}
      <div className="space-y-6">
        
        {/* 區域A: 狀態標籤 */}
        <Alert className="border-2 border-dashed border-red-300 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">區域 A: 狀態標籤</span>
              <span className="text-xs text-red-600">顏色編碼：紅色=高優先級</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                高優先級
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                處理中
              </Badge>
              <Badge variant="outline" className="">
                INC-20250601-001
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        {/* 工單基本資訊卡片 */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Tag className="w-5 h-5" />
              工單基本資訊
            </CardTitle>
            <CardDescription className="text-gray-500">
              客戶提交的問題詳細資訊
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticket-id" className="text-sm font-medium">工單編號</Label>
                <Input 
                  id="ticket-id" 
                  value="INC-20250601-001" 
                  readOnly 
                  className="bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-email" className="text-sm font-medium">客戶信箱</Label>
                <div className="flex">
                  <Mail className="w-4 h-4 mt-3 mr-2 text-gray-500" />
                  <Input 
                    id="customer-email" 
                    value="user@domain.com" 
                    readOnly 
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">問題描述</Label>
                <Textarea 
                  id="description"
                  value="無法登入系統，顯示'使用者名稱或密碼錯誤'，但確認密碼正確。嘗試過重設密碼但仍然無法登入。"
                  readOnly
                  className="bg-gray-50 min-h-[80px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 區域B: 分配客服選擇器 */}
        <Alert className="border-2 border-dashed border-blue-300 bg-blue-50">
          <Settings className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">區域 B: 分配客服選擇器</span>
              <Badge variant="secondary" className="text-xs">
                僅管理員可見
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <Label htmlFor="assign-agent" className="text-sm font-medium">
                分配給：
              </Label>
              <div className="relative">
                <select 
                  value={assignedAgent} 
                  onChange={(e) => setAssignedAgent(e.target.value)}
                  className="w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm appearance-none"
                >
                  <option value="">選擇客服</option>
                  <option value="agent-a">客服A@company.com</option>
                  <option value="agent-b">客服B@company.com</option>
                  <option value="agent-c">客服C@company.com</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              <Badge variant="outline" className="bg-yellow-100">
                管理員權限
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        {/* 備註歷史 */}
        <Card className="bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              備註歷史
            </CardTitle>
            <CardDescription className="text-gray-500">
              工單處理過程中的所有備註和更新
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">客服A</Badge>
                    <span className="text-sm text-gray-600">2025-06-01 14:30</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">已聯繫客戶，正在協助重置密碼。客戶確認收到重置電郵。</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">系統</Badge>
                    <span className="text-sm text-gray-600">2025-06-01 10:15</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">工單已建立並自動分配給客服團隊。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 按鈕C: 添加備註 */}
        <Alert className="border-2 border-dashed border-purple-300 bg-purple-50">
          <Edit3 className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-700">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">按鈕 C: 添加備註</span>
              <span className="text-xs text-purple-600">點擊展開富文本編輯器</span>
            </div>
            
            {!isEditingNote ? (
              <Button
                onClick={() => setIsEditingNote(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                + 添加備註
              </Button>
            ) : (
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">富文本編輯器區域</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="new-note" className="text-sm font-medium">備註內容</Label>
                    <Textarea
                      id="new-note"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="輸入備註內容..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      儲存備註
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => {setIsEditingNote(false); setNewNote('');}}
                    >
                      取消
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </AlertDescription>
        </Alert>
      </div>

      <Separator className="my-8" />

      {/* 標注說明 */}
      <Card className="mt-6 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">📋 原型標注說明</CardTitle>
          <CardDescription className="text-gray-500">
            各個區域的功能說明和實現要點
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded mt-1"></div>
              <div>
                <Badge variant="destructive" className="mb-2">區域A</Badge>
                <p className="text-sm text-gray-600">狀態標籤區域，使用 Badge 組件顯示優先級和狀態</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-blue-200 border-2 border-blue-400 rounded mt-1"></div>
              <div>
                <Badge variant="secondary" className="mb-2">區域B</Badge>
                <p className="text-sm text-gray-600">客服分配選擇器，使用 Select 組件，含權限控制</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-4 h-4 bg-purple-200 border-2 border-purple-400 rounded mt-1"></div>
              <div>
                <Badge variant="outline" className="mb-2">按鈕C</Badge>
                <p className="text-sm text-gray-600">添加備註功能，使用 Button 和 Textarea 組件</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技術說明 */}
      <Alert className="mt-4">
        <Tag className="h-4 w-4" />
        <AlertDescription>
          <h4 className="font-semibold mb-2">💡 shadcn/ui 組件優勢</h4>
          <ul className="text-sm space-y-1">
            <li>• <strong>一致性:</strong> 遵循設計系統，確保視覺統一</li>
            <li>• <strong>可訪問性:</strong> 內置 ARIA 支援，符合無障礙標準</li>
            <li>• <strong>可定制:</strong> 基於 Tailwind CSS，易於主題化</li>
            <li>• <strong>重複使用性:</strong> 組件可以在不同視圖間重複使用</li>
            <li>• <strong>高品質:</strong> TypeScript 支援，組件品質有保障</li>
            <li>• <strong>生產就緒:</strong> 原型可直接用於產品開發</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TicketDetailMockup;