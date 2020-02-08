const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    // attrs=={email:"", password:""}
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }
  async comparePasswords(saved, supplied) {
    // const result = saved.split(".");
    // const hashed = result[0];
    // const salt = result[1];

    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed == hashedSuppliedBuf.toString("hex");
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
}

module.exports = new UsersRepository("users.json");

// const test = async () => {
//   const repo = new UsersRepository("usres.json");
// await repo.create({ email: "test@test.com", password: "test123" });

// const users = await repo.getAll();

// const user = await repo.getOne("e5967198");

// console.log(user);

//await repo.delete("a334fe15");
// await repo.update("d74dc257", { email: "marie@harrison.come" });
//   const user = await repo.getOneBy({
//     id: "7f0b8559"
//   });
//   console.log(user);
// };

// test();
