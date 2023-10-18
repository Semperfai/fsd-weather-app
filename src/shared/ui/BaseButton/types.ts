import type { Component } from "vue";
export interface IProps {
  variant: "primary" | "secondary";
  disabled: boolean;
  text: string;
  to: string;
  link: boolean;
  method: (payload: MouseEvent) => void;
  icon: Component;
}
