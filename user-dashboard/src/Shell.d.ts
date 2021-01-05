 /// <reference types="react" />

declare module "Shell/SharedStateService" {

    export const SelectUser;
    export const UpdateUser;
    export const changeUserLocation;
}

declare module "Shell/Atoms" {
    export const navbarTitle: RecoilState<string>
}