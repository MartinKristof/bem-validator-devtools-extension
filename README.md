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

## Build

- `yarn web-ext:build` or `npm run web-ext:build`

## Pack up via browser
- pack it up via browser (e.g. chrome://extensions/ URL via button "Pack extension" button with allowed developer mode)

## Install to browser from package file
- copy package (zip or crx) via drag&drop option to chrome://extensions/ URL and allow to install

## Install from store
- For Firefox install from URL https://addons.mozilla.org/cs/firefox/addon/bem-validator/
- For Chrome will be published later

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
- `web-ext:build` - Build zip file with extension to install on browser.
