const dns = require("dns");
const mongoose = require("mongoose");

// Some ISPs/routers silently fail to resolve the SRV DNS record that
// `mongodb+srv://` connection strings rely on (querySrv ECONNREFUSED),
// even though normal A/AAAA lookups work fine. Forcing Node to use
// Google's public resolvers fixes this regardless of the machine's
// system-level DNS settings.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {

    const connection = await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );

  } catch (error) {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;