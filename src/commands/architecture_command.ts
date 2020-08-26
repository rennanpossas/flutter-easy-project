import { VsCodeActions } from '../utils/VsCodeActions'
import { MvvmMobxModularArchitecture } from '../patterns/architecture/mvvm_mobx_modular_arch'
import { IOHelper } from '../utils/IOHelper';
import { ArchitectureType, ComponentType } from '../utils/Enums';
import { window, ProgressLocation } from 'vscode';
import { resolve } from 'path';

interface CreateComponentInterface{
    name:string,
    feature?:string,
    type:ComponentType
}
export class ArchitectureCommand{

    public static setupProject(type:ArchitectureType){
        let rootPath = VsCodeActions.rootPath;
        switch(type){
            case ArchitectureType.MVVM_MobX_Modular:
                return new MvvmMobxModularArchitecture(rootPath).init();
            default:
                VsCodeActions.showInformationMessage("Sorry, this template wasn't implemented :)")
        }
    }

    public static async listFeatures():Promise<string[]>{
        let features:any;

        try{
            await window.withProgress({
                location: ProgressLocation.Window,
                title: "Loading features",
                cancellable: false
            },async (progress)=>{
                features = await IOHelper.listDirectories(IOHelper.getFeaturePath());
                return resolve();
            })
        }catch(ex){
            VsCodeActions.showInformationMessage("Feature directory not found.");
        }
        
        return features;
    }

    public static createComponent(params:CreateComponentInterface){
        let rootPath = VsCodeActions.rootPath;
        let name = params.name.toLowerCase();
        let feature = params.feature;
        let type =params.type;
        switch(type){
            case ComponentType.MODEL:
                new MvvmMobxModularArchitecture(rootPath).createModel(name, feature!);
                break;
            case ComponentType.REPOSITORY:
                new MvvmMobxModularArchitecture(rootPath).createRepository(name, feature!);
                break;
            case ComponentType.USECASE:
                new MvvmMobxModularArchitecture(rootPath).createUseCase(name, feature!);
                break;
            case ComponentType.VIEW:
                new MvvmMobxModularArchitecture(rootPath).createView(name, feature!);
                break;
            case ComponentType.VIEWMODEL:
                new MvvmMobxModularArchitecture(rootPath).createViewModel(name, feature!);
                break;
            case ComponentType.WIDGET:
                new MvvmMobxModularArchitecture(rootPath).createViewModel(name, feature!);
                break;
            case ComponentType.FEATURE:
                new MvvmMobxModularArchitecture(rootPath).createFeature(name);
                break;
        }
    }
}