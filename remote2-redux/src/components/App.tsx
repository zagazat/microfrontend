import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const FormContainer = React.lazy(() => import("./FormContainer"));

function ErrorFallback({ error }: { error: Error }) {
  return <p>{error}</p>;
}

export const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick={() => setVisible(true)}>привет</button>
      {visible && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <React.Suspense fallback="загрузка">
            <FormContainer />
          </React.Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};
