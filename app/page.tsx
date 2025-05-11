import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          歡迎來到我的部落格
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          分享技術心得、開發經驗，以及生活中的點點滴滴。
          使用 Next.js 14、React 和 MDX 構建的現代化部落格。
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          查看所有文章
        </Link>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          功能特色
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">MDX 支援</h3>
            <p className="text-gray-600">
              在 Markdown 中直接使用 React 組件，創造更豐富的內容體驗。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">TypeScript</h3>
            <p className="text-gray-600">
              完整的類型定義，提供更好的開發體驗和程式碼品質。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Tailwind CSS</h3>
            <p className="text-gray-600">
              使用 Tailwind CSS 快速構建美觀的響應式界面。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
