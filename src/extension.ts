import * as vscode from 'vscode';
import * as _ from 'lodash';
import { ArchitectureCommand } from './commands/architecture_command';
import { VsCodeActions } from './utils/VsCodeActions';
import {CustomQuickPickItem} from './custom/CustomQuickPickItem';
import { ArchitectureType, ComponentType } from './utils/Enums';

export function activate(context: vscode.ExtensionContext) {

	let addFeature = vscode.commands.registerCommand('flutter-easy-project.createFeature', async () => {
		let featureName = await VsCodeActions.getInputString('Insert the feature\'s name', async (value) => {
			if (value.length === 0) {
				return 'Insert the feature\'s name';
			}

			return undefined;
		});

		if(featureName !== undefined){
			ArchitectureCommand.createComponent({name:featureName, type:ComponentType.FEATURE});
		}
	});

	let createModel = vscode.commands.registerCommand('flutter-easy-project.createModel', async () => {
		await executeCheck(ComponentType.MODEL);
	});

	let createWidget = vscode.commands.registerCommand('flutter-easy-project.createWidget', async () => {});

	let createRepository = vscode.commands.registerCommand('flutter-easy-project.createRepository', async () => {
		await executeCheck(ComponentType.REPOSITORY);
	});

	let createView = vscode.commands.registerCommand('flutter-easy-project.createView', async () => {
		await executeCheck(ComponentType.VIEW);
	});

	let createViewModel = vscode.commands.registerCommand('flutter-easy-project.createViewModel', async () => {	
		await executeCheck(ComponentType.VIEWMODEL);
	});

	let createUseCase = vscode.commands.registerCommand('flutter-easy-project.createUseCase', async () => {
		await executeCheck(ComponentType.USECASE);
	});

	let executeCheck = async (component:ComponentType) :Promise<boolean>  => { 
		let features = await ArchitectureCommand.listFeatures();
		let selectedFeature:string = '';

		if(features === undefined || features.length === 0){
			VsCodeActions.showInformationMessage(`To create a ${component.toString()} it is necessary to create a feature before :)`);
			return false;
		}
		
		await VsCodeActions.showPickItems(features, `Select the feature where you want to insert the ${component.toString()}:`).then(selection => {
			selectedFeature = <string>selection;
		});

		if(selectedFeature === undefined || selectedFeature.length === 0){
			return false;
		}

		let newObjectName = await VsCodeActions.getInputString(`Insert the ${component.toString()}\'s name`, async (value) => {
			if (value.length === 0) {
				return `Insert the ${component.toString()}\'s name`;
			}

			return undefined;
		});

		if(newObjectName !== undefined && newObjectName.length > 0){
			ArchitectureCommand.createComponent({name:newObjectName, feature:selectedFeature!, type:component});
			return true;
		}

		return false;
	};

	let setupProject = vscode.commands.registerCommand('flutter-easy-project.setupProject', async () => {
		let items : CustomQuickPickItem[] = [
            {label: 'MVVM + C.A. + MobX + Flutter Modular', description: 'Application structure: MVVM, MobX and Modular', id:ArchitectureType.MVVM_MobX_Modular},
            {label: 'MVC + BLoC', description: 'Application structure: MVC and BLoC', id:ArchitectureType.MVC_BLoC}
        ];
        VsCodeActions.showPickItems(items, "Select architecture type:").then(selection => {
            ArchitectureCommand.setupProject(selection?.id!);
        });
	});

	context.subscriptions.push(setupProject);
	context.subscriptions.push(addFeature);
	context.subscriptions.push(createModel);
	context.subscriptions.push(createWidget);
	context.subscriptions.push(createRepository);
	context.subscriptions.push(createView);
	context.subscriptions.push(createViewModel);
	context.subscriptions.push(createUseCase);
}

export function deactivate() {}
