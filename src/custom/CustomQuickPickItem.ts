import {QuickPickItem} from 'vscode';
import { ArchitectureType } from '../utils/Enums'

export class CustomQuickPickItem implements QuickPickItem {
    label!: string;
    description?: string | undefined;
    detail?: string | undefined;
    picked?: boolean | undefined;
    alwaysShow?: boolean | undefined;
    id?: ArchitectureType | undefined;
}