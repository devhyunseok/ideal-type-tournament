import Comic, { comicList } from './model/Comic';
import { shuffleList } from "./utils/utils";
import Stage from "./model/Stage";

const leftImage = <HTMLImageElement>document.getElementById("left-img");
const rightImage = <HTMLImageElement>document.getElementById("right-img");
const btnLeft = <HTMLButtonElement>document.getElementById("btn-left-img");
const btnRight = <HTMLButtonElement>document.getElementById("btn-right-img");
const curRound = <HTMLSpanElement>document.getElementById("current-round");
const historyListEl = <HTMLUListElement>document.getElementById("history-list");

let roundCount = 0;
let history = [];
let round : Stage[] = [];

const main = () => {
  // TODO: 나중에 해제 해야함.
  btnLeft.addEventListener('click', leftImageClick);
  btnRight.addEventListener('click', rightImageClick);
  
  const shuffle = shuffleList(comicList);

  initNewRound(shuffle);
  
  console.log(round);
  console.log(comicList);
  console.log(shuffle);
  
  nowBattle(round[roundCount]);
};
// 새로운 라운드를 생성
const initNewRound = (list: Comic[]) => {
  round = []; // 초기화
  roundCount = 0;

  for (let i = 0; i < list.length; i+=2) {
    console.log(i);
    round.push(new Stage(list[i], list[i+1]))
  }

  curRound.textContent = String(round.length * 2);

  // li 추가
  const liEl = document.createElement("li");
  list.forEach(item => liEl.appendChild(document.createTextNode(`${item.getName()}, `)))
  historyListEl.appendChild(liEl);
};

const leftImageClick = () => {
  round[roundCount].getLeft().selected = true;
  roundCount++;

  if(roundCount >= round.length) {
    const selectedRound = round.map(item => {
      if(item.getLeft().getSelected()) {
        item.getLeft().selected = false
        return item.getLeft();
      }
      item.getRight().selected = false;
      return item.getRight();
    });

    console.log(selectedRound);
    history.push(round);
    initNewRound(selectedRound);
  }

  nowBattle(round[roundCount]);
};

const rightImageClick = () => {
  round[roundCount].getRight().selected = true;
  roundCount++;

  if(roundCount >= round.length) {
    console.log('bb');
    const selectedRound = round.map(item => {
      if(item.getLeft().getSelected()) {
        item.getLeft().selected = false
        return item.getLeft();
      }
      item.getRight().selected = false;
      return item.getRight();
    });

    console.log(selectedRound);
    history.push(round);
    initNewRound(selectedRound);
  }

  nowBattle(round[roundCount]);
};

const nowBattle = (curRound: Stage) => {
  leftImage.src = curRound.getLeft() && curRound.getLeft().getImagePath();
  rightImage.src = curRound.getRight() && curRound.getRight().getImagePath();
  console.log(roundCount);
  console.log(round);
};

main();
