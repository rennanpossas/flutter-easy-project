import * as _ from "lodash";

export abstract class Base {

    private _code: string = "Not implemented";
    private _genericCode: string = "Not implemented";

    constructor(private name: string) { }

    get code(): string {
        return this._code;
    }

    get genericCode(): string {
        return this._genericCode;
    }

    set code(value:string){
        this._code = value;
    }

    set genericCode(value:string){
        this._genericCode = value;
    }

    get getName(): string {
        return this.getFileName(this.name);
    }

    get getLowerName(): string {
        return this.getFileName(this.name, true);
    }

    private getFileName(fileName: string, toLower: boolean = false): string {
        if(toLower)
            return _.lowerCase(fileName)
        else{
            let className = this.toUpperFirstCamelCase(fileName);
            return className;
        }
    }

    private toUpperFirstCamelCase(fileName: string): string {
        let camelCaseString = _.camelCase(fileName);
        return _.upperFirst(camelCaseString);
    }
}