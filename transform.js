const path = require("path");

const { transformSync } = require("esbuild");
const { createTransformer } = require("babel-jest");

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

  const babelTransformer = createTransformer();
  return babelTransformer.process(cjsTransformed, file, ...rest);
};