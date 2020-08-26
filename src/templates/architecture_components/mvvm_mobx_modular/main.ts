import * as _ from 'lodash';
import { Base } from '../base';

export class Main extends Base {
  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `// Packages
import 'app/app.module.dart';
import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
    
// Modules
    
void main() => runApp(ModularApp(module: AppModule()));`;

  }
}