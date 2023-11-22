interface BrandConfig {
  content: string;
  background: string;
  border: string;
}
interface ButtonBrandConfig {
  [key: string]: Partial<{
    base: Partial<BrandConfig>;
    hover: Partial<BrandConfig>;
    acitve: Partial<BrandConfig>;
    disabled: Partial<BrandConfig>;
  }>;
}

interface ButtonStateConfig {
  success?: {};
  info?: {};
  warn?: {};
  error?: {};
}

type ButtonStyleConfig = Record<
  'base' | 'hover' | 'active',
  Partial<{
    background: string | [string, number];
    content: string | [string, number];
    border: string | [string, number];
  }>
>;

interface ButtonConfig {
  prefix: string;
  themes: Record<string, Partial<Record<'primary' | 'secondary' | 'tertiary', Partial<ButtonStyleConfig>>>>[];
}

export interface ThemeConfig {
  'ghost-hover': string;
  'ghost-content-hover': string;

  'base-100': string;
  'base-200': string;
  'base-300': string;
  'base-content': string;
  'base-bg': string;
  'base-content': string;
  'neutral-content': string;
  neutral: string;
  // 'body-content': string;
  'subtle-content': string;
  // 'supporting-content': string;

  brands: Partial<ButtonBrandConfig>;
  state: Partial<ButtonStateConfig>;
}

export interface Config {
  themes: Record<string, Partial<ThemeConfig>> | Array<Record<string, Partial<ThemeConfig>>>;
  button: Partial<ButtonConfig>;
}
