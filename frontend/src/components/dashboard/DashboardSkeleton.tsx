function DashboardSkeleton() {
  return (
    <section className="bg-gray-50 p-6 min-h-screen">
      <article className="max-w-5xl mx-auto">
        <div className="mt-2 mb-1 border-b border-gray-200 pb-3">
          <div className="h-4 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
            </div>
            <div className="h-12 bg-blue-200 rounded-lg w-48 animate-pulse"></div>
          </div>
        </div>

        <main className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="h-12 bg-blue-200 rounded-lg w-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-lg w-full animate-pulse"></div>
            </div>
          </div>
        </main>

        <article className="grid md:grid-cols-2 gap-4 md:gap-12 mb-6 md:mb-10 lg:w-8/12 mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full animate-pulse flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full animate-pulse flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded w-36 mb-2 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-44 animate-pulse"></div>
              </div>
            </div>
          </div>
        </article>

        <footer className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-18">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 mb-4 animate-pulse"></div>
              <div className="h-10 bg-blue-200 rounded-lg w-full animate-pulse"></div>
            </div>
          </div>
        </footer>
      </article>
    </section>
  );
}

export default DashboardSkeleton;
