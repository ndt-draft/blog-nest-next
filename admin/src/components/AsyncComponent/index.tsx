import { Suspense, lazy, ComponentType } from "react";
import Loading from "../Loading";

interface AsyncComponentProps {
  // Define the props type
  [key: string]: any;
}

const AsyncComponent = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  const LazyComponent = lazy(importFunc);

  return (props: AsyncComponentProps) => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default AsyncComponent;
