import * as _ from 'lodash';
import { Base } from '../base';

export class Module extends Base {
  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.module.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.genericCode = `import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import './app.widget.dart';
import './app.view.dart';
import './app.viewmodel.dart';
import './ui/splash/splash.view.dart';

class AppModule extends MainModule {
static AppView _appView = AppView();

List<Bind> repositories = [];

List<Bind> usecases = [];

List<Bind> splash = [
    Bind<SplashView>((i) => SplashView()),
];

List<Bind> app = [
    Bind<AppView>((i) => _appView),
    Bind<AppViewModel>((i) => AppViewModel()),
];

@override
List<Bind> get binds => splash + app + repositories + usecases;

@override
List<Router> get routers => [
        Router(Modular.initialRoute, child: (_, args) => SplashView()),
        Router('/app', child: (_, args) => _appView),
    ];

@override
Widget get bootstrap => AppWidget();

static Inject get to => Inject<AppModule>.of();
}`;

    this.code = `import 'package:flutter_modular/flutter_modular.dart';
import '../usecase/${this.getLowerName}.usecase.dart';
import '../data/${this.getLowerName}.repository.dart';
import '../ui/${this.getLowerName}.view.dart';
import '../ui/${this.getLowerName}.viewmodel.dart';

class ${this.getName}Module extends ChildModule {
List<Bind> repositories = [
    Bind<${this.getName}Repository>((i) => ${this.getName}Repository()),
];

List<Bind> usecases = [
    Bind<${this.getName}UseCase>((i) => ${this.getName}UseCase()),
];

List<Bind> ui = [
  Bind<${this.getName}View>((_) => ${this.getName}View()),
  Bind<${this.getName}ViewModel>((_) => ${this.getName}ViewModel()),
];

@override
List<Bind> get binds => ui + usecases + repositories;

@override
List<Router> get routers => [
      Router(Modular.initialRoute, child: (_, args) => ${this.getName}View()),
    ];
}`;
  }
}