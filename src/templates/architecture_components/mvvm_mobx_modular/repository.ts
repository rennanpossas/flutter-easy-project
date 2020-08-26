import * as _ from 'lodash';
import { Base } from '../base';

export class Repository extends Base {

  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.repository.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import './${this.getLowerName}.interface.repository.dart';
import '../model/${this.getLowerName}.model.dart';

class ${this.getName}Repository implements I${this.getName}Repository {
@override
Future<${this.getName}Model> load() {
  ${this.getName}Model response = new ${this.getName}Model(varName: true);

  return Future.value(response);
}
}`;

    this.genericCode = `import './${this.getLowerName}.interface.repository.dart';

class ${this.getName}Repository implements I${this.getName}Repository {
@override
Future<bool> load${this.getName}() {
  bool response = false;

  return Future.value(response);
}
}`;
  }

}