/// <reference path="common.d.ts" />

import * as Sftp from "ssh2-sftp-client";
import * as path from "path";

const writeStreamOptions = { encoding: "utf8" };

export async function sftpCreateDirectory(
    config: ISftpCreateDirectoryOptions
): Promise<ISftpCreateDirectoryResult | PromiseLike<ISftpCreateDirectoryResult>> {
    log(config, "sftpCreateDirectory - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
            forceIPv4: config.connectionSettings.protocol === "IPv4",
            forceIPv6: config.connectionSettings.protocol === "IPv6",
        });
        const cwd = await sftp.cwd();
        log(config, `Upload - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`, config.connectionSettings.dir);
        if (config.connectionSettings?.dir !== undefined) {
            await createIfDoesNotExists(config.connectionSettings.dir, sftp);
        }
        if (Array.isArray(config.directoryName)) {
            for (const directoryName of config.directoryName) {
                const configPath = pathCombine(config.connectionSettings.dir, directoryName);
                const realPath = await sftp.realPath(configPath);
                log(config, `CreateDirectory - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
                await createIfDoesNotExists(realPath, sftp);
            }
        } else {
            const configPath = pathCombine(config.connectionSettings.dir, config.directoryName);
            const realPath = await sftp.realPath(configPath);
            log(config, `CreateDirectory - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
            await createIfDoesNotExists(realPath, sftp);
        }
        log(config, "CreateDirectory - Directory created.");
        await sftp.end();
        log(config, "CreateDirectory - SFTP Connection closed.");
        return {
            status: true,
        };
    } catch (err) {
        log(config, "sftpCreateDirectory - Failed", err);
        return {
            status: false,
            error: `Error during SFTP directory creation: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpCreateDirectory - Finished");
    }

    async function createIfDoesNotExists(directoryPath: string, sftp: Sftp) {
        try {
            const pathStat = await sftp.stat(directoryPath);
            if (pathStat.isDirectory) {
                return;
            }
        } catch (error) {
            log(config, "Error during stat check: ", error);
        }

        try {
            await sftp.mkdir(directoryPath, true);
        } catch (error) {
            log(config, "Error during createIfDoesNotExists: ", error);
        }
    }
}

export async function sftpRemoveDirectory(
    config: ISftpRemoveDirectoryOptions
): Promise<ISftpRemoveDirectoryResult | PromiseLike<ISftpRemoveDirectoryResult>> {
    log(config, "sftpRemoveDirectory - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
            forceIPv4: config.connectionSettings.protocol === "IPv4",
            forceIPv6: config.connectionSettings.protocol === "IPv6",
        });

        const cwd = await sftp.cwd();
        log(
            config,
            `RemoveDirectory - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`,
            config.connectionSettings?.dir
        );

        if (Array.isArray(config.directoryName)) {
            for (const directoryName of config.directoryName) {
                const configPath = pathCombine(config.connectionSettings.dir, directoryName);
                const realPath = await sftp.realPath(configPath);
                log(config, `RemoveDirectory - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
                await removeIfExists(realPath, sftp);
            }
        } else {
            const configPath = pathCombine(config.connectionSettings.dir, config.directoryName);
            const realPath = await sftp.realPath(configPath);
            log(config, `RemoveDirectory - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
            await removeIfExists(realPath, sftp);
        }
        log(config, "RemoveDirectory - Directory removed.");
        await sftp.end();
        log(config, "RemoveDirectory - SFTP Connection closed.");
        return {
            status: true,
        };
    } catch (err) {
        log(config, "sftpRemoveDirectory - Failed", err);
        return {
            status: false,
            error: `Error during SFTP directory removing: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpRemoveDirectory - Finished");
    }

    async function removeIfExists(directoryPath: string, sftp: Sftp) {
        try {
            const pathStat = await sftp.stat(directoryPath);
            if (!pathStat.isDirectory) {
                return;
            }
        } catch (error) {
            log(config, "Error during stat check: ", error);
        }

        try {
            await sftp.rmdir(directoryPath, true);
        } catch (error) {
            log(config, "Error during removeIfExists: ", error);
        }
    }
}

export async function sftpList(config: ISftpListOptions): Promise<ISftpListResult | PromiseLike<ISftpListResult>> {
    log(config, "sftpList - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
        });
        const cwd = await sftp.cwd();
        log(config, `List - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`, config.connectionSettings.dir);

        const configPath = pathCombine(config.connectionSettings.dir, config.directory || "");
        const realPath = await sftp.realPath(configPath);
        log(config, `List - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
        const fileInfos = await sftp.list(realPath);
        log(config, "List - files listed.");
        await sftp.end();
        log(config, "List - SFTP Connection closed.");
        return {
            files: fileInfos.map((f) => {
                return { fileName: f.name, modifiedDate: f.modifyTime };
            }),
            status: true,
        };
    } catch (err) {
        log(config, "sftpList - Failed", err);
        return {
            files: [],
            status: false,
            error: `Error during SFTP listing: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpList - Finished");
    }
}

