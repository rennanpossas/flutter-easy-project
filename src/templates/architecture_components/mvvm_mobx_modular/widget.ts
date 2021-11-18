import * as _ from 'lodash';
import { Base } from '../base';

export class Widget extends Base {
    public static getFormattedFileName(fileName:string){
      return `${fileName.toLowerCase()}.widget.dart`;
    }
  
    constructor(fileName: string, private project?: string) {
  
      super(fileName);

      this.code = `import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${this.getName}Widget extends StatelessWidget {
  const ${this.getName}Widget({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Title',
      theme: ThemeData(
        fontFamily: 'Rubik',
      ),
    ).modular();
  }
}`;
  }
}