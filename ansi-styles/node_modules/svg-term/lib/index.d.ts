export interface SvgTermOptions {
    idle?: number;
    fps?: number;
    at?: number;
    from?: number;
    to?: number;
    width?: number;
    height?: number;
    paddingX?: number;
    paddingY?: number;
    theme?: SvgTermTheme;
    window?: boolean;
    cursor?: boolean;
}
export declare type SvgTermColor = [number, number, number];
export interface SvgTermTheme {
    0: SvgTermColor;
    1: SvgTermColor;
    2: SvgTermColor;
    3: SvgTermColor;
    4: SvgTermColor;
    5: SvgTermColor;
    6: SvgTermColor;
    7: SvgTermColor;
    8: SvgTermColor;
    9: SvgTermColor;
    10: SvgTermColor;
    11: SvgTermColor;
    12: SvgTermColor;
    13: SvgTermColor;
    14: SvgTermColor;
    15: SvgTermColor;
    background: SvgTermColor;
    bold: SvgTermColor;
    cursor: SvgTermColor;
    text: SvgTermColor;
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
}
export declare function render(raw: string, options?: SvgTermOptions): string;
