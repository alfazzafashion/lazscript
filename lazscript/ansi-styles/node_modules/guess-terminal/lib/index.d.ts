export declare enum GuessedTerminal {
    hyper = "hyper",
    iterm2 = "iterm2",
    terminal = "terminal",
}
export declare function guessTerminal(): GuessedTerminal | null;