export async function sftpExists(config: ISftpExistsOptions): Promise<ISftpExistsResult | PromiseLike<ISftpExistsResult>> {
    log(config, "sftpExists - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
        });
        const cwd = await sftp.cwd();
        log(config, `Exists - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`, config.connectionSettings.dir);

        const configPath = pathCombine(config.connectionSettings.dir, config.fileName);
        const realPath = await sftp.realPath(configPath);
        log(config, `Exists - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
        const isExisting = await sftp.exists(realPath);
        log(config, "Exists - file existing checked.");
        await sftp.end();
        log(config, "Exists - SFTP Connection closed.");
        return {
            isExisting: !!isExisting,
            status: true,
        };
    } catch (err) {
        log(config, "sftpExists - Failed", err);
        return {
            isExisting: false,
            status: false,
            error: `Error during SFTP existing check: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpExists - Finished");
    }
}

export async function sftpDownload(config: ISftpDownloadOptions): Promise<ISftpDownloadResult | PromiseLike<ISftpDownloadResult>> {
    log(config, "sftpDownload - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
        });
        const cwd = await sftp.cwd();
        log(config, `Download - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`, config.connectionSettings.dir);

        const configPath = pathCombine(config.connectionSettings.dir, config.fileName);
        const realPath = await sftp.realPath(configPath);
        log(config, `Download - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
        const file = await sftp.get(realPath);
        log(config, "Download - file downloaded.");
        await sftp.end();
        log(config, "Download - SFTP Connection closed.");
        return {
            fileContent: file.toString(),
            status: true,
        };
    } catch (err) {
        log(config, "sftpDownload - Failed", err);
        return {
            fileContent: "",
            status: false,
            error: `Error during SFTP downloading: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpDownload - Finished");
    }
}

export async function sftpUpload(config: ISftpUploadOptions): Promise<ISftpUploadResult | PromiseLike<ISftpUploadResult>> {
    log(config, "sftpUpload - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
        });
        const cwd = await sftp.cwd();
        log(config, `Upload - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`, config.connectionSettings.dir);
        const contentBuffer = Buffer.from(config.content, "utf8");
        const configPath = pathCombine(config.connectionSettings.dir, config.fileName);
        const realPath = await sftp.realPath(configPath);
        log(config, `Upload - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
        await sftp.put(contentBuffer, realPath, { writeStreamOptions });
        log(config, "Upload - Data uploaded.");
        await sftp.end();
        log(config, "Upload - SFTP Connection closed.");
        return {
            status: true,
        };
    } catch (err) {
        log(config, "sftpUpload - Failed", err);
        return {
            status: false,
            error: `Error during SFTP uploading: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpUpload - Finished");
    }
}

export async function sftpDelete(config: ISftpDeleteOptions): Promise<ISftpDeleteResult | PromiseLike<ISftpDeleteResult>> {
    log(config, "sftpDelete - Start");
    const sftp = new Sftp();
    try {
        await sftp.connect({
            host: config.connectionSettings.host,
            port: config.connectionSettings.port,
            username: config.connectionSettings.userName,
            password: config.connectionSettings.password,
        });
        const cwd = await sftp.cwd();
        log(config, `Delete - SFTP Connection established. Remote working directory is cwd: '${cwd}'.`, config.connectionSettings.dir);
        if (Array.isArray(config.fileNames)) {
            for (const fileName of config.fileNames) {
                const configPath = pathCombine(config.connectionSettings.dir, fileName);
                const realPath = await sftp.realPath(configPath);
                log(config, `Delete - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
                await sftp.delete(realPath, true);
            }
        } else {
            const configPath = pathCombine(config.connectionSettings.dir, config.fileNames);
            const realPath = await sftp.realPath(configPath);
            log(config, `Delete - SFTP real path resolved: '${realPath}' from '${configPath}'.`);
            await sftp.delete(realPath, true);
        }
        log(config, "Delete - Data Deleted.");
        await sftp.end();
        log(config, "Delete - SFTP Connection closed.");
        return {
            status: true,
        };
    } catch (err) {
        log(config, "sftpDelete - Failed", err);
        return {
            status: false,
            error: `Error during SFTP Deleting: ${JSON.stringify(err)}`,
        };
    } finally {
        log(config, "sftpDelete - Finished");
    }
}

function pathCombine(rootDir: string | undefined, name: string): string {
    if (rootDir === undefined) {
        return name;
    }
    return rootDir + path.delimiter + name;
}

function log(config: IDebugSftpOptions, message?: any, ...optionalParams: any[]): void {
    config.debug && console.log(message, ...optionalParams);
}
