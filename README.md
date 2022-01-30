# Videocollege Client

A custom client for the TU Eindhoven [videocollege site](https://videocollege.tue.nl).

This project is in no way associated with the TU Eindhoven or Mediasite.


## Development Setup

To get started run:

```bash
git clone https://github.com/christiangroothuis/videocollege.git
cd videocollege

yarn 

#or

yarn install
```

Copy the .env.example file to for example .env.local and fill in the REACT_APP_SFAPIKEY which can be found in the API request headers in the [videocollege site](https://videocollege.tue.nl).

Install the browser extension for Firefox for development in the browser-extension directory using [these instructions](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

The chromium extension is not yet fully functional.

Then run:
```bash
yarn start
```
This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
