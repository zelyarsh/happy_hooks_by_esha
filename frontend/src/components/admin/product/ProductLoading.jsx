function ProductLoading() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-white rounded-3xl p-6 animate-pulse"
        >
          <div className="h-52 bg-gray-200 rounded-2xl" />
          <div className="h-6 bg-gray-200 rounded mt-5" />
          <div className="h-4 bg-gray-200 rounded mt-3 w-2/3" />
          <div className="h-8 bg-gray-200 rounded mt-5 w-1/3" />
        </div>
      ))}

    </div>
  );
}

export default ProductLoading;
