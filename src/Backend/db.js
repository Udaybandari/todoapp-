const mongoose = require("mongoose");

const uri = "mongodb+srv://udaybandari593_db_user:MyProject77@cluster0.2tjqilx.mongodb.net/todoapp?retryWrites=true&w=majority";


mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = mongoose.connection;
