import React from 'react';

const MDXSystemDiagram: React.FC = () => {
  return (
    <>
      <style jsx>{`
        .container {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .diagram-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .diagram-section:hover {
          transform: translateY(-5px);
        }

        .section-header {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 15px 20px;
          font-weight: bold;
          font-size: 18px;
          text-align: center;
        }

        .section-content {
          padding: 20px;
        }

        .code-block {
          background: #282c34;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .code-header {
          background: #21252b;
          color: #abb2bf;
          padding: 8px 15px;
          font-size: 12px;
          border-bottom: 1px solid #3e4451;
          display: flex;
          align-items: center;
        }

        .code-header::before {
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff5f56;
          margin-right: 8px;
          box-shadow: 18px 0 0 #ffbd2e, 36px 0 0 #27ca3f;
        }

        pre {
          margin: 0;
          padding: 20px;
          background: #282c34;
          color: #abb2bf;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
          overflow-x: auto;
        }

        code {
          font-family: inherit;
        }

        .loader-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .flow-step {
          background: linear-gradient(135deg, #74b9ff, #0984e3);
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          position: relative;
          box-shadow: 0 5px 15px rgba(116, 185, 255, 0.3);
        }

        .flow-step h4 {
          font-size: 16px;
          margin-bottom: 10px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          padding-bottom: 8px;
        }

        .flow-step ul {
          list-style: none;
          font-size: 13px;
        }

        .flow-step li {
          margin: 5px 0;
          padding-left: 15px;
          position: relative;
        }

        .flow-step li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #fff;
        }

        .arrow-down {
          text-align: center;
          font-size: 24px;
          color: #667eea;
          margin: 15px 0;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .final-flow {
          background: linear-gradient(45deg, #00b894, #00cec9);
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0, 184, 148, 0.3);
        }

        .flow-arrow {
          display: inline-block;
          margin: 0 10px;
          font-size: 20px;
          animation: slideRight 2s infinite;
        }

        @keyframes slideRight {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        @media (max-width: 768px) {
          .loader-flow {
            grid-template-columns: 1fr;
          }
          
          .section-header {
            font-size: 16px;
          }
          
          pre {
            font-size: 12px;
            padding: 15px;
          }
        }
      `}</style>

      <div className="container">
        {/* 文章結構部分 */}
        <div className="diagram-section">
          <div className="section-header">
            📁 MDX 文章結構
          </div>
          <div className="section-content">
            <div className="code-block">
              <div className="code-header">
                📁 目錄結構
              </div>
              <pre><code>{`content/posts/                                              
├── article-1/                                              
│   ├── content.mdx                                         
│   ├── metadata.ts                                         
│   └── components/                                         
│       ├── index.ts           ← 組件導出文件                
│       ├── CustomChart.tsx                                 
│       └── DataTable.tsx                                   
└── article-2/                                              
    ├── content.mdx                                         
    └── metadata.ts             ← 無組件目錄`}</code></pre>
            </div>
          </div>
        </div>

        <div className="arrow-down">↓</div>

        {/* 通用組件加載器部分 */}
        <div className="diagram-section">
          <div className="section-header">
            ⚙️ 通用組件加載器
          </div>
          <div className="section-content">
            <div className="loader-flow">
              <div className="flow-step">
                <h4>1. 文件系統掃描</h4>
                <ul>
                  <li>檢測組件目錄</li>
                  <li>驗證導出文件</li>
                </ul>
              </div>
              <div className="flow-step">
                <h4>2. 智能映射生成</h4>
                <ul>
                  <li>靜態映射表</li>
                  <li>自動更新</li>
                </ul>
              </div>
              <div className="flow-step">
                <h4>3. 動態加載</h4>
                <ul>
                  <li>按需導入</li>
                  <li>錯誤處理</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="arrow-down">↓</div>

        {/* 頁面渲染部分 */}
        <div className="diagram-section">
          <div className="section-header">
            🎨 頁面渲染
          </div>
          <div className="section-content">
            <div className="final-flow">
              全局組件 
              <span className="flow-arrow">→</span> 
              自定義組件 
              <span className="flow-arrow">→</span> 
              MDXRemote 
              <span className="flow-arrow">→</span> 
              最終頁面
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MDXSystemDiagram;