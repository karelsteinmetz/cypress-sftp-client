/// <reference types="cypress" />
/// <reference path="plugin/common.d.ts" />

interface ISftpCreateDirectoryCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpCreateDirectoryOptions {}
interface ISftpRemoveDirectoryCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpRemoveDirectoryOptions {}
interface ISftpListCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpListOptions {}
interface ISftpExistsCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpExistsOptions {}
interface ISftpDownloadCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpDownloadOptions {}
interface ISftpUploadCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpUploadOptions {}
interface ISftpDeleteCommandOptions extends Partial<Cypress.Loggable & Cypress.Timeoutable>, ISftpDeleteOptions {}

declare namespace Cypress {
    interface ResolvedConfigOptions {
        sftpDebugLog: string;
    }

    interface Chainable<Subject> {
        sftpCreateDirectory(config: ISftpCreateDirectoryCommandOptions): Cypress.Chainable<ISftpCreateDirectoryResult>;
        sftpRemoveDirectory(config: ISftpRemoveDirectoryCommandOptions): Cypress.Chainable<ISftpRemoveDirectoryResult>;
        sftpList(config: ISftpListCommandOptions): Cypress.Chainable<ISftpListResult>;
        sftpExists(config: ISftpExistsCommandOptions): Cypress.Chainable<ISftpExistsResult>;
        sftpDownload(config: ISftpDownloadCommandOptions): Cypress.Chainable<ISftpDownloadResult>;
        sftpUpload(config: ISftpUploadCommandOptions): Cypress.Chainable<ISftpUploadResult>;
        sftpDelete(config: ISftpDeleteCommandOptions): Cypress.Chainable<ISftpDeleteResult>;
    }
}
