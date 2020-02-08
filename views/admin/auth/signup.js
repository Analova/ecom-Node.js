const layout = require("../layout");

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (errors) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
  Your id is:${req.session.userId}
  <form method="POST">
  <input name="email" palceholder="email">
  ${getError(errors, "email")}
   <input name="password" palceholder="password">
   ${getError(errors, "password")}
    <input name="passwordConfirmation" palceholder="passwordConfirmation">
    ${getError(errors, "passwordConfirmation")}
    <button>sign up</button>
   </form>
  </div>
   `
  });
};
