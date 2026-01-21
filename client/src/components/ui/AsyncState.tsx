type AsyncStateProps = {
  isLoading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
  children: React.ReactNode;
};

const AsyncState = ({
  isLoading,
  error,
  isEmpty,
  loadingLabel = "Loading…",
  emptyLabel = "No data yet.",
  children,
}: AsyncStateProps) => {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="loading loading-spinner" aria-hidden="true" />
          <span aria-live="polite">{loadingLabel}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-sm text-error bg-error/10 border border-error/20 rounded-lg px-4 py-3">
          {error}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-sm text-gray-400">{emptyLabel}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AsyncState;


