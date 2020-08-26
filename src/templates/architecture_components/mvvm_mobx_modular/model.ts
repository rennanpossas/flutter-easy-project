import * as _ from 'lodash';
import { Base } from '../base';

export class Model extends Base {
  public static getFormattedFileName(fileName:string){
    return `${fileName.toLowerCase()}.model.dart`;
  }

  constructor(fileName: string, private project?: string) {

    super(fileName);

    this.code = `import 'dart:convert';

class ${this.getName}Model {
${this.getName}Model({
      this.varName
  });

  bool varName;

  factory ${this.getName}Model.fromJson(String str) => ${this.getName}Model.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory ${this.getName}Model.fromMap(Map<String, dynamic> json) => ${this.getName}Model(
      varName: json["varName"]
  );

  Map<String, dynamic> toMap() => {
      "varName": varName
  };
}`;

    this.genericCode = `import 'dart:convert';

class ${this.getName}Model {
${this.getName}Model({
      this.varName
  });

  bool varName;

  factory ${this.getName}Model.fromJson(String str) => ${this.getName}Model.fromMap(json.decode(str));

  String toJson() => json.encode(toMap());

  factory ${this.getName}Model.fromMap(Map<String, dynamic> json) => ${this.getName}Model(
      varName: json["varName"]
  );

  Map<String, dynamic> toMap() => {
      "varName": varName
  };
}`;
  }
}