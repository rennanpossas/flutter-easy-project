import * as _ from 'lodash';
import { Base } from '../base';

export class ViewModel extends Base {

  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.viewmodel.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import 'package:flutter_modular/flutter_modular.dart';
import 'package:mobx/mobx.dart';
import '../usecase/${this.getLowerName}.usecase.dart';
import '../model/${this.getLowerName}.model.dart';
part '${this.getLowerName}.viewmodel.g.dart';

class ${this.getName}ViewModel = _${this.getName}ViewModelBase with _$${this.getName}ViewModel;

abstract class _${this.getName}ViewModelBase with Store {
  final ${this.getName}UseCase _${this.getLowerName}UseCase = Modular.get();

  @observable
  bool logged = false;

  @action
  Future<void> execute() async {
    ${this.getName}Model ${this.getLowerName}Model = await _${this.getLowerName}UseCase.execute();
    logged = ${this.getLowerName}Model.varName;
  }
}`;

    this.genericCode = `import 'package:mobx/mobx.dart';
part '${this.getLowerName}.viewmodel.g.dart';

class ${this.getName}ViewModel = _${this.getName}ViewModelBase with _$${this.getName}ViewModel;

abstract class _${this.getName}ViewModelBase with Store {
  @observable
  int count = 0;

  @action
  void increment() {
    count++;
  }
}`;
  }  
}