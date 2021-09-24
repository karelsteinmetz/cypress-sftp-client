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
const rootDir = "sftp_client_test";
const connectionSettings = {
    host: "127.0.0.1",
    port: 22,
    userName: "userName",
    password: "********",
    dir: rootDir,
};

cy.sftpCreateDirectory({
    debug,
    connectionSettings,
    directoryName: ["input", "failed", "ack"],
});

cy.sftpList({
    debug,
    directory: "input",
    connectionSettings,
}).then((listResult) => {
    cy.log("listResult: " + listResult.files.map((f) => `${f.fileName} - ${f.modifiedDate}`), listResult);
});

const latestFile = listResult.files[0];
const inputFileName = "input/" + latestFile.fileName;
cy.sftpDownload({
    debug,
    connectionSettings,
    fileName: "input/test.txt",
}).then((f) => {
    cy.log(f.fileContent);
});

cy.sftpUpload({
    debug,
    connectionSettings,
    content: "content",
    fileName: "input/test.txt",
}).then(() => {
    cy.sftpExists({
        debug,
        connectionSettings,
        fileName,
    }).then((r) => {
        expect(r.isExisting).is.be.true;
    });
});

cy.sftpDelete({
    debug,
    connectionSettings,
    fileNames: ["input/test.txt"],
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
