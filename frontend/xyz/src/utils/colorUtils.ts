const randomNumber = Math.floor(Math.random() * 9) + 1;
export let numberString: string;

switch (randomNumber) {
  case 1:
    numberString = "bg-one";
    break;
  case 2:
    numberString = "bg-two";
    break;
  case 3:
    numberString = "bg-three";
    break;
  case 4:
    numberString = "bg-four";
    break;
  case 5:
    numberString = "bg-five";
    break;
  case 6:
    numberString = "bg-six";
    break;
  case 7:
    numberString = "bg-seven";
    break;
  case 8:
    numberString = "bg-eight";
    break;
  case 9:
    numberString = "bg-nine";
    break;
}
