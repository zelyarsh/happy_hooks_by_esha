const stats = [
  {
    number: "500+",
    title: "Happy Customers",
  },
  {
    number: "1000+",
    title: "Products Made",
  },
  {
    number: "30+",
    title: "Crochet Designs",
  },
  {
    number: "100%",
    title: "Handmade",
  },
];

function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-pink-500 to-rose-400">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          {stats.map((stat) => (

            <div
              key={stat.title}
              className="text-center text-white"
            >

              <h2 className="text-6xl font-bold">
                {stat.number}
              </h2>

              <p className="mt-4 text-xl opacity-90">
                {stat.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default StatsSection;