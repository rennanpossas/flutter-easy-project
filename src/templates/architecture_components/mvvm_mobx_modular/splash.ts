import * as _ from 'lodash';
import { Base } from '../base';

export class Splash extends Base {

  public static getFormattedFileName(fileName:string){
    return `splash.view.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';

class SplashView extends StatefulWidget {
@override
_SplashViewState createState() => _SplashViewState();
}

class _SplashViewState extends State<SplashView> {
@override
void initState() {
  Future.delayed(Duration(seconds: 3)).then((_) async {
      Modular.to.pushReplacementNamed('/app');
  });
  super.initState();
}

@override
Widget build(BuildContext context) {
  return Scaffold(
      body: Center(
          child: Text(
              'Loading...',
          ),
      ),
  );
}
}`;
  }

}