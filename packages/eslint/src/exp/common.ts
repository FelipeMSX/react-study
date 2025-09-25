import { baseConfig } from "../configs/base-eslint.config";
import { jsonConfig } from "../configs/json-eslint.config";
import { reactConfig } from "../configs/react-eslint.config";
import { utilsConfig } from "../configs/utils-eslint-config";

export const globalConfig = [...baseConfig, ...utilsConfig, ...jsonConfig, ...reactConfig];
