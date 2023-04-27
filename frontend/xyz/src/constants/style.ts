/*eslint quote-props: ["error", "consistent"]*/

type BgColorType = {
  [blue: string]: string;
  pink: string;
  yellow: string; 
}

export const BgColors: BgColorType = {
  blue: "bg-blue",
  pink: "bg-pink",
  yellow: "bg-yellow",
};
