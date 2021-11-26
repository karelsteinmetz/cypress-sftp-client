interface ISftpConnectionSettings {
    host: string;
    port: number;
    userName: string;
    password: string;
    protocol?: "IPv4" | "IPv6";
    dir?: string;
}

interface ISftpConnectionOptions {
    connectionSettings: ISftpConnectionSettings;
}

interface IDebugSftpOptions {
    debug: boolean;
}

interface ISftpCreateDirectoryOptions extends ISftpConnectionOptions, IDebugSftpOptions {
    directoryName: string | string[];
}

interface ISftpCreateDirectoryResult extends ISftpResultBase {}

interface ISftpListOptions extends ISftpConnectionOptions, IDebugSftpOptions {
    directory?: string;
}

interface ISftpListResult extends ISftpResultBase {
    files: { fileName: string; modifiedDate: number }[];
}

interface ISftpExistsOptions extends ISftpConnectionOptions, IDebugSftpOptions {
    fileName: string;
}

interface ISftpExistsResult extends ISftpResultBase {
    isExisting: boolean;
}

interface ISftpUploadOptions extends ISftpConnectionOptions, IDebugSftpOptions {
    content: string;
    fileName: string;
}

interface ISftpUploadResult extends ISftpResultBase {}

interface ISftpDownloadOptions extends ISftpConnectionOptions, IDebugSftpOptions {
    fileName: string;
}

interface ISftpDownloadResult extends ISftpResultBase {
    fileContent: string;
}

interface ISftpDeleteOptions extends ISftpConnectionOptions, IDebugSftpOptions {
    fileNames: string | string[];
}

interface ISftpDeleteResult extends ISftpResultBase {}

interface ISftpResultBase {
    status: boolean;
    error?: string;
}
