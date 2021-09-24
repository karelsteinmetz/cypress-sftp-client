# cypress-sftp-client

Wrapped ssh2-sftp-client to cypress framework tasks.

## Adding to project

Add following lines to your _commands.ts_:

```tsx
/// <reference types="Cypress plugin for SFTP client" />

import "cypress-sftp-client/commands";
```

Add following lines to your _plugins/index.ts_:

```tsx
// plugins file

import sftpClient from "cypress-sftp-client/plugin";

function register(on: Cypress.PluginEvents): void {
    sftpClient(on);
}

export = register;
```

## Usage

```tsx
const debug = true;
const rootDir = "sftp_client_test";
const connectionSettings = {
    host: "127.0.0.1",
    port: 22,
    userName: "user",
    password: "password",
    dir: rootDir,
};

const dirInput = "input";
const fileName = dirInput + "/test.txt";
cy.sftpCreateDirectory({
    debug,
    connectionSettings,
    directoryName: [dirInput],
}).then((r) => {
    cy.log("sftpCreateDirectory result", r);
});

cy.sftpUpload({
    debug,
    connectionSettings,
    content: "content",
    fileName,
}).then((r) => {
    cy.log("sftpUpload result", r);
});

cy.sftpExists({
    debug,
    connectionSettings,
    fileName,
}).then((r) => {
    cy.log("sftpExists result", r);
    expect(r.isExisting).is.be.true;
});

cy.sftpList({
    debug,
    directory: dirInput,
    connectionSettings,
}).then((r) => {
    cy.log("sftpList result" + r.files.map((f) => `${f.fileName} - ${f.modifiedDate}`), r);
});

cy.sftpDownload({
    debug,
    connectionSettings,
    fileName: fileName,
}).then((r) => {
    cy.log("sftpDownload result" + r.fileContent, r);
});

cy.sftpDelete({
    debug,
    connectionSettings,
    fileNames: [fileName],
}).then((r) => {
    cy.log("sftpDelete result", r);
});
```

## How to Develop

To build plugin run webpack with specific config:

```bash
npx webpack --config webpack.config.plugin.ts -w
```

and then run cypress:

```bash
npx cypress open
```

## How to run example

In root folder run:

```bash
npx tsc
```

```bash
node sftpClient
```
