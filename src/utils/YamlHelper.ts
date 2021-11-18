import * as yaml from 'js-yaml';
import { VsCodeActions } from './VsCodeActions';
import { IOHelper } from './IOHelper';
import { PubspecAttribute } from './Enums'
import * as _ from 'lodash';

export class YamlHelper {

    public static isValidFlutterPubspec(): string | undefined {
        let json = this.getPubspecJsonFile();
        if (json === undefined) { return 'Invalid format of pubspec file'; }
        let object = JSON.parse(json);

        if (object['environment'] === undefined) {
            return 'Environment definitions not found';
        }
        if (object['dependencies'] === undefined) {
            return 'Dependency definitions not found';
        }
        if (object['dependencies']['flutter'] === undefined) {
            return 'Flutter dependencies not found';
        }
        return undefined;
    }

    public static getProjectName(): string | undefined {
        let json = this.getPubspecJsonFile();
        if (json === undefined) { return undefined; }
        let object = JSON.parse(json);

        return object['name'];
    }

    public static getArchitectureType(): string | undefined {
        let json = this.getPubspecJsonFile();
        if (json === undefined) { return undefined; }
        let object = JSON.parse(json);

        return object['architecture_type'];
    }

    public static setArchitectureType(type:string): string | undefined {
        let json = this.getPubspecJsonFile();
        if (json === undefined) { return; }
        let object = JSON.parse(json);
        object['architecture_type'] = `${type}`;
        let modifiedString = JSON.stringify(object);
        let updatedYaml = this.toYAML(modifiedString);
        if (updatedYaml === undefined) {
            return;
        }
        this.overwritePubspecFile(updatedYaml);
    }

    public static addValueToPubspec(attribute:PubspecAttribute, module: string, value?: string){
        let json = this.getPubspecJsonFile();
        if (json === undefined) { return; }

        let object = JSON.parse(json);
        if(object[attribute] === undefined){
            object[attribute] = {};
        }

        object[attribute][module] = `${value}`;

        let modifiedString = JSON.stringify(object);
        console.debug(`Pubspec alterado: ${modifiedString}`);
        let updatedYaml = this.toYAML(modifiedString);
        if (updatedYaml === undefined) {
            return;
        }
        this.overwritePubspecFile(updatedYaml);
    }

    private static getPubspecJsonFile(): string | undefined {
        let rootPath = VsCodeActions.rootPath;
        let fileData = IOHelper.readFileAsString(rootPath, 'pubspec.yaml');
        if (fileData === undefined) {
            console.debug('Pubspec.yaml not found');
            return undefined;
        }
        let data = YamlHelper.toJSON(fileData);
        return data;
    }

    private static overwritePubspecFile(data: string) {
        IOHelper.createFile(VsCodeActions.rootPath, 'pubspec.yaml', data);
    }

    private static toYAML(text: string): string | undefined {
        let json;
        try {
            console.debug(`toYAML: ${text}`);
            json = JSON.parse(text);
        } catch (e) {
            VsCodeActions.showErrorMessage('Error on json parsing.');
            console.error(e);
            return undefined;
        }
        return yaml.dump(json, { indent: this.getIndent() });
    }

    private static toJSON(text: string) {
        let json;
        try {
            console.debug(`toJSON: ${text}`);
            json = yaml.load(text, { schema: yaml.JSON_SCHEMA });
        } catch (e) {
            VsCodeActions.showErrorMessage('Error on yaml parsing.');
            console.error(e);
            return;
        }
        return JSON.stringify(json, null, this.getIndent());
    }

    private static getIndent(): number {
        const editorCfg = VsCodeActions.getEditorConfiguration();
        if (editorCfg && editorCfg.get('insertSpaces')) {
            const tabSize = editorCfg.get('tabSize');
            if (tabSize && typeof tabSize === 'number') {
                return tabSize;
            }
        }
        return 2;
    }
}