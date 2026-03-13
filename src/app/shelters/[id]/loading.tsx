export default function ShelterDetailLoading() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-57px)] bg-white animate-pulse">
            {/* Sub-header skeleton */}
            <div className="sticky top-[57px] z-40 bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3">
                <div className="h-11 w-11 bg-gray-200 rounded-lg" />
                <div className="h-5 w-48 bg-gray-200 rounded" />
            </div>

            {/* Hero image skeleton */}
            <div className="h-48 bg-gray-200" />

            {/* Availability banner skeleton */}
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-14 bg-gray-200 rounded-full" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                    <div className="h-5 w-40 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Facilities skeleton */}
            <div className="px-4 py-4 border-b border-gray-100">
                <div className="h-4 w-48 bg-gray-200 rounded mb-3" />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg" />
                    ))}
                </div>
            </div>

            {/* Details skeleton */}
            <div className="px-4 py-4 border-b border-gray-100 space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Map skeleton */}
            <div className="px-4 py-4 border-b border-gray-100">
                <div className="h-5 w-24 bg-gray-200 rounded mb-3" />
                <div className="h-[180px] bg-gray-200 rounded-xl" />
            </div>
        </div>
    );
}
