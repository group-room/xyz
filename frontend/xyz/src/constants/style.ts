/*eslint quote-props: ["error", "consistent"]*/

type BgColorType = {
  [blue: string]: string;
  pink: string;
  yellow: string;
};

type RandomBgType = {
  [key: number]: string;
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
  1: "bg-1",
  2: "bg-2",
  3: "bg-3",
  4: "bg-4",
  5: "bg-5",
  6: "bg-6",
  7: "bg-7",
  8: "bg-8",
  9: "bg-9",
};
