/**
 * CardSkeleton Component
 * 
 * Loading skeleton with pulse animation for QuestionCard
 * Displays while content is loading to improve perceived performance
 */
function CardSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto px-4 animate-pulse">
      {/* Progress Indicator Skeleton */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gray-300 h-2 rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Question Card Skeleton */}
      <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col justify-between">
        {/* Category Badge Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-300 rounded-full w-32"></div>
        </div>

        {/* Question Text Skeleton */}
        <div className="flex-grow flex items-center">
          <div className="w-full space-y-3">
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-5/6"></div>
            <div className="h-6 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="h-4 bg-gray-300 rounded w-24 mx-auto mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
