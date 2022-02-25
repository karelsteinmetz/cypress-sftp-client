/// <reference path="common.d.ts" />
export declare function sftpCreateDirectory(config: ISftpCreateDirectoryOptions): Promise<ISftpCreateDirectoryResult | PromiseLike<ISftpCreateDirectoryResult>>;
export declare function sftpRemoveDirectory(config: ISftpRemoveDirectoryOptions): Promise<ISftpRemoveDirectoryResult | PromiseLike<ISftpRemoveDirectoryResult>>;
export declare function sftpList(config: ISftpListOptions): Promise<ISftpListResult | PromiseLike<ISftpListResult>>;
export declare function sftpExists(config: ISftpExistsOptions): Promise<ISftpExistsResult | PromiseLike<ISftpExistsResult>>;
export declare function sftpDownload(config: ISftpDownloadOptions): Promise<ISftpDownloadResult | PromiseLike<ISftpDownloadResult>>;
export declare function sftpUpload(config: ISftpUploadOptions): Promise<ISftpUploadResult | PromiseLike<ISftpUploadResult>>;
export declare function sftpDelete(config: ISftpDeleteOptions): Promise<ISftpDeleteResult | PromiseLike<ISftpDeleteResult>>;
