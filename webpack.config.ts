import * as path from "path";

export = {
    entry: path.resolve(__dirname, "sftpClient.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "sftpClient.js",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: [".js", ".ts", ".d.ts"],
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/plugin/],
                use: [
                    {
                        loader: "ts-loader",
                        options: { allowTsInNodeModules: true },
                    },
                ],
            },
        ],
    },
    mode: "development",
};
