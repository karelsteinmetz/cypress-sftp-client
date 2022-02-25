/// <reference path="common.d.ts" />

import { sftpCreateDirectory, sftpDelete, sftpDownload, sftpExists, sftpList, sftpRemoveDirectory, sftpUpload } from "./sftpUploadCore";

function register(on: Cypress.PluginEvents): void {
    on("task", {
        async sftpCreateDirectory(config: ISftpCreateDirectoryOptions): Promise<ISftpCreateDirectoryResult> {
            return await sftpCreateDirectory(config);
        },
        async sftpRemoveDirectory(config: ISftpRemoveDirectoryOptions): Promise<ISftpRemoveDirectoryResult> {
            return await sftpRemoveDirectory(config);
        },
        async sftpList(config: ISftpListOptions): Promise<ISftpListResult> {
            return await sftpList(config);
        },
        async sftpExists(config: ISftpExistsOptions): Promise<ISftpExistsResult> {
            return await sftpExists(config);
        },
        async sftpDownload(config: ISftpDownloadOptions): Promise<ISftpDownloadResult> {
            return await sftpDownload(config);
        },
        async sftpUpload(config: ISftpUploadOptions): Promise<ISftpUploadResult> {
            return await sftpUpload(config);
        },
        async sftpDelete(config: ISftpDeleteOptions): Promise<ISftpDeleteResult> {
            return await sftpDelete(config);
        },
    });
}

export = register;
