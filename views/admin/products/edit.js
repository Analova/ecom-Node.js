const layout = require("../layout");

module.exports = ({ product }) => {
  return layout({
    content: `
        <form method="POST">
        <input name="title" value="${product.title}"/>
        <input name="price" value="${product.price}"/>
         <input name="image" value="file"/>
        <button>Submit</button>
        </form>`
  });
};
