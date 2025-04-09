function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      <span className="sr-only">Loading...</span> { /* For accessibility */}
    </div>
  );
}

export default LoadingSpinner; 