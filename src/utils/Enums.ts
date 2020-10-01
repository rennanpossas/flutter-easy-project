export enum ArchitectureType{
    MVVM_MobX_Modular = "mvvm_mobx_modular",
    MVC_BLoC = "mvc_bloc"
}

export enum ComponentType{
    MODEL = "Model",
    REPOSITORY = "Repository",
    USECASE = "UseCase",
    VIEW = "View",
    VIEWMODEL = "ViewModel",
    WIDGET = "Widget",
    FEATURE = "Feature"
}

export enum PubspecAttribute{
    DEPENDENCIES = "dependencies",
    DEV_DEPENDENCIES = "dev_dependencies",
    SCRIPTS = "scripts"
}

export enum MvvmMobxModularFolders{
    UI = "ui",
    USECASE = "usecase",
    FEATURES = "features",
    VIEW = "view",
    VIEWMODEL = "viewmodel",
    WIDGET = "widget",
    DATA = "data",
    MODEL = "model",
    MODULE = "module",
    REPOSITORY = "repository",
    LIBRARIES = "libraries",
    COMMON = "common",
    APP = "app"
}