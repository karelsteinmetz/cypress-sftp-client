"use strict";
/// <reference path="./index.d.ts" />
Cypress.Commands.add("sftpCreateDirectory", {
    prevSubject: false,
}, function (options) {
    var cmdOptions = Object.assign(typeof options === "object" ? options : {}, {
        _log: Cypress.log({ message: [name] }),
    });
    var callWithDebug = !!Cypress.config("sftpDebugLog");
    return cy
        .task("sftpCreateDirectory", {
        connectionSettings: options.connectionSettings,
        directoryName: options.directoryName,
        debug: callWithDebug,
    }, Object.assign(cmdOptions, { log: false }))
        .then(function (result) { return result; })
        .then(function (report) { return sftpResultLog(cmdOptions, report); })
        .should(function (report) { return expect(report.status, "it failed because " + report.error).to.be.true; });
});
Cypress.Commands.add("sftpList", {
    prevSubject: false,
}, function (options) {
    var cmdOptions = Object.assign(typeof options === "object" ? options : {}, {
        _log: Cypress.log({ message: [name] }),
    });
    var callWithDebug = !!Cypress.config("sftpDebugLog");
    return cy
        .task("sftpList", {
        connectionSettings: options.connectionSettings,
        directory: options.directory,
        debug: callWithDebug,
    }, Object.assign(cmdOptions, { log: false }))
        .then(function (result) { return result; })
        .then(function (report) { return sftpResultLog(cmdOptions, report); })
        .should(function (report) { return expect(report.status, "it failed because " + report.error).to.be.true; });
});
Cypress.Commands.add("sftpExists", {
    prevSubject: false,
}, function (options) {
    var cmdOptions = Object.assign(typeof options === "object" ? options : {}, {
        _log: Cypress.log({ message: [name] }),
    });
    var callWithDebug = !!Cypress.config("sftpDebugLog");
    return cy
        .task("sftpExists", {
        connectionSettings: options.connectionSettings,
        fileName: options.fileName,
        debug: callWithDebug,
    }, Object.assign(cmdOptions, { log: false }))
        .then(function (result) { return result; })
        .then(function (report) { return sftpResultLog(cmdOptions, report); })
        .should(function (report) { return expect(report.status, "it failed because " + report.error).to.be.true; });
});
Cypress.Commands.add("sftpDownload", {
    prevSubject: false,
}, function (options) {
    var cmdOptions = Object.assign(typeof options === "object" ? options : {}, {
        _log: Cypress.log({ message: [name] }),
    });
    var callWithDebug = !!Cypress.config("sftpDebugLog");
    return cy
        .task("sftpDownload", {
        connectionSettings: options.connectionSettings,
        fileName: options.fileName,
        debug: callWithDebug,
    }, Object.assign(cmdOptions, { log: false }))
        .then(function (result) { return result; })
        .then(function (report) { return sftpResultLog(cmdOptions, report); })
        .should(function (report) { return expect(report.status, "it failed because " + report.error).to.be.true; });
});
Cypress.Commands.add("sftpUpload", {
    prevSubject: false,
}, function (options) {
    var cmdOptions = Object.assign(typeof options === "object" ? options : {}, {
        _log: Cypress.log({ message: [name] }),
    });
    var callWithDebug = !!Cypress.config("sftpDebugLog");
    return cy
        .task("sftpUpload", {
        connectionSettings: options.connectionSettings,
        fileName: options.fileName,
        content: options.content,
        debug: callWithDebug,
    }, Object.assign(cmdOptions, { log: false }))
        .then(function (result) { return result; })
        .then(function (report) { return sftpResultLog(cmdOptions, report); })
        .should(function (report) { return expect(report.status, "it failed because " + report.error).to.be.true; });
});
Cypress.Commands.add("sftpDelete", {
    prevSubject: false,
}, function (options) {
    var cmdOptions = Object.assign(typeof options === "object" ? options : {}, {
        _log: Cypress.log({ message: [name] }),
    });
    var callWithDebug = !!Cypress.config("sftpDebugLog");
    return cy
        .task("sftpDelete", {
        connectionSettings: options.connectionSettings,
        fileNames: options.fileNames,
        debug: callWithDebug,
    }, Object.assign(cmdOptions, { log: false }))
        .then(function (result) { return result; })
        .then(function (report) { return sftpResultLog(cmdOptions, report); })
        .should(function (report) { return expect(report.status, "it failed because " + report.error).to.be.true; });
});
function sftpResultLog(options, report) {
    var consoleProps = Object.assign({
        Status: report.status,
        Error: report.error,
    });
    options._log.set({ consoleProps: function () { return consoleProps; } });
    return report;
}
//# sourceMappingURL=commands.js.map