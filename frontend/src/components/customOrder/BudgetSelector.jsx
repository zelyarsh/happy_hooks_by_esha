import { useState, useEffect } from "react";

const budgetOptions = [
  "Rs. 1,000",
  "Rs. 2,000",
  "Rs. 3,000",
  "Rs. 5,000",
  "Rs. 7,500",
  "Other",
];

function BudgetSelector({
  selectedBudget,
  setSelectedBudget,
}) {
  const [customBudget, setCustomBudget] = useState("");

  useEffect(() => {
    if (
      selectedBudget &&
      !budgetOptions.includes(selectedBudget)
    ) {
      setCustomBudget(selectedBudget);
    }
  }, []);

  return (
    <div>

      <label className="block text-lg font-semibold mb-5">
        Select Budget
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {budgetOptions.map((budget) => (

          <button
            key={budget}
            type="button"
            onClick={() => setSelectedBudget(budget)}
            className={`rounded-2xl py-5 font-semibold transition-all duration-300

            ${
              selectedBudget === budget
                ? "bg-pink-500 text-white shadow-xl scale-105"
                : "border border-gray-200 hover:border-pink-300 hover:bg-pink-50"
            }`}
          >
            {budget}
          </button>

        ))}

      </div>

      {selectedBudget === "Other" && (

        <input
          type="number"
          placeholder="Enter your budget"
          value={customBudget}
          onChange={(e) => {
            setCustomBudget(e.target.value);
            setSelectedBudget(e.target.value);
          }}
          className="w-full mt-6 border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />

      )}

    </div>
  );
}

export default BudgetSelector;