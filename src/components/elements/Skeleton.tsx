import "./Skeleton.scss";

type SkeletonProps = {
  height?: number;
  count?: number;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  height = 100,
  count = 3,
  className = "",
}) => {
  return (
    <div className={`skeleton-container ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="skeleton-bar"
          style={{ height: height, animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};

export default Skeleton;
