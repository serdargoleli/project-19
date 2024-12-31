import { Skeleton as PrimeSkeleton } from "primereact/skeleton";

const Skeleton = () => {
  const skeletonItems = [];

  for (let i = 0; i < 60; i++) {
    const randomWidth = `${Math.floor(Math.random() * 10) + 1}rem`; // 1 ile 10 arasında rastgele genişlik

    skeletonItems.push(<PrimeSkeleton key={i} width={randomWidth} height=".5rem" />);
  }

  return (
    <div className="border-round border-1 surface-border p-4 surface-card">
      <div className="flex mb-10">
        <div>
          <PrimeSkeleton width="10rem" className="mb-2"></PrimeSkeleton>
          <PrimeSkeleton height=".5rem"></PrimeSkeleton>
        </div>
      </div>

      <div className="flex flex-wrap justify-content-between mt-3 gap-3">{skeletonItems}</div>
    </div>
  );
};
export default Skeleton;
