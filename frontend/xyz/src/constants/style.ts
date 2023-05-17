/*eslint quote-props: ["error", "consistent"]*/

type BgColorType = {
  [blue: string]: string;
  pink: string;
  yellow: string;
};

type RandomBgType = {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  eight: string;
  nine: string;
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

export const RandomBg: RandomBgType = {
  one: "bg-1",
  two: "bg-2",
  three: "bg-3",
  four: "bg-4",
  five: "bg-5",
  six: "bg-6",
  seven: "bg-7",
  eight: "bg-8",
  nine: "bg-9",
};
