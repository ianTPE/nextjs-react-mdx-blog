import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-gray-900 font-cursive">
          Citrine.top
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              首頁
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900">
              文章
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              關於
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
