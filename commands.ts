/// <reference path="./index.d.ts" />

interface ICypressLogOptions {
    _log: Cypress.Log;
}

interface ISftpCreateDirectoryCommandOptionsWithLog extends ISftpCreateDirectoryCommandOptions, ICypressLogOptions {}

Cypress.Commands.add(
    "sftpCreateDirectory",
    {
        prevSubject: false,
    },
    (options: ISftpCreateDirectoryCommandOptionsWithLog): Cypress.Chainable<ISftpCreateDirectoryResult> => {
        const cmdOptions: ISftpCreateDirectoryCommandOptionsWithLog = Object.assign(
            typeof options === "object" ? options : ({} as ISftpCreateDirectoryCommandOptionsWithLog),
            {
                _log: Cypress.log({ message: [name] }),
            }
        );

        const callWithDebug = !!Cypress.config("sftpDebugLog");

        return cy
            .task(
                "sftpCreateDirectory",
                <ISftpCreateDirectoryOptions>{
                    connectionSettings: options.connectionSettings,
                    directoryName: options.directoryName,
                    debug: callWithDebug,
                },
                Object.assign(cmdOptions, { log: false })
            )
            .then((result) => (result as any) as ISftpCreateDirectoryResult)
            .then((report) => sftpResultLog(cmdOptions, report))
            .should((report) => expect(report.status, `it failed because ${report.error}`).to.be.true);
    }
);

interface ISftpListCommandOptionsWithLog extends ISftpListCommandOptions, ICypressLogOptions {}

Cypress.Commands.add(
    "sftpList",
    {
        prevSubject: false,
    },
    (options: ISftpListCommandOptionsWithLog): Cypress.Chainable<ISftpListResult> => {
        const cmdOptions: ISftpListCommandOptionsWithLog = Object.assign(
            typeof options === "object" ? options : ({} as ISftpListCommandOptionsWithLog),
            {
                _log: Cypress.log({ message: [name] }),
            }
        );

        const callWithDebug = !!Cypress.config("sftpDebugLog");

        return cy
            .task(
                "sftpList",
                <ISftpListOptions>{
                    connectionSettings: options.connectionSettings,
                    directory: options.directory,
                    debug: callWithDebug,
                },
                Object.assign(cmdOptions, { log: false })
            )
            .then((result) => (result as any) as ISftpListResult)
            .then((report) => sftpResultLog(cmdOptions, report))
            .should((report) => expect(report.status, `it failed because ${report.error}`).to.be.true);
    }
);

interface ISftpExistsCommandOptionsWithLog extends ISftpExistsCommandOptions, ICypressLogOptions {}

Cypress.Commands.add(
    "sftpExists",
    {
        prevSubject: false,
    },
    (options: ISftpExistsCommandOptionsWithLog): Cypress.Chainable<ISftpExistsResult> => {
        const cmdOptions: ISftpExistsCommandOptionsWithLog = Object.assign(
            typeof options === "object" ? options : ({} as ISftpExistsCommandOptionsWithLog),
            {
                _log: Cypress.log({ message: [name] }),
            }
        );

        const callWithDebug = !!Cypress.config("sftpDebugLog");

        return cy
            .task(
                "sftpExists",
                <ISftpExistsOptions>{
                    connectionSettings: options.connectionSettings,
                    fileName: options.fileName,
                    debug: callWithDebug,
                },
                Object.assign(cmdOptions, { log: false })
            )
            .then((result) => (result as any) as ISftpExistsResult)
            .then((report) => sftpResultLog(cmdOptions, report))
            .should((report) => expect(report.status, `it failed because ${report.error}`).to.be.true);
    }
);

interface ISftpDownloadCommandOptionsWithLog extends ISftpDownloadCommandOptions, ICypressLogOptions {}

Cypress.Commands.add(
    "sftpDownload",
    {
        prevSubject: false,
    },
    (options: ISftpDownloadCommandOptionsWithLog): Cypress.Chainable<ISftpDownloadResult> => {
        const cmdOptions: ISftpDownloadCommandOptionsWithLog = Object.assign(
            typeof options === "object" ? options : ({} as ISftpDownloadCommandOptionsWithLog),
            {
                _log: Cypress.log({ message: [name] }),
            }
        );

        const callWithDebug = !!Cypress.config("sftpDebugLog");

        return cy
            .task(
                "sftpDownload",
                <ISftpDownloadOptions>{
                    connectionSettings: options.connectionSettings,
                    fileName: options.fileName,
                    debug: callWithDebug,
                },
                Object.assign(cmdOptions, { log: false })
            )
            .then((result) => (result as any) as ISftpDownloadResult)
            .then((report) => sftpResultLog(cmdOptions, report))
            .should((report) => expect(report.status, `it failed because ${report.error}`).to.be.true);
    }
);

interface ISftpUploadCommandOptionsWithLog extends ISftpUploadCommandOptions, ICypressLogOptions {}

Cypress.Commands.add(
    "sftpUpload",
    {
        prevSubject: false,
    },
    (options: ISftpUploadCommandOptionsWithLog): Cypress.Chainable<ISftpUploadResult> => {
        const cmdOptions: ISftpUploadCommandOptionsWithLog = Object.assign(
            typeof options === "object" ? options : ({} as ISftpUploadCommandOptionsWithLog),
            {
                _log: Cypress.log({ message: [name] }),
            }
        );

        const callWithDebug = !!Cypress.config("sftpDebugLog");

        return cy
            .task(
                "sftpUpload",
                <ISftpUploadOptions>{
                    connectionSettings: options.connectionSettings,
                    fileName: options.fileName,
                    content: options.content,
                    debug: callWithDebug,
                },
                Object.assign(cmdOptions, { log: false })
            )
            .then((result) => (result as any) as ISftpUploadResult)
            .then((report) => sftpResultLog(cmdOptions, report))
            .should((report) => expect(report.status, `it failed because ${report.error}`).to.be.true);
    }
);

interface ISftpDeleteCommandOptionsWithLog extends ISftpDeleteCommandOptions, ICypressLogOptions {}

Cypress.Commands.add(
    "sftpDelete",
    {
        prevSubject: false,
    },
    (options: ISftpDeleteCommandOptionsWithLog): Cypress.Chainable<ISftpDeleteResult> => {
        const cmdOptions: ISftpDeleteCommandOptionsWithLog = Object.assign(
            typeof options === "object" ? options : ({} as ISftpDeleteCommandOptionsWithLog),
            {
                _log: Cypress.log({ message: [name] }),
            }
        );

        const callWithDebug = !!Cypress.config("sftpDebugLog");

        return cy
            .task(
                "sftpDelete",
                <ISftpDeleteOptions>{
                    connectionSettings: options.connectionSettings,
                    fileNames: options.fileNames,
                    debug: callWithDebug,
                },
                Object.assign(cmdOptions, { log: false })
            )
            .then((result) => (result as any) as ISftpDeleteResult)
            .then((report) => sftpResultLog(cmdOptions, report))
            .should((report) => expect(report.status, `it failed because ${report.error}`).to.be.true);
    }
);

function sftpResultLog<TResult extends ISftpResultBase>(options: ICypressLogOptions, report: TResult): TResult {
    const consoleProps = Object.assign({
        Status: report.status,
        Error: report.error,
    });

    options._log.set({ consoleProps: () => consoleProps });
    return report;
}
