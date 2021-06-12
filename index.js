const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/dist")))
}
app.use(express.static(path.join(__dirname, "client/dist")))


app.use("/auth", require("./routes/api/auth"));
app.use("/clubs", require("./routes/api/clubs"));
app.use("/clubBooks", require("./routes/api/clubBooks"));
app.use("/books", require("./routes/api/books"));
app.use("/bookSuggestions", require("./routes/api/bookSuggestions"));

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "./client/dist/index.html"))
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});
