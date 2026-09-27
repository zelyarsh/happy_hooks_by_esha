function BillingForm({ billing, setBilling }) {
  const handleChange = (e) => {
    setBilling((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white rounded-[30px] shadow-xl p-8">

      <div className="mb-8">
        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Customer Information
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Billing Details
        </h2>

        <p className="text-gray-500 mt-2">
          Please enter your billing and delivery information.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

        {/* First + Last Name */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={billing.firstName}
              onChange={handleChange}
              placeholder="Esha"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={billing.lastName}
              onChange={handleChange}
              placeholder="Ahmed"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

        </div>

        {/* Email + Phone */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={billing.email}
              onChange={handleChange}
              placeholder="esha@email.com"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={billing.phone}
              onChange={handleChange}
              placeholder="03XX XXXXXXX"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

        </div>

        {/* Address */}

        <div>

          <label className="block mb-2 font-medium">
            Street Address
          </label>

          <input
            type="text"
            name="address"
            value={billing.address}
            onChange={handleChange}
            placeholder="House #, Street, Area"
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
          />

        </div>

        {/* City + Province */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={billing.city}
              onChange={handleChange}
              placeholder="Lahore"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Province
            </label>

            <select
              name="province"
              value={billing.province}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            >
              <option>Punjab</option>
              <option>Sindh</option>
              <option>KPK</option>
              <option>Balochistan</option>
              <option>Islamabad</option>
              <option>AJK</option>
            </select>

          </div>

        </div>

        {/* Postal Code */}

        <div>

          <label className="block mb-2 font-medium">
            Postal Code
          </label>

          <input
            type="text"
            name="postalCode"
            value={billing.postalCode}
            onChange={handleChange}
            placeholder="54000"
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
          />

        </div>

      </form>

    </div>
  );
}

export default BillingForm;
