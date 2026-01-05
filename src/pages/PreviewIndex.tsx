import { Link } from 'react-router-dom';

export default function PreviewIndex() {
  const pages = [
    { name: 'My Funds', path: '/my-funds' },
    { name: 'Unifund Registry', path: '/unifund-registry' },
    { name: "This Morning's Routes", path: '/mornings-routes' },
    { name: 'Transition Dashboard', path: '/transition-dashboard' },
    { name: 'Select Interventions', path: '/select-interventions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            poem screens live demo
          </h1>
          <p className="text-gray-600 mb-8">
            Select a page to review:
          </p>

          <nav className="space-y-3">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="block px-6 py-4 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900 group-hover:text-purple-700">
                    {page.name}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-purple-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
