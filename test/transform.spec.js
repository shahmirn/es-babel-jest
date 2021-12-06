import { process as esbjprocess } from '..'

describe('process', () => {
  const warn = jest.fn(console.warn)
  const oldConsole = global.console
  global.console = { ...oldConsole, warn }

  const code = `
  export const foo =  42
  export {default as noop} from 'noop3'
  export {URL} from 'url'

  jest.mock("noop3")
`;
  const file = './null.js';
  const options = {
    config: {
      cwd: process.cwd()
    }
  };

  afterAll(() => {
    global.console = oldConsole;
    jest.clearAllMocks();
  });

  it('should process', () => {
    expect(esbjprocess(code, file, options)).toMatchSnapshot();
    expect(warn.mock.calls.join('')).not.toMatch(
      /could not be resolved – treating it as an external dependency/
    );
  });

  it("should always hoist mocked modules at the top",() => {
    expect(esbjprocess(code, file, options).code.startsWith('_getJestObj().mock("noop3");'));
  });

  it('should add inline snapshot', () => {
    expect(1).toMatchInlineSnapshot(`1`);
  });
});
