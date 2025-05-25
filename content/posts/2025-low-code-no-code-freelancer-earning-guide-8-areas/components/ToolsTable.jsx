export default function ToolsTable() {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">應用類型</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">推薦工具</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">學習曲線</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">市場需求</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">電商平台</td>
            <td className="px-6 py-4 whitespace-nowrap">Shopify、Bubble</td>
            <td className="px-6 py-4 whitespace-nowrap">中等</td>
            <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐⭐⭐</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">內部工具</td>
            <td className="px-6 py-4 whitespace-nowrap">Retool、Appsmith</td>
            <td className="px-6 py-4 whitespace-nowrap">較高</td>
            <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐⭐</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">行銷網站</td>
            <td className="px-6 py-4 whitespace-nowrap">Webflow、Framer</td>
            <td className="px-6 py-4 whitespace-nowrap">較低</td>
            <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐⭐</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">表單流程</td>
            <td className="px-6 py-4 whitespace-nowrap">Airtable、Zapier</td>
            <td className="px-6 py-4 whitespace-nowrap">低</td>
            <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
