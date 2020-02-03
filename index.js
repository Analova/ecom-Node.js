const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
  <div>
  <form>
  <input palceholder="email">
   <input palceholder="password">
    <input palceholder="password confirmation">
    <button>sign up</button>
   </form>
  </div>`);
});

app.listen(3000, () => {
  console.log("listening");
});
