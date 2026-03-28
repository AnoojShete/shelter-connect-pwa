export default function SheltersLoading() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-61px-56px)] bg-gray-50/60 animate-pulse">
            {/* Search skeleton */}
            <div className="bg-white px-5 py-4 shadow-sm">
                <div className="h-12 bg-gray-200 rounded-2xl" />
            </div>

            {/* Filters skeleton */}
            <div className="bg-white border-b border-gray-100 py-3 px-5">
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 w-20 bg-gray-200 rounded-full" />
                    ))}
                </div>
            </div>

            {/* Count skeleton */}
            <div className="flex items-center justify-between px-5 py-3">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-8 w-16 bg-gray-200 rounded-lg" />
            </div>

            {/* Card skeletons */}
            <div className="flex-1 px-5 pb-20 space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                        <div className="h-5 w-3/4 bg-gray-200 rounded" />
                        <div className="h-4 w-1/2 bg-gray-200 rounded" />
                        <div className="flex gap-2">
                            <div className="h-6 w-16 bg-gray-200 rounded-full" />
                            <div className="h-6 w-14 bg-gray-200 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
