const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
   <div>
  <form method="POST">
  <input name="email" palceholder="email">
  ${getError(errors, "email")}
   <input name="password" palceholder="password">
    ${getError(errors, "password")}
   <button>Sign in</button>
   </form>
  </div>
 `
  });
};
