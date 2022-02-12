import { TermScheme } from "./term-scheme";
export interface HyperParserConfig {
    filename: string;
}
export declare function hyper(input: string, parserConfig: HyperParserConfig): TermScheme;
