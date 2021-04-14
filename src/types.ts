import { ImageStyle, TextStyle,  ViewStyle } from 'react-native';
import { EStyleSheet } from '.';

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

export type GetOnlyNumberReturns<T> = {
    [Key in keyof T]: T[Key] extends number ? PrimitiveType : never;
}

export type ExtendStyle<T> = AddFunctionReturnType<AddStringToNumberReturns<T>>;
// export type ExtendStyle<T> = AddStringToNumberReturns<T>;

export type OnlyNumberViewStyle = GetOnlyNumberReturns<ViewStyle>;

export const onvsTest: OnlyNumberViewStyle = {
    borderRadius: '20px',
}


export const evsTest: ExtendedViewStyle = {
    borderRadius: '20 px',
}

export const creatTest = EStyleSheet.create({
    barkley: {
        borderRadius: '20 px',
        backgroundColor: 'fuck',
    }
});
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

export type DollarSignString = `$${string}`;

export type RawGlobalVars<T> = {
    [P in keyof T]: P extends `$${string}` 
        ? PrimitiveType
        : P extends `@media${string}`
        ? RawGlobalVars<T[P]>
        : never ; 
}