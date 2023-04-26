# Changelog

### 3.0.2

-   Added real path sftp wrapping logs for issues investigation.

### 3.0.1

-   Used real path sftp wrapping for each dir/file methods - fixed listing method.

### 3.0.0

-   Used real path sftp wrapping for each dir/file methods.

### 2.0.2

-   Made path sanitization for Linux - removed starting path with "/" without dir in configuration.

### 2.0.1

-   Fixed sftpClient.js packing through npmignore.

### 2.0.0

-   Updated ssh2-sftp-client

### 1.1.0

-   Added sftpRemoveDirectory

### 1.0.0

-   Cypress updated to 9.4.1.

### 0.1.0

### 0.0.6

-   Added optional choose of addressing method - "IPv4" | "IPv6".

### 0.0.5

-   Ignored all logs in root during npm publishing.
-   Upgraded ssh2-sftp-client package.

### 0.0.4

-   Fixed package main file in package.json.
-   Fixed directory creation if already exists.
-   Versioned built commands.ts.
-   Added vscode launch.json

### 0.0.3

-   Created cypress spec example.

### 0.0.2

-   Updated cypress dependency to ^8.0.1.

### 0.0.1

-   Created tasks sftpCreateDirectory, sftpList, sftpExists, sftpDownload, sftpUpload, sftpDelete.
