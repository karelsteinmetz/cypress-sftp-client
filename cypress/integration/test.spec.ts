describe("SFTP client", () => {
    describe("with common settings", () => {
        const debug = true;
        const connectionSettings: ISftpConnectionSettings = {
            host: "127.0.0.1",
            port: 22,
            userName: "user",
            password: "password",
            protocol: "IPv4", // "IPv6"
        };

        const dirInput = "inputCommon";
        const fileName = dirInput + "/test.txt";

        it("walk around SFTP tasks", () => {
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

            cy.sftpRemoveDirectory({
                debug,
                connectionSettings,
                directoryName: [dirInput],
            }).then((r) => {
                cy.log("sftpRemoveDirectory result", r);
            });
        });
    });

    describe("with root dir settings", () => {
        const debug = true;
        const rootDir = "sftp_client_test";
        const connectionSettings: ISftpConnectionSettings = {
            host: "127.0.0.1",
            port: 22,
            userName: "user",
            password: "password",
            protocol: "IPv4", // "IPv6"
            dir: rootDir,
        };

        const dirInput = "inputWithRoot";
        const fileName = dirInput + "/test.txt";

        it("walk around SFTP tasks", () => {
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

            cy.sftpRemoveDirectory({
                debug,
                connectionSettings,
                directoryName: [dirInput],
            }).then((r) => {
                cy.log("sftpRemoveDirectory result", r);
            });
        });
    });
});
