import { ClassValue, clsx as classNames } from "clsx";
import { twMerge } from "tailwind-merge";

const clsx = (...inputs: ClassValue[]) => {
  return twMerge(classNames(inputs));
};

export default clsx;
