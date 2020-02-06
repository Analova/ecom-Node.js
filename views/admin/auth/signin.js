const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
   <div>
  <form method="POST">
  <input name="email" palceholder="email">
   <input name="password" palceholder="password">
    <button>Sign in</button>
   </form>
  </div>
 `
  });
};
