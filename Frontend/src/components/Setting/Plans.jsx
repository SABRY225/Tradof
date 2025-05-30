function Plans({ plans }) {
  return (
    <div className="max-w-7xl mx-auto p-1">
      <h1 className="text-[28px] font-roboto-condensed font-bold  text-primary-color my-5">
        Plans
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold text-main-color mb-3">{plan.name}</h2>
            <div className="text-gray-600 text-sm mb-4">
              <span className="font-medium">Duration:</span> {plan.durationInMonths} months
            </div>
            <p className="text-gray-700 text-sm mb-4">{plan.description}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="text-xl font-bold text-main-color">{plan.price} EGP</div>
              <button className="bg-primary-color text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-300">
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
