import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const loadEnv = (mode) => {
  console.log(mode);
  // dotenv.config({ path: `front\ssafy_c203_env/.env.${mode}` });
  // console.log(fs);
  // const basePath = path.join(__dirname, "ssafy_c203_env");
  // console.log(basePath);
  // const envPath = path.join(basePath, `.env.${mode}`);

  // if (fs.existsSync(envPath)) {
  //   dotenv.config({ path: envPath });
  // }
};

module.exports = loadEnv;
