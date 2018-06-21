import { InjectionToken } from "@angular/core";

export let EnvironmentVariables = new InjectionToken("env.variables");

class BaseConfig {
    apiEndpoint: string = 'localhost:5000';
}

class DevelopmentConfig extends BaseConfig {
    apiEndpoint: string = 'localhost:5000';
}

class ProductionConfig extends BaseConfig {
    apiEndpoint: string = 'danaproject.org';
}

export let applicationConfig = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}