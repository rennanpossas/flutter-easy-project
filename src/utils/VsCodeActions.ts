import { window, InputBoxOptions, workspace, WorkspaceConfiguration, WorkspaceFolder } from 'vscode';
import * as _ from 'lodash';

export class VsCodeActions {

    public static async getInputString(placeHolder?: string, validateInput?: InputBoxOptions["validateInput"]): Promise<string> {
        let input = await window.showInputBox({
            placeHolder: placeHolder,
            validateInput: validateInput,
        });
        if (input === undefined) {
            return "";
        }
        return input;
    }
    
    public static async showPickItems(items: any[], placeholder: any): Promise<any> {
        return await window.showQuickPick(items, { placeHolder: placeholder, canPickMany:false});
    }

    public static get rootPath(): string {
        let rootPath = workspace.rootPath;
        if (_.isUndefined(rootPath)) { return ''; }
        return rootPath;
    }

    public static showErrorMessage(message: string) {
        window.showErrorMessage(message);
    }

    public static showInformationMessage(message: string) {
        window.showInformationMessage(message);
    }

    public static getEditorConfiguration(): WorkspaceConfiguration {
        let configuration = workspace.getConfiguration('editor');
        return configuration;

    }
}