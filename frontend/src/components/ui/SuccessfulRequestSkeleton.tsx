function SuccessfulRequestSkeleton() {
  return (
    <section className="min-h-screen bg-white py-8 px-4">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-19 h-19 bg-blue-200 rounded-full mb-4 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded-md w-96 mx-auto mb-2 animate-pulse" />
          <div className="space-y-2 max-w-xl mx-auto">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
          </div>
        </header>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 px-10 mb-6 flex items-center justify-center gap-1 w-fit mx-auto">
          <div className="w-5 h-5 bg-blue-200 rounded animate-pulse" />
          <div className="h-4 bg-blue-200 rounded w-64 animate-pulse" />
        </div>

        <section className="bg-[#f9f7f4] rounded-lg p-6 mb-6">
          <header className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
            <div className="h-6 bg-gray-300 rounded w-48 animate-pulse" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-[150px_1fr] items-center gap-x-4"
                >
                  <div className="h-4 bg-gray-300 rounded w-28 animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-[150px_1fr] items-center gap-x-4"
                >
                  <div className="h-4 bg-gray-300 rounded w-28 animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-green-300 rounded-full animate-pulse" />
            <div className="h-6 bg-green-300 rounded w-32 animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="w-6 h-6 bg-green-200 rounded-full flex-shrink-0 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-green-200 rounded w-40 animate-pulse" />
                  <div className="h-3 bg-green-200 rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-yellow-300 rounded-full animate-pulse" />
            <div className="h-6 bg-yellow-300 rounded w-48 animate-pulse" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-4 bg-yellow-200 rounded w-full animate-pulse"
              />
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center space-y-4">
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
            <div className="flex items-center justify-center gap-4">
              <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-40 animate-pulse" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse" />
          </div>
        </div>

        <div className="w-80 h-12 bg-blue-300 rounded-md mx-auto animate-pulse" />
      </article>
    </section>
  );
}

export default SuccessfulRequestSkeleton;
