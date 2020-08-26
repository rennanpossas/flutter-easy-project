import * as _ from 'lodash';
import { Base } from '../base';

export class InterfaceUseCase extends Base {
  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.interface.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import 'package:flutter_modular/flutter_modular.dart';

abstract class I${this.getName}<TInput, TOutput> extends Disposable {
  Future<TOutput> execute();
}`;
  }
}