import { ImageStyle, TextStyle,  ViewStyle } from 'react-native';

export type PrimitiveType = string | number;

export type RemoveMediaQueries<Q> = Q extends `@media${string}` ? never : Q;

export type CreateReturnType<T> = {
    [Key in RemoveMediaQueries<keyof T>]: ViewStyle | TextStyle | ImageStyle;
};

export type MediaQueryStyles<T> = {
    [Key in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type AddFunctionReturnType<T> = {
    [Key in keyof T]: T[Key] | (() => T[Key]);
}

export type AddStringToNumberReturns<T> = {
    [Key in keyof T]: T[Key] extends number ? PrimitiveType : T[Key];
}

export type ExtendStyle<T> = AddFunctionReturnType<AddStringToNumberReturns<T>>;

export type ExtendedViewStyle = ExtendStyle<ViewStyle>;
export type ExtendedTextStyle = ExtendStyle<TextStyle>;
export type ExtendedImageStyle = ExtendStyle<ImageStyle>;

export type ExtendedStyleType = ExtendedViewStyle | ExtendedTextStyle | ExtendedImageStyle;

export type NamedStyles<T> = {
    [P in keyof T]: P extends `@media${string}`
        ? MediaQueryStyles<T[P]>
        : P extends `$${string}`
        ? PrimitiveType
        : ExtendedStyleType;
};