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
  description: string;
  example: string;
};

const defaultData: SymbolEntry[] = [
  { id: '1', symbol: '/goal', description: '設定目標', example: '/goal <實現跨平台登入>' },
  { id: '2', symbol: '/feature', description: '描述功能', example: '/feature <OTP 驗證系統>' },
  { id: '3', symbol: '/flow', description: '定義流程', example: '/flow <註冊流程>' },
  { id: '4', symbol: '/strategy', description: '策略設計', example: '/strategy <產品進入市場策略>' },
  { id: '5', symbol: '/thesis', description: '主張立場', example: '/thesis <AI 將取代部分人類工作>' },
  { id: '6', symbol: '/question', description: '問題主模組', example: '/question <登入失敗率過高原因?>' },
  { id: '7', symbol: '/idea', description: '創意生成', example: '/idea <結合社群與電商>' },
  { id: '8', symbol: '/mechanism', description: '機制設計', example: '/mechanism <推薦演算法機制>' },
  { id: '9', symbol: '/system', description: '系統構成', example: '/system <教學內容推薦系統>' },
  { id: '10', symbol: '/pattern', description: '模式辨識', example: '/pattern <使用者行為模式>' },
  { id: '11', symbol: '/steps', description: '步驟定義', example: '/flow <登入流程> :: /steps <1. 輸入手機號碼…>' },
  { id: '12', symbol: '/phases', description: '階段劃分', example: '/strategy <導入策略> :: /phases <準備、測試、上線>' },
  { id: '13', symbol: '/components', description: '元件列舉', example: '/feature <OTP 功能> :: /components <輸入欄位、提交按鈕>' },
  { id: '14', symbol: '/methods', description: '方法定義', example: '/mechanism <排序演算法> :: /methods <A/B 測試、權重法>' },
  { id: '15', symbol: '/logic', description: '邏輯說明', example: '/flow <用戶驗證> :: /logic <前端驗證 + 後端比對>' },
  { id: '16', symbol: '/rules', description: '規則指定', example: '/system <投票系統> :: /rules <每人一天一次>' },
  { id: '17', symbol: '/cases', description: '案例列舉', example: '/pattern <詐騙行為> :: /cases <社交工程、假鏈接>' },
  { id: '18', symbol: '/conditions', description: '條件設定', example: '/flow <優惠觸發> :: /conditions <註冊滿三天且登入>' },
  { id: '19', symbol: '/states', description: '狀態描述', example: '/system <訂單流程> :: /states <已付款、配送中、完成>' },
  { id: '20', symbol: '/signals', description: '訊號定義', example: '/mechanism <自動報警> :: /signals <高溫、震動>' },
  { id: '21', symbol: '/channels', description: '通道配置', example: '/strategy <品牌宣傳> :: /channels <社群、廣告、KOL>' },
  { id: '22', symbol: '/agents', description: '代理者', example: '/system <推薦系統> :: /agents <使用者、演算法>' },
  { id: '23', symbol: '/outputs', description: '輸出定義', example: '/feature <報表功能> :: /outputs <PDF, CSV>' },
  { id: '24', symbol: '/inputs', description: '輸入來源', example: '/system <數據收集> :: /inputs <表單、API>' },
  { id: '25', symbol: '/timing', description: '時機控制', example: '/flow <推播通知> :: /timing <註冊成功後10分鐘>' },
  { id: '26', symbol: '/metrics', description: '指標衡量', example: '/strategy <成效追蹤> :: /metrics <轉換率、活躍數>' },
  { id: '27', symbol: '/limits', description: '限制條件', example: '/feature <密碼輸入> :: /limits <最多輸入5次>' },
  { id: '28', symbol: '/actions', description: '觸發行為', example: '/system <行為追蹤> :: /actions <點擊、滑動>' },
  { id: '29', symbol: '/roles', description: '角色劃分', example: '/system <協作平台> :: /roles <管理者、編輯者>' },
  { id: '30', symbol: '/tools', description: '工具清單', example: '/mechanism <開發流程> :: /tools <Git, Docker>' },
  { id: '31', symbol: '/why?', description: '原因釐清', example: '/flow <為何使用者中斷登入?> /why?' },
  { id: '32', symbol: '/how?', description: '方法探索', example: '/goal <提升留存率> /how?' },
  { id: '33', symbol: '/what if?', description: '假設推演', example: '/strategy <中止合作> /what if?' },
  { id: '34', symbol: '/compare?', description: '比較模組', example: '/pattern <A vs B 模式> /compare?' },
  { id: '35', symbol: '/clarify?', description: '細節澄清', example: '/feature <簡訊驗證> /clarify?' },
  { id: '36', symbol: '/risks?', description: '風險評估', example: '/goal <導入新支付> /risks?' },
  { id: '37', symbol: '/impact?', description: '影響探討', example: '/thesis <取消免運> /impact?' },
  { id: '38', symbol: '/who?', description: '角色查詢', example: '/system <違規行為監控> /who?' },
  { id: '39', symbol: '/when?', description: '時序確認', example: '/flow <優惠發放> /when?' },
  { id: '40', symbol: '/cost?', description: '資源評估', example: '/strategy <導入AI> /cost?' },
  { id: '41', symbol: '/vs', description: '對比分析', example: '/thesis <AI 生成設計> /vs 手工設計' },
  { id: '42', symbol: '/misuse', description: '誤用情境', example: '/feature <AI 自動回應> /misuse <濫發訊息>' },
  { id: '43', symbol: '/flaws', description: '漏洞指出', example: '/mechanism <KYC 流程> /flaws <驗證不嚴>' },
  { id: '44', symbol: '/critique', description: '批判模組', example: '/strategy <免費方案> /critique <損耗營收>' },
  { id: '45', symbol: '/counterclaim', description: '反主張', example: '/thesis <鼓勵在家辦公> /counterclaim <降低團隊感>' },
  { id: '46', symbol: '/exception', description: '例外情況', example: '/rules <禁用連結> /exception <官方認證除外>' },
  { id: '47', symbol: '/debunk', description: '迷思破解', example: '/idea <密碼過期更安全> /debunk' },
  { id: '48', symbol: '/drawback', description: '缺點揭示', example: '/feature <自動翻譯> /drawback <詞意失準>' },
  { id: '49', symbol: '/bias', description: '偏誤檢視', example: '/system <推薦模型> /bias <熱門偏好偏差>' },
  { id: '50', symbol: '/paradox', description: '矛盾揭露', example: '/goal <簡化流程> /paradox <步驟反而變多>' },
  { id: '51', symbol: '//語言', description: '設定語言', example: '//語言: 繁體中文' },
  { id: '52', symbol: '//格式', description: '設定輸出格式', example: '//格式: Markdown 表格' },
  { id: '53', symbol: '//風格', description: '語氣與風格', example: '//風格: 技術性' },
  { id: '54', symbol: '//篇幅', description: '控制長度', example: '//篇幅: 簡要' },
  { id: '55', symbol: '//語調', description: '調整語氣', example: '//語調: 親切' },
  { id: '56', symbol: '//技術層級', description: '技術深度', example: '//技術層級: 初學者' },
  { id: '57', symbol: '//摘要長度', description: '摘要大小', example: '//摘要長度: 100字' },
  { id: '58', symbol: '//程式語言', description: '指定語言', example: '//程式語言: TypeScript' },
  { id: '59', symbol: '//附註', description: '額外說明', example: '//附註: 可複用於多平台' },
  { id: '60', symbol: '//用途', description: '應用場景', example: '//用途: API 開發' },
  { id: '61', symbol: '<>', description: '主體包裝', example: '/goal <建立驗證機制>' },
  { id: '62', symbol: '::', description: '子模組連結', example: '/feature <驗證流程> :: /steps <輸入→驗證>' },
  { id: '63', symbol: '?', description: '問句模組符號', example: '/flow <註冊轉換低> ? 為什麼？' },
  { id: '64', symbol: '><', description: '對立與反駁', example: '/thesis <MFA 有必要> >< 不利用戶體驗' },
  { id: '65', symbol: '//', description: '輸出樣式控制', example: '//語言: 繁體中文' },
  { id: '66', symbol: '{}', description: '參數封裝', example: '/verify { phone, otp }' },
  { id: '67', symbol: '[]', description: '可選參數', example: '/flow <選填地址> [省略可跳過]' },
  { id: '68', symbol: '()', description: '邏輯補充', example: '/pattern <購物行為> (折扣期間特別高)' },
  { id: '69', symbol: ';', description: '模組串聯', example: '/goal <提高轉換>; /strategy <簡化流程>' },
  { id: '70', symbol: '#', description: '標籤標示', example: '#行銷 #用戶研究' },
  { id: '71', symbol: '/prompt', description: '定義模型使用提示語句', example: '/prompt <請分析以下資料並給出建議>' },
  { id: '72', symbol: '/schema', description: '規範資料格式', example: '/schema <{name: string, age: number}>' },
  { id: '73', symbol: '/task', description: '指定具體任務', example: '/task <完成訂單匯出功能>' },
  { id: '74', symbol: '/dataset', description: '引用資料來源', example: '/dataset <2023年消費紀錄>' },
  { id: '75', symbol: '/validation', description: '定義檢查規則', example: '/validation <長度需滿6碼>' },
  { id: '76', symbol: '/fallback', description: '系統失敗時的備案', example: '/fallback <顯示預設訊息>' },
  { id: '77', symbol: '/trigger', description: '引發事件的規則', example: '/trigger <使用者登入成功後>' },
  { id: '78', symbol: '/context', description: '定義背景情境', example: '/context <針對新手使用者的說明頁>' },
  { id: '79', symbol: '/timeline', description: '描述事件順序', example: '/timeline <1. 建立帳號 → 2. 收到信件>' },
  { id: '80', symbol: '/roleplay', description: '模擬特定角色對話', example: '/roleplay <你是一位資深設計顧問>' },
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
  columnHelper.accessor('description', {
    header: () => '功能描述',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('example', {
    header: () => '使用範例',
    cell: info => <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-sm font-mono text-pink-600 dark:text-pink-400 whitespace-pre-wrap break-all">{info.getValue()}</code>,
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
    <div className="overflow-x-auto">
      <div className="my-6 not-prose">
        <table className="min-w-[768px] divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
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
    </div>
  );
};

export default ParserPromptingSymbolSystemTable;
