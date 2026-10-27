import "styled-components";
import { DEFAULT_THEME } from "./Theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof DEFAULT_THEME.colors;
  }
}
