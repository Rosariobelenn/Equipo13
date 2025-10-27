function RequestDetailsSkeleton() {
  return (
    <section className="bg-gray-50 p-6" id="request-details-skeleton">
      <article className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-28 bg-yellow-100 rounded animate-pulse" />
        </div>

        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse mb-2" />
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm lg:col-span-2">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />

            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
                <div>
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse mb-4 mx-auto" />

              <div className="space-y-3">
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}

export default RequestDetailsSkeleton;
