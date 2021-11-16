import * as path from 'path';
import * as _ from "lodash";
import {YamlHelper} from "../../utils/YamlHelper";
import {IOHelper} from "../../utils/IOHelper";
import {Model} from "../../templates/architecture_components/mvvm_mobx_modular/model";
import {Repository} from "../../templates/architecture_components/mvvm_mobx_modular/repository";
import {InterfaceRepository} from "../../templates/architecture_components/mvvm_mobx_modular/interface_repository";
import { View } from '../../templates/architecture_components/mvvm_mobx_modular/view';
import { Widget } from '../../templates/architecture_components/mvvm_mobx_modular/widget';
import { UseCase } from '../../templates/architecture_components/mvvm_mobx_modular/useCase';
import { MvvmMobxModularFolders, ArchitectureType, PubspecAttribute, MvcBlocFolders } from '../../utils/Enums';
import { Main } from '../../templates/architecture_components/mvvm_mobx_modular/main';
import { Module } from '../../templates/architecture_components/mvvm_mobx_modular/module';
import { Splash } from '../../templates/architecture_components/mvvm_mobx_modular/splash';
import { InterfaceUseCase } from '../../templates/architecture_components/mvvm_mobx_modular/library_usecase_interface';

export class MvcBLoCArchitecture {

    constructor(private rootPath: string) { }

    public init() {
        this.initDependencies();
        this.initPaths();
        this.initCore();
    }

    private initDependencies(){
        YamlHelper.addValueToPubspec(PubspecAttribute.DEV_DEPENDENCIES,"mockito", "^4.1.1");

        YamlHelper.setArchitectureType(ArchitectureType.MVC_BLoC);
    }

    private initPaths(){
        IOHelper.createFolder(path.join(IOHelper.getLibPath(), MvcBlocFolders.APP));
        IOHelper.createFolder(path.join(IOHelper.getLibPath(),"screens"));
    }

    private initCore() {
        IOHelper.createFile(IOHelper.getLibPath(), Main.getFormattedFileName('main'), new Main('main').code);

        let corePath = path.join(IOHelper.getLibPath(), MvcBlocFolders.APP);

        let viewsPath = IOHelper.createFolder(path.join(corePath, MvcBlocFolders.VIEW));

        let commonLibrariesPath = IOHelper.createFolder(path.join(IOHelper.getLibrariesPath(), MvcBlocFolders.COMMON));
        let commonUseCase = IOHelper.createFolder(path.join(commonLibrariesPath, MvcBlocFolders.USECASE));

        let splashPath = IOHelper.createFolder(path.join(viewsPath, "splash"));
<<<<<<< Updated upstream
        
        //app
        IOHelper.createFile(corePath, View.getFormattedFileName('app'), new View('app').genericCode);
        IOHelper.createFile(corePath, Widget.getFormattedFileName('app'), new Widget('app').code);
        IOHelper.createFile(corePath, Module.getFormattedFileName('app'), new Module('app').genericCode);
        IOHelper.createFile(corePath, Module.getFormattedFileName('app'), new Module('app').genericCode);
        IOHelper.createFile(corePath, Module.getFormattedFileName('app'), new Module('app').genericCode);
        IOHelper.createFile(corePath, Module.getFormattedFileName('app'), new Module('app').genericCode);
        IOHelper.createFile(corePath, Module.getFormattedFileName('app'), new Module('app').genericCode);

        //splash
        IOHelper.createFile(splashPath, Splash.getFormattedFileName('splash'), new Splash('splash').code);

        //libraries
        IOHelper.createFile(commonUseCase, InterfaceUseCase.getFormattedFileName('usecase'), new InterfaceUseCase('useCase').code);
=======
>>>>>>> Stashed changes
    }

    public createFeature(featureName:string){
        let featurePath = IOHelper.getFeaturePath()

        let customFeaturePath = IOHelper.createFolder(path.join(featurePath, featureName));

        //data
        let dataFeaturePath =  IOHelper.createFolder(path.join(customFeaturePath, MvvmMobxModularFolders.DATA));
        IOHelper.createFile(dataFeaturePath, Repository.getFormattedFileName(featureName), new Repository(featureName).code);
        IOHelper.createFile(dataFeaturePath, InterfaceRepository.getFormattedFileName(featureName), new InterfaceRepository(featureName).code);

        //models
        let modelsFeaturePath =  IOHelper.createFolder(path.join(customFeaturePath, MvvmMobxModularFolders.MODEL));
        IOHelper.createFile(modelsFeaturePath, Model.getFormattedFileName(featureName), new Model(featureName).code);

        //modules
        let modulesFeaturePath =  IOHelper.createFolder(path.join(customFeaturePath, MvvmMobxModularFolders.MODULE));
        IOHelper.createFile(modulesFeaturePath, Module.getFormattedFileName(featureName), new Module(featureName).code);

        //usecases
        let usecasesFeaturePath =  IOHelper.createFolder(path.join(customFeaturePath, MvvmMobxModularFolders.USECASE));
        IOHelper.createFile(usecasesFeaturePath, UseCase.getFormattedFileName(featureName), new UseCase(featureName).code);

        //views
        let viewsFeaturePath =  IOHelper.createFolder(path.join(customFeaturePath, MvvmMobxModularFolders.UI));
        IOHelper.createFile(viewsFeaturePath, View.getFormattedFileName(featureName), new View(featureName).code);
    }

    public createModel(modelName:string, featureName:string){
        let featurePath = IOHelper.createFolder(path.join(IOHelper.getFeaturePath(), featureName));
        let modelsFeaturePath =  IOHelper.createFolder(path.join(featurePath, MvvmMobxModularFolders.MODEL));

        IOHelper.createFile(modelsFeaturePath, Model.getFormattedFileName(modelName), new Model(modelName).genericCode);     
    }

    public createRepository(repoName:string, featureName:string){
        let featurePath = IOHelper.createFolder(path.join(IOHelper.getFeaturePath(), featureName));
        let repositoriesFeaturePath =  IOHelper.createFolder(path.join(featurePath, MvvmMobxModularFolders.DATA));

        IOHelper.createFile(repositoriesFeaturePath, Repository.getFormattedFileName(repoName), new Repository(repoName).genericCode);
        IOHelper.createFile(repositoriesFeaturePath, InterfaceRepository.getFormattedFileName(repoName), new InterfaceRepository(repoName).genericCode);     
    }

    public createViewModel(viewModelName:string, featureName:string){
        let featurePath = IOHelper.createFolder(path.join(IOHelper.getFeaturePath(), featureName));
        let viewModelPath =  IOHelper.createFolder(path.join(featurePath, MvvmMobxModularFolders.UI));
  
    }

    public createView(viewName:string, featureName:string){
        let featurePath = IOHelper.createFolder(path.join(IOHelper.getFeaturePath(), featureName));
        let viewPath =  IOHelper.createFolder(path.join(featurePath, MvvmMobxModularFolders.UI));

        IOHelper.createFile(viewPath, View.getFormattedFileName(viewName), new View(viewName).genericCode);;     
    }

    public createUseCase(useCaseName:string, featureName:string){
        let featurePath = IOHelper.createFolder(path.join(IOHelper.getFeaturePath(), featureName));
        let viewPath =  IOHelper.createFolder(path.join(featurePath, MvvmMobxModularFolders.USECASE));

        IOHelper.createFile(viewPath, UseCase.getFormattedFileName(useCaseName), new UseCase(useCaseName).genericCode);     
    }

    
}