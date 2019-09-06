import Comic, { comicList } from './model/Comic';
import { shuffleList } from "./utils/utils";
import Stage from "./model/Stage";

let curRound = 0;
let history = [];

const leftImage = <HTMLImageElement>document.getElementById("left-img");
const rightImage = <HTMLImageElement>document.getElementById("right-img");
const btnLeft = <HTMLButtonElement>document.getElementById("btn-left-img");
const btnRight = <HTMLButtonElement>document.getElementById("btn-right-img");

const main = () => {
  // TODO: 나중에 해제 해야함.
  btnLeft.addEventListener('click', leftImageClick);
  btnRight.addEventListener('click', rightImageClick);

  const shuffle = shuffleList(comicList);
  const round = [];

  for (let i = 0; i < (shuffle.length / 2); i+=2) {
    console.log(i);
    round.push(new Stage(shuffle[i], shuffle[i+1]))
  }

  console.log(round);
  console.log(comicList);
  console.log(shuffle);

  nowBattle(round[0]);
};

const leftImageClick = () => {

};

const rightImageClick = () => {

};

const nowBattle = (round: Stage) => {
  leftImage.src = round.getLeft().getImagePath();
  rightImage.src = round.getRight().getImagePath();
};

main();
