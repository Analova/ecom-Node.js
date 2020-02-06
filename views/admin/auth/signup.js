const layout = require("../layout");

module.exports = ({ req }) => {
  return layout({
    content: `
    <div>
  Your id is:${req.session.userId}
  <form method="POST">
  <input name="email" palceholder="email">
   <input name="password" palceholder="password">
    <input name="passwordConfirmation" palceholder="passwordConfirmation">
    <button>sign up</button>
   </form>
  </div>
   `
  });
};
