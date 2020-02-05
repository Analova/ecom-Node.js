const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["kjhggstv54262"]
  })
);

app.get("/signup", (req, res) => {
  res.send(`
  <div>
  Your id is:${req.session.userId}
  <form method="POST">
  <input name="email" palceholder="email">
   <input name="password" palceholder="password">
    <input name="passwordConfirmation" palceholder="passwordConfirmation">
    <button>sign up</button>
   </form>
  </div>`);
});

app.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }
  if (password !== passwordConfirmation) {
    return res.send("Passwords must match");
  }
  // Create a user in our user repo to represent this person
  const user = await usersRepo.create({
    email,
    password
  });
  // Store the id of that user inside the users cookie
  req.session.userId = user.id;
  res.send("Account created");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

app.get("/signin", (req, res) => {
  res.send(`
  <div>
  <form method="POST">
  <input name="email" palceholder="email">
   <input name="password" palceholder="password">
    <button>Sign in</button>
   </form>
  </div>`);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found!");
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Invalid password");
  }

  req.session.userId = user.id;

  res.send("You are signed in!");
});

app.listen(3000, () => {
  console.log("listening");
});
