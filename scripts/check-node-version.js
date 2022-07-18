const { readFileSync } = require("fs");
const { join } = require("path");
const semver = require("semver");

const expectedNodeVersion = readFileSync(
    join(__dirname, "../", ".nvmrc"),
    "utf-8"
);
const isValidNodeVersion = semver.satisfies(
    process.version,
    expectedNodeVersion
);

// successfully exit when Node version is valid
if (isValidNodeVersion) {
    return;
}

const output = `
node: ${process.version}
Wanted node version ${expectedNodeVersion}
`;

console.error(output);
process.exit(1);
