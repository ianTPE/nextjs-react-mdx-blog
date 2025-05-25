# 圖表組件使用說明

## 安裝依賴

在您的Next.js項目根目錄運行：

```bash
npm install chart.js
# 或
yarn add chart.js
```

## 圖表組件說明

### 已創建的圖表組件：

1. **MarketGrowthChart** - 市場規模增長趨勢圖
2. **OpportunityRankingChart** - 8大應用領域機會排名圖
3. **EfficiencyComparisonChart** - 低代碼vs傳統開發效率對比圖
4. **IncomeProgressionChart** - 收入潛力進展圖
5. **AdoptionTrendChart** - 企業採用趨勢圖
6. **SkillsDemandChart** - 技能需求熱度圖
7. **ToolsTable** - 工具選擇矩陣表格

## 圖表位置說明

圖表已經整合到MDX文章的以下位置：

- **MarketGrowthChart**: 在「市場現況」章節，展示市場規模增長
- **AdoptionTrendChart**: 在「公民開發者的崛起」部分
- **OpportunityRankingChart**: 在「八大應用領域」開頭
- **IncomeProgressionChart**: 在「選擇正確的賽道」部分
- **EfficiencyComparisonChart**: 在「差異化競爭策略」部分
- **SkillsDemandChart**: 在「平台選擇建議」後面
- **ToolsTable**: 在「工具選擇矩陣」部分

## 樣式說明

所有圖表組件都使用了：
- Tailwind CSS類名進行樣式設計
- 響應式設計（移動端友好）
- 統一的配色方案和視覺風格
- 每個圖表都包含標題、副標題和關鍵洞察

## 注意事項

1. 確保您的Next.js項目支持客戶端組件（'use client'）
2. 圖表會自動適應容器大小
3. 圖表數據可以在各個組件中直接修改
4. 如需調整樣式，可以修改組件中的Tailwind類名

## 預覽效果

運行您的Next.js開發服務器：

```bash
npm run dev
# 或
yarn dev
```

然後訪問您的文章頁面即可看到所有圖表效果。
