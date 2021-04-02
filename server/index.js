const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/api/auth"));
app.use("/club", require("./routes/api/club"));
app.use("/clubBook", require("./routes/api/clubBook"));
app.use("/book", require("./routes/api/book"));

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
});
