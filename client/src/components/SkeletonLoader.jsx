const SkeletonCard = () => (
  <div className="card p-5 animate-pulse">
    <div className="bg-gray-200 rounded-xl h-48 w-full mb-4" />
    <div className="bg-gray-200 rounded h-5 w-3/4 mb-2" />
    <div className="bg-gray-200 rounded h-4 w-1/2 mb-4" />
    <div className="bg-gray-200 rounded-xl h-10 w-full" />
  </div>
);

const SkeletonText = ({ lines = 3 }) => (
  <div className="animate-pulse space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`bg-gray-200 rounded h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonText };
