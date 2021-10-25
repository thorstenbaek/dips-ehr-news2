import express from "express";

var port = 8282;
if (process.env.IN_CONTAINER)
{
    port = 80;
}

const app = express();
app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(express.json());

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
});