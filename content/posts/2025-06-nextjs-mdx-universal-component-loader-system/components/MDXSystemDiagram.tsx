"use client";

import React from 'react';

const MDXSystemDiagram: React.FC = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto'
    },
    diagramSection: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease'
    },
    sectionHeader: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '15px 20px',
      fontWeight: 'bold',
      fontSize: '18px',
      textAlign: 'center' as const
    },
    sectionContent: {
      padding: '20px'
    },
    codeBlock: {
      background: '#282c34',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    codeHeader: {
      background: '#21252b',
      color: '#abb2bf',
      padding: '8px 15px',
      fontSize: '12px',
      borderBottom: '1px solid #3e4451',
      display: 'flex',
      alignItems: 'center',
      position: 'relative' as const
    },
    pre: {
      margin: 0,
      padding: '20px',
      background: '#282c34',
      color: '#abb2bf',
      fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
      fontSize: '14px',
      lineHeight: 1.6,
      overflowX: 'auto' as const
    },
    loaderFlow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginTop: '15px'
    },
    flowStep: {
      background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center' as const,
      position: 'relative' as const,
      boxShadow: '0 5px 15px rgba(116, 185, 255, 0.3)'
    },
    flowStepH4: {
      fontSize: '16px',
      marginBottom: '10px',
      borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
      paddingBottom: '8px',
      margin: '0 0 10px 0'
    },
    flowStepUl: {
      listStyle: 'none',
      fontSize: '13px',
      padding: 0,
      margin: 0
    },
    flowStepLi: {
      margin: '5px 0',
      paddingLeft: '15px',
      position: 'relative' as const
    },
    arrowDown: {
      textAlign: 'center' as const,
      fontSize: '24px',
      color: '#667eea',
      margin: '15px 0'
    },
    finalFlow: {
      background: 'linear-gradient(45deg, #00b894, #00cec9)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center' as const,
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 5px 15px rgba(0, 184, 148, 0.3)'
    },
    flowArrow: {
      display: 'inline-block',
      margin: '0 10px',
      fontSize: '20px'
    }
  };

  return (
    <>
      <style>{`
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
        
        @keyframes slideRight {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        
        .bounce-animation {
          animation: bounce 2s infinite;
        }
        
        .slide-animation {
          animation: slideRight 2s infinite;
        }
        
        .diagram-section:hover {
          transform: translateY(-5px);
        }
        

        
        .flow-step-li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #fff;
        }
        
        @media (max-width: 768px) {
          .loader-flow {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={styles.container}>
        {/* 文章結構部分 */}
        <div className="diagram-section" style={styles.diagramSection}>
          <div style={styles.sectionHeader}>
            📁 MDX 文章結構
          </div>
          <div style={styles.sectionContent}>
            <div style={styles.codeBlock}>
              <div className="code-header" style={styles.codeHeader}>
                📁 目錄結構
              </div>
              <pre style={styles.pre}><code>{`content/posts/                                              
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

        <div className="bounce-animation" style={styles.arrowDown}>↓</div>

        {/* 通用組件加載器部分 */}
        <div className="diagram-section" style={styles.diagramSection}>
          <div style={styles.sectionHeader}>
            ⚙️ 通用組件加載器
          </div>
          <div style={styles.sectionContent}>
            <div className="loader-flow" style={styles.loaderFlow}>
              <div style={styles.flowStep}>
                <h4 style={styles.flowStepH4}>1. 文件系統掃描</h4>
                <ul style={styles.flowStepUl}>
                  <li className="flow-step-li" style={styles.flowStepLi}>檢測組件目錄</li>
                  <li className="flow-step-li" style={styles.flowStepLi}>驗證導出文件</li>
                </ul>
              </div>
              <div style={styles.flowStep}>
                <h4 style={styles.flowStepH4}>2. 智能映射生成</h4>
                <ul style={styles.flowStepUl}>
                  <li className="flow-step-li" style={styles.flowStepLi}>靜態映射表</li>
                  <li className="flow-step-li" style={styles.flowStepLi}>自動更新</li>
                </ul>
              </div>
              <div style={styles.flowStep}>
                <h4 style={styles.flowStepH4}>3. 動態加載</h4>
                <ul style={styles.flowStepUl}>
                  <li className="flow-step-li" style={styles.flowStepLi}>按需導入</li>
                  <li className="flow-step-li" style={styles.flowStepLi}>錯誤處理</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bounce-animation" style={styles.arrowDown}>↓</div>

        {/* 頁面渲染部分 */}
        <div className="diagram-section" style={styles.diagramSection}>
          <div style={styles.sectionHeader}>
            🎨 頁面渲染
          </div>
          <div style={styles.sectionContent}>
            <div style={styles.finalFlow}>
              全局組件 
              <span className="slide-animation" style={styles.flowArrow}>→</span> 
              自定義組件 
              <span className="slide-animation" style={styles.flowArrow}>→</span> 
              MDXRemote 
              <span className="slide-animation" style={styles.flowArrow}>→</span> 
              最終頁面
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MDXSystemDiagram;