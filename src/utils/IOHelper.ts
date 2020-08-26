import * as fs from "fs";
import * as vscode from 'vscode';
import * as path from 'path';
import * as shell from "shelljs";
import * as _ from 'lodash';
import { VsCodeActions } from "./VsCodeActions";
import { YamlHelper } from "./YamlHelper";


export class IOHelper {
    public static createFile(pathValue: string, fileName: string, data: string) {
        let filePath = path.join(pathValue, fileName);
        fs.writeFileSync(filePath, data);
    }

    public static openFile(filePath: string) {
        let openPath = vscode.Uri.file(filePath);
        
        vscode.workspace.openTextDocument(openPath).then((document) => {
            vscode.window.showTextDocument(document);
        });
    }

    public static getLibPath(){
        return path.join(VsCodeActions.rootPath, 'lib');
    }

    public static getLibrariesPath(){
        return path.join(this.getLibPath(), 'libraries');
    }

    public static getFeaturePath(){
        return path.join(this.getLibPath(), 'features');
    }

    public static listFolders(path:string){
        let dirs = shell;
        return dirs;
    }

    public static createFolder(pathValue: string) : string {
        if (!fs.existsSync(pathValue)) {
            try {
                shell.mkdir('-p', pathValue);
            } catch (error) {
                console.error(`Erro ao criar a pasta: ${error}`);
                return "";
            }
        }
        return pathValue;
    }

    public static fileExist(filePath: string, fileName: string): boolean {
        return fs.existsSync(path.join(filePath, fileName));
    }

    public static readFileAsString(filePath: string, fileName: string): string | undefined {
        if (!this.fileExist(filePath, fileName)) { return undefined; }
        let fileBuffer = fs.readFileSync(path.join(filePath, fileName));
        let fileData = fileBuffer.toString();
        return fileData;
    }

    public static isFlutterProject(): boolean {
        let rootPath = VsCodeActions.rootPath;
        if (!fs.existsSync(path.join(rootPath, 'pubspec.yaml'))) {
            VsCodeActions.showErrorMessage('Pubspec.yaml não encontrado');
            return false;
        }
        let errorMessage = YamlHelper.isValidFlutterPubspec();
        console.error(errorMessage);
        if (errorMessage !== undefined) {
            VsCodeActions.showErrorMessage(errorMessage);
            return false;
        }

        return true;
    }

    public static async listDirectories(rootPath:string):Promise<string[]>{
        let results: string[] = [];
        let files = await fs.promises.readdir(rootPath, {withFileTypes:true});
        files.forEach((file)=>{
            results.push(file.name);
        });
        return results;
    }
}