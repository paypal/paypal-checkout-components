/* @flow */
// eslint-disable-next-line import/no-nodejs-modules
import fs from "fs";

import { buttonConfigs } from "../config";

const createButtonConfigs = () => {
  // eslint-disable-next-line no-sync
  fs.writeFileSync(
    "./test/percy/files/buttonConfigs.json",
    JSON.stringify(buttonConfigs)
  );
};

createButtonConfigs();
