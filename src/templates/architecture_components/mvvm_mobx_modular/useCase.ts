import * as _ from 'lodash';
import { Base } from '../base';

export class UseCase extends Base {

  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.usecase.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import '../data/${this.getLowerName}.repository.dart';
import '../model/${this.getLowerName}.model.dart';
import '../../../libraries/common/usecase/usecase.interface.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${this.getName}UseCase extends Disposable
  implements IUseCase<void, ${this.getName}Model> {
final ${this.getName}Repository _${this.getLowerName}Repository = Modular.get();

@override
Future<${this.getName}Model> execute() async {
  ${this.getName}Model response;

  try {
    response = await _${this.getLowerName}Repository.load();
  } catch (e) {
    print('ERROR:$e');
  }

  return response;
}

@override
void dispose() {}
}`;

    this.genericCode = `import '../../../libraries/common/usecase/usecase.interface.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${this.getName}UseCase extends Disposable
  implements IUseCase<void, bool> {
//final ${this.getName}Repository _${this.getLowerName}Repository = Modular.get();

@override
Future<bool> execute() async {
  bool response = false;

  try {
    response = true; //await _${this.getLowerName}Repository.load();
  } catch (e) {
    print('ERROR:$e');
  }

  return response;
}

@override
void dispose() {}
}`;
  }
}