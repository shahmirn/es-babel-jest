const path = require("path");

const { transformSync } = require("esbuild");
const babelJest = require("babel-jest").default;

const loaders = ["js", "jsx", "ts", "tsx"];
const nodeVersion =
process.env.NODE_ENV === "test" ? "12" : process.versions.node;

exports.process = (code, file, ...rest) => {
  const extname = path.extname(file);
  const loader = loaders.find((x) => `.${x}` === extname);
  const options = {
    target: `node${nodeVersion}`,
    format: "cjs",
    loader: loader || "js",
    sourcemap: "inline",
    sourcefile: file
  };
  const cjsTransformed = transformSync(code, options).code;
  return babelJest.process(cjsTransformed, file, ...rest);
};