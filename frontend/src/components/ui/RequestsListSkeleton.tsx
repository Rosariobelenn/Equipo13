function RequestsListSkeleton() {
  return (
    <section className="bg-gray-50 p-6" id="requests-list-skeleton">
      <article className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div>
                <div className="h-8 w-56 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-80 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-40 bg-blue-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-yellow-100 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-2 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-2 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-5/8 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ))}
        </section>

        <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 bg-blue-200 rounded-full animate-pulse flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 w-32 bg-blue-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-80 bg-blue-100 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-40 bg-blue-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-blue-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default RequestsListSkeleton;
