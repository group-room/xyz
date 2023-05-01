/*eslint quote-props: ["error", "consistent"]*/

type BgColorType = {
  [blue: string]: string;
  pink: string;
  yellow: string;
};

export const BgColors: BgColorType = {
  blue: "bg-blue",
  pink: "bg-pink",
  yellow: "bg-yellow",
};

export const TextColors: BgColorType = {
  blue: "text-blue",
  pink: "text-pink",
  yellow: "text-yellow",
  white: "text-white",
};
