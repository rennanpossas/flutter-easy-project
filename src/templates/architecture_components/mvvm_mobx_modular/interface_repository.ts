import * as _ from 'lodash';
import { Base } from '../base';

export class InterfaceRepository extends Base {
  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.interface.repository.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code =`import '../model/${this.getLowerName}.model.dart';

abstract class I${this.getName}Repository {
Future<${this.getName}Model> load();
}`;

    this.genericCode = `abstract class I${this.getName}Repository {
Future<bool> load${this.getName}();
}`;

  }
}