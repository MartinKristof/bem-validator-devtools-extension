# BEM-validator-extension

Devtools web-extension to lint CSS classes according to BEM methodology (http://getbem.com/naming/) from web browser.
Element and modifier rules are hardcoded `__` and `--`. <br/>
This application using `https://github.com/MartinKristof/css-should-plugin-bem` package to linting.
Under MIT Licence.

## Compatibility
- Firefox
- Chrome
- Opera

## Installation

- `yarn` or `npm install` - install dependencies

## Development

- `yarn dev` or `npm run dev`

## Production

- `yarn build` or `npm run build`

## Scripts

You can use both `yarn` or `npm run` to control application flow.

- `dev` - Starts development **Web** server.
- `build` - Transpile application into bundle.
- `ci` - Runs Continuous Integration cascade (`lint`, `test`, `pretty:check`).
- `test` - Runs tests.
- `lint` - Run ESlint and Stylelint.
- `lint:scripts` - Run ESlint.
- `lint:styles` - Run Stylelint.
- `fix:scripts` - Fix files with ESlint.
- `fix:styles` - Fix files with Stylelint.
- `jest` - Runs jest tests.
- `jest:watch` - Starts watching and runs jest tests.
- `jest:coverage` - Generates code coverage report.
- `jest:update` - Update Jest snapshots.
- `jest:only-changed` - Update Jest snapshots for latest modified files.
- `pretty` - Runs prettyfying of code.
- `pretty:check` - Run code check with prettier.
- `generate-icons` - Generate React component from SVGs.
