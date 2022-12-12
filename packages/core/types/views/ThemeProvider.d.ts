/// <reference types="react" />
export type ThemeProviderProps = {
    className?: string;
    defaultTheme: string;
    disableRootThemeClass?: boolean;
    themeClassNameOnRoot?: boolean;
    children?: any;
    reset?: boolean;
};
export declare const ThemeProviderRootContext: import("react").Context<Pick<ThemeProviderProps, "defaultTheme"> | null>;
export declare const ThemeProvider: (props: ThemeProviderProps) => JSX.Element;
//# sourceMappingURL=ThemeProvider.d.ts.map