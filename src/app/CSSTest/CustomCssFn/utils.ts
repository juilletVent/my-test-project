import {
  transparentize as official_transparentize,
  lighten as official_lighten,
  darken as official_darken,
} from "polished";

export function transparentize(amount: number | string, color: string) {
  return official_transparentize(amount, color);
}

export function lighten(amount: number | string, color: string) {
  return official_lighten(amount, color);
}

export function darken(amount: number | string, color: string) {
  return official_darken(amount, color);
}

export function mydarken222(amount: number | string, color: string) {
  return official_darken(amount, color);
}
