import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type SymbolEntry = {
  id: string;
  symbol: string;
  moduleName: string;
  description: string;
  example: string;
  source: string;
};

const defaultData: SymbolEntry[] = [
  { id: '1', symbol: '/goal', moduleName: '設定目標', description: '設定目標', example: '/goal <實現跨平台登入>', source: '' },
  { id: '2', symbol: '/feature', moduleName: '描述功能', description: '描述功能', example: '/feature <OTP 驗證系統>', source: '' },
  { id: '3', symbol: '/flow', moduleName: '定義流程', description: '定義流程', example: '/flow <註冊流程>', source: '' },
  { id: '4', symbol: '/strategy', moduleName: '策略設計', description: '策略設計', example: '/strategy <產品進入市場策略>', source: '' },
  { id: '5', symbol: '/thesis', moduleName: '主張立場', description: '主張立場', example: '/thesis <AI 將取代部分人類工作>', source: '' },
  { id: '6', symbol: '/question', moduleName: '問題主模組', description: '問題主模組', example: '/question <登入失敗率過高原因?>', source: '' },
  { id: '7', symbol: '/idea', moduleName: '創意生成', description: '創意生成', example: '/idea <結合社群與電商>', source: '' },
  { id: '8', symbol: '/mechanism', moduleName: '機制設計', description: '機制設計', example: '/mechanism <推薦演算法機制>', source: '' },
  { id: '9', symbol: '/system', moduleName: '系統構成', description: '系統構成', example: '/system <教學內容推薦系統>', source: '' },
  { id: '10', symbol: '/pattern', moduleName: '模式辨識', description: '模式辨識', example: '/pattern <使用者行為模式>', source: '' },
  { id: '11', symbol: '/steps', moduleName: '步驟定義', description: '步驟定義', example: '/flow <登入流程> :: /steps <1. 輸入手機號碼…>', source: '' },
  { id: '12', symbol: '/phases', moduleName: '階段劃分', description: '階段劃分', example: '/strategy <導入策略> :: /phases <準備、測試、上線>', source: '' },
  { id: '13', symbol: '/components', moduleName: '元件列舉', description: '元件列舉', example: '/feature <OTP 功能> :: /components <輸入欄位、提交按鈕>', source: '' },
  { id: '14', symbol: '/methods', moduleName: '方法定義', description: '方法定義', example: '/mechanism <排序演算法> :: /methods <A/B 測試、權重法>', source: '' },
  { id: '15', symbol: '/logic', moduleName: '邏輯說明', description: '邏輯說明', example: '/flow <用戶驗證> :: /logic <前端驗證 + 後端比對>', source: '' },
  { id: '16', symbol: '/rules', moduleName: '規則指定', description: '規則指定', example: '/system <投票系統> :: /rules <每人一天一次>', source: '' },
  { id: '17', symbol: '/cases', moduleName: '案例列舉', description: '案例列舉', example: '/pattern <詐騙行為> :: /cases <社交工程、假鏈接>', source: '' },
  { id: '18', symbol: '/conditions', moduleName: '條件設定', description: '條件設定', example: '/flow <優惠觸發> :: /conditions <註冊滿三天且登入>', source: '' },
  { id: '19', symbol: '/states', moduleName: '狀態描述', description: '狀態描述', example: '/system <訂單流程> :: /states <已付款、配送中、完成>', source: '' },
  { id: '20', symbol: '/signals', moduleName: '訊號定義', description: '訊號定義', example: '/mechanism <自動報警> :: /signals <高溫、震動>', source: '' },
  { id: '21', symbol: '/channels', moduleName: '通道配置', description: '通道配置', example: '/strategy <品牌宣傳> :: /channels <社群、廣告、KOL>', source: '' },
  { id: '22', symbol: '/agents', moduleName: '代理者', description: '代理者', example: '/system <推薦系統> :: /agents <使用者、演算法>', source: '' },
  { id: '23', symbol: '/outputs', moduleName: '輸出定義', description: '輸出定義', example: '/feature <報表功能> :: /outputs <PDF, CSV>', source: '' },
  { id: '24', symbol: '/inputs', moduleName: '輸入來源', description: '輸入來源', example: '/system <數據收集> :: /inputs <表單、API>', source: '' },
  { id: '25', symbol: '/timing', moduleName: '時機控制', description: '時機控制', example: '/flow <推播通知> :: /timing <註冊成功後10分鐘>', source: '' },
  { id: '26', symbol: '/metrics', moduleName: '指標衡量', description: '指標衡量', example: '/strategy <成效追蹤> :: /metrics <轉換率、活躍數>', source: '' },
  { id: '27', symbol: '/limits', moduleName: '限制條件', description: '限制條件', example: '/feature <密碼輸入> :: /limits <最多輸入5次>', source: '' },
  { id: '28', symbol: '/actions', moduleName: '觸發行為', description: '觸發行為', example: '/system <行為追蹤> :: /actions <點擊、滑動>', source: '' },
  { id: '29', symbol: '/roles', moduleName: '角色劃分', description: '角色劃分', example: '/system <協作平台> :: /roles <管理者、編輯者>', source: '' },
  { id: '30', symbol: '/tools', moduleName: '工具清單', description: '工具清單', example: '/mechanism <開發流程> :: /tools <Git, Docker>', source: '' },
  { id: '31', symbol: '/why?', moduleName: '原因釐清', description: '原因釐清', example: '/flow <為何使用者中斷登入?> /why?', source: '' },
  { id: '32', symbol: '/how?', moduleName: '方法探索', description: '方法探索', example: '/goal <提升留存率> /how?', source: '' },
  { id: '33', symbol: '/what if?', moduleName: '假設推演', description: '假設推演', example: '/strategy <中止合作> /what if?', source: '' },
  { id: '34', symbol: '/compare?', moduleName: '比較模組', description: '比較模組', example: '/pattern <A vs B 模式> /compare?', source: '' },
  { id: '35', symbol: '/clarify?', moduleName: '細節澄清', description: '細節澄清', example: '/feature <簡訊驗證> /clarify?', source: '' },
  { id: '36', symbol: '/risks?', moduleName: '風險評估', description: '風險評估', example: '/goal <導入新支付> /risks?', source: '' },
  { id: '37', symbol: '/impact?', moduleName: '影響探討', description: '影響探討', example: '/thesis <取消免運> /impact?', source: '' },
  { id: '38', symbol: '/who?', moduleName: '角色查詢', description: '角色查詢', example: '/system <違規行為監控> /who?', source: '' },
  { id: '39', symbol: '/when?', moduleName: '時序確認', description: '時序確認', example: '/flow <優惠發放> /when?', source: '' },
  { id: '40', symbol: '/cost?', moduleName: '資源評估', description: '資源評估', example: '/strategy <導入AI> /cost?', source: '' },
  { id: '41', symbol: '/vs', moduleName: '對比分析', description: '對比分析', example: '/thesis <AI 生成設計> /vs 手工設計', source: '' },
  { id: '42', symbol: '/misuse', moduleName: '誤用情境', description: '誤用情境', example: '/feature <AI 自動回應> /misuse <濫發訊息>', source: '' },
  { id: '43', symbol: '/flaws', moduleName: '漏洞指出', description: '漏洞指出', example: '/mechanism <KYC 流程> /flaws <驗證不嚴>', source: '' },
  { id: '44', symbol: '/critique', moduleName: '批判模組', description: '批判模組', example: '/strategy <免費方案> /critique <損耗營收>', source: '' },
  { id: '45', symbol: '/counterclaim', moduleName: '反主張', description: '反主張', example: '/thesis <鼓勵在家辦公> /counterclaim <降低團隊感>', source: '' },
  { id: '46', symbol: '/exception', moduleName: '例外情況', description: '例外情況', example: '/rules <禁用連結> /exception <官方認證除外>', source: '' },
  { id: '47', symbol: '/debunk', moduleName: '迷思破解', description: '迷思破解', example: '/idea <密碼過期更安全> /debunk', source: '' },
  { id: '48', symbol: '/drawback', moduleName: '缺點揭示', description: '缺點揭示', example: '/feature <自動翻譯> /drawback <詞意失準>', source: '' },
  { id: '49', symbol: '/bias', moduleName: '偏誤檢視', description: '偏誤檢視', example: '/system <推薦模型> /bias <熱門偏好偏差>', source: '' },
  { id: '50', symbol: '/paradox', moduleName: '矛盾揭露', description: '矛盾揭露', example: '/goal <簡化流程> /paradox <步驟反而變多>', source: '' },
  { id: '51', symbol: '//語言', moduleName: '設定語言', description: '設定語言', example: '//語言: 繁體中文', source: '' },
  { id: '52', symbol: '//格式', moduleName: '設定輸出格式', description: '設定輸出格式', example: '//格式: Markdown 表格', source: '' },
  { id: '53', symbol: '//風格', moduleName: '語氣與風格', description: '語氣與風格', example: '//風格: 技術性', source: '' },
  { id: '54', symbol: '//篇幅', moduleName: '控制長度', description: '控制長度', example: '//篇幅: 簡要', source: '' },
  { id: '55', symbol: '//語調', moduleName: '調整語氣', description: '調整語氣', example: '//語調: 親切', source: '' },
  { id: '56', symbol: '//技術層級', moduleName: '技術深度', description: '技術深度', example: '//技術層級: 初學者', source: '' },
  { id: '57', symbol: '//摘要長度', moduleName: '摘要大小', description: '摘要大小', example: '//摘要長度: 100字', source: '' },
  { id: '58', symbol: '//程式語言', moduleName: '指定語言', description: '指定語言', example: '//程式語言: TypeScript', source: '' },
  { id: '59', symbol: '//附註', moduleName: '額外說明', description: '額外說明', example: '//附註: 可複用於多平台', source: '' },
  { id: '60', symbol: '//用途', moduleName: '應用場景', description: '應用場景', example: '//用途: API 開發', source: '' },
  { id: '61', symbol: '<>', moduleName: '主體包裝', description: '主體包裝', example: '/goal <建立驗證機制>', source: '' },
  { id: '62', symbol: '::', moduleName: '子模組連結', description: '子模組連結', example: '/feature <驗證流程> :: /steps <輸入→驗證>', source: '' },
  { id: '63', symbol: '?', moduleName: '問句模組符號', description: '問句模組符號', example: '/flow <註冊轉換低> ? 為什麼？', source: '' },
  { id: '64', symbol: '><', moduleName: '對立與反駁', description: '對立與反駁', example: '/thesis <MFA 有必要> >< 不利用戶體驗', source: '' },
  { id: '65', symbol: '//', moduleName: '輸出樣式控制', description: '輸出樣式控制', example: '//語言: 繁體中文', source: '' },
  { id: '66', symbol: '{}', moduleName: '參數封裝', description: '參數封裝', example: '/verify { phone, otp }', source: '' },
  { id: '67', symbol: '[]', moduleName: '可選參數', description: '可選參數', example: '/flow <選填地址> [省略可跳過]', source: '' },
  { id: '68', symbol: '()', moduleName: '邏輯補充', description: '邏輯補充', example: '/pattern <購物行為> (折扣期間特別高)', source: '' },
  { id: '69', symbol: ';', moduleName: '模組串聯', description: '模組串聯', example: '/goal <提高轉換>; /strategy <簡化流程>', source: '' },
  { id: '70', symbol: '#', moduleName: '標籤標示', description: '標籤標示', example: '#行銷 #用戶研究', source: '' },
  { id: '71', symbol: '/prompt', moduleName: '提示範本', description: '定義模型使用提示語句', example: '/prompt <請分析以下資料並給出建議>', source: '' },
  { id: '72', symbol: '/schema', moduleName: '結構模板', description: '規範資料格式', example: '/schema <{name: string, age: number}>', source: '' },
  { id: '73', symbol: '/task', moduleName: '任務目標', description: '指定具體任務', example: '/task <完成訂單匯出功能>', source: '' },
  { id: '74', symbol: '/dataset', moduleName: '資料集指定', description: '引用資料來源', example: '/dataset <2023年消費紀錄>', source: '' },
  { id: '75', symbol: '/validation', moduleName: '驗證條件', description: '定義檢查規則', example: '/validation <長度需滿6碼>', source: '' },
  { id: '76', symbol: '/fallback', moduleName: '回退策略', description: '系統失敗時的備案', example: '/fallback <顯示預設訊息>', source: '' },
  { id: '77', symbol: '/trigger', moduleName: '觸發條件', description: '引發事件的規則', example: '/trigger <使用者登入成功後>', source: '' },
  { id: '78', symbol: '/context', moduleName: '上下文說明', description: '定義背景情境', example: '/context <針對新手使用者的說明頁>', source: '' },
  { id: '79', symbol: '/timeline', moduleName: '時間軸模組', description: '描述事件順序', example: '/timeline <1. 建立帳號 → 2. 收到信件>', source: '' },
  { id: '80', symbol: '/roleplay', moduleName: '角色模擬', description: '模擬特定角色對話', example: '/roleplay <你是一位資深設計顧問>', source: '' },
];

const columnHelper = createColumnHelper<SymbolEntry>();

const columns = [
  columnHelper.accessor('id', {
    header: () => '編號',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('symbol', {
    header: () => '符號',
    cell: info => <strong className="font-semibold text-sky-600 dark:text-sky-400">{info.getValue()}</strong>,
  }),
  columnHelper.accessor('moduleName', {
    header: () => '模組名稱',
    cell: info => <strong className="font-semibold">{info.getValue()}</strong>,
  }),
  columnHelper.accessor('description', {
    header: () => '功能描述',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('example', {
    header: () => '使用範例',
    cell: info => <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-sm font-mono text-pink-600 dark:text-pink-400 whitespace-pre-wrap break-all">{info.getValue()}</code>,
  }),
  columnHelper.accessor('source', {
    header: () => '來源',
    cell: info => info.getValue(),
  }),
];

export const ParserPromptingSymbolSystemTable: React.FC = () => {
  const [data] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-6 overflow-x-auto not-prose">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <thead className="bg-slate-50 dark:bg-slate-800">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 align-top"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParserPromptingSymbolSystemTable;
