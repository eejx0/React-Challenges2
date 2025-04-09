import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
  }
}

export const LightTheme: DefaultTheme = {
    background: "pink",
    color: "black"
}

export const DarkTheme: DefaultTheme = {
    background: "black",
    color: "white"
}