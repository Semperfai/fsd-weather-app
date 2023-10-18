import type { Component } from "vue";
export interface IProps {
  input: string;
  max: number;
  inputType: string;
  placeholder: string;
  disabled?: boolean;
  label?: string;
  method?: (payload: Event) => void;
  icon?: Component;
}
