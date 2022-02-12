export interface IMacosAppConfig {
    [key: string]: any;
}
export default macosAppConfig;
export { sync };
declare function macosAppConfig(input: string): Promise<IMacosAppConfig>;
declare function sync(input: string): IMacosAppConfig;
