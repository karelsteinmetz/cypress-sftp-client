import { sftpCreateDirectory, sftpDelete, sftpDownload, sftpExists, sftpList, sftpUpload } from "./plugin/sftpUploadCore";

run(true)
    .catch((e) => {
        console.log("Error:", e);
    })
    .finally(() => {
        console.log("Process terminated");
    });

async function run(debug: boolean) {
    const dir = "sftp_client_test";
    const connectionSettings = {
        host: "127.0.0.1",
        port: 22,
        userName: "test1",
        password: "secret1",
        dir,
    };

    const createDirectoryResult = await sftpCreateDirectory({ debug, connectionSettings, directoryName: ["input", "failed", "ack"] });

    console.log("createDirectoryResult: ", createDirectoryResult);

    const uploadFileName = "input/test.txt";
    const uploadResult = await sftpUpload({
        content: "data",
        fileName: uploadFileName,
        debug,
        connectionSettings,
    });

    console.log("sftpUpload: ", uploadResult);

    const uploadFileName2 = "input/test2.txt";
    const uploadResult2 = await sftpUpload({
        content: "data",
        fileName: uploadFileName2,
        debug,
        connectionSettings,
    });

    console.log("sftpUpload2: ", uploadResult2);

    const existsResult = await sftpExists({
        fileName: uploadFileName,
        debug,
        connectionSettings,
    });

    console.log("existsResult: ", existsResult);

    const listResult = await sftpList({
        directory: "input",
        debug,
        connectionSettings,
    });

    console.log("listResult: " + listResult.files.map((f) => `${f.fileName} - ${f.modifiedDate}`), listResult);

    if (listResult.files.length === 0) {
        return;
    }

    const latestFile = listResult.files[0];
    const inputFileName = "input/" + latestFile.fileName;
    const fileContent = await sftpDownload({
        fileName: inputFileName,
        debug,
        connectionSettings,
    });

    console.log("sftpDownload: ", fileContent);

    const deleteResult = await sftpDelete({
        fileNames: [uploadFileName, uploadFileName2],
        debug,
        connectionSettings,
    });

    console.log("sftpDelete: ", deleteResult);
}
