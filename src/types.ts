export interface ComponentConfig {
  name: string;
  description: string;
  dependencies: string[];
  shadcnDeps?: string[];
}

export interface ComponentsMap {
  [key: string]: ComponentConfig;
}

export interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
}

export interface InitOptions {
  yes?: boolean;
  typescript?: boolean;
  javascript?: boolean;
}
