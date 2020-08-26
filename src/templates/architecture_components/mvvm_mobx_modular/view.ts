import * as _ from 'lodash';
import { Base } from '../base';

export class View extends Base {
  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.view.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import './${this.getLowerName}.viewmodel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${this.getName}View extends StatefulWidget {

const ${this.getName}View({Key key}) : super(key: key);

@override
_${this.getName}ViewState createState() => _${this.getName}ViewState();

}

class _${this.getName}ViewState extends State<${this.getName}View> {

final ${this.getName}ViewModel viewmodel = Modular.get();

@override
Widget build(BuildContext context) {
  return Scaffold(
      appBar: AppBar(
          title: Text("View Inicial"),
      ),
      body: Center(
          child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
              Text(
                  'Login executado?',
              ),
              Observer(
                  builder: (_) => Text(
                      '\${viewmodel.logged}'
                  ),
              ),
          ],
          ),
      ),
      floatingActionButton: FloatingActionButton(
          onPressed: viewmodel.execute,
          tooltip: 'Execute',
          child: Icon(Icons.add),
      ),
  );
}
}`;

  this.genericCode = `import './${this.getLowerName}.viewmodel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${this.getName}View extends StatefulWidget {

const ${this.getName}View({Key key}) : super(key: key);

@override
_${this.getName}ViewState createState() => _${this.getName}ViewState();

}

class _${this.getName}ViewState extends State<${this.getName}View> {

final ${this.getName}ViewModel viewmodel = Modular.get();

@override
Widget build(BuildContext context) {
  return Scaffold(
      appBar: AppBar(
          title: Text("View Inicial"),
      ),
      body: Center(
          child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
              Text(
                  'Quantidade de clicks:',
              ),
              Observer(
                  builder: (_) => Text(
                      '\${viewmodel.count}'
                  ),
              ),
          ],
          ),
      ),
      floatingActionButton: FloatingActionButton(
          onPressed: viewmodel.increment,
          tooltip: 'Increment',
          child: Icon(Icons.add),
      ),
  );
}
}`;     

  }
}