import { TermScheme, TermSchemeColor } from "./term-scheme";
export declare type Parser = (raw: any) => TermScheme;
export declare type Normalizer = (raw: string) => [Error, null] | [null, RemminaScheme];
export interface ParserOptions {
    group: string | null;
    wrap: boolean;
}
export interface NormalizerOptions {
    group: string;
}
export interface RemminaScheme {
    color0: TermSchemeColor;
    color1: TermSchemeColor;
    color2: TermSchemeColor;
    color3: TermSchemeColor;
    color4: TermSchemeColor;
    color5: TermSchemeColor;
    color6: TermSchemeColor;
    color7: TermSchemeColor;
    color8: TermSchemeColor;
    color9: TermSchemeColor;
    color10: TermSchemeColor;
    color11: TermSchemeColor;
    color12: TermSchemeColor;
    color13: TermSchemeColor;
    color14: TermSchemeColor;
    color15: TermSchemeColor;
    background: TermSchemeColor;
    bold: TermSchemeColor;
    cursor: TermSchemeColor;
    foreground: TermSchemeColor;
}
export declare const remmina: Parser;
export declare function createParser(name: string, opts: ParserOptions): Parser;
