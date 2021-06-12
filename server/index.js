const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/api/auth"));
app.use("/clubs", require("./routes/api/clubs"));
app.use("/clubBooks", require("./routes/api/clubBooks"));
app.use("/books", require("./routes/api/books"));
app.use("/bookSuggestions", require("./routes/api/bookSuggestions"));

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
});
