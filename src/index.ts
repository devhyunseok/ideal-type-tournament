import Comic, { comicList } from './model/Comic';
import { shuffleList } from "./utils/utils";
import Stage from "./model/Stage";

const leftImage = <HTMLImageElement>document.getElementById("left-img");
const rightImage = <HTMLImageElement>document.getElementById("right-img");
const btnLeft = <HTMLButtonElement>document.getElementById("btn-left-img");
const btnRight = <HTMLButtonElement>document.getElementById("btn-right-img");
const curRound = <HTMLSpanElement>document.getElementById("current-round");
const historyListEl = <HTMLUListElement>document.getElementById("history-list");
const btnBackEl = <HTMLButtonElement>document.getElementById("btn-back");

let roundCount = 0; // 현재 라운드
let history: Array<Stage[]> = [];
let round : Array<Stage> = [];

const main = () => {
  // TODO: 나중에 해제 해야함.
  btnLeft.addEventListener('click', leftImageClick);
  btnRight.addEventListener('click', rightImageClick);
  
  // 뒤로가기
  btnBackEl.addEventListener('click', cancelClick);

  //const shuffle = shuffleList(comicList);

  initNewRound(comicList);
  
  console.log(round);
  console.log(comicList);
  // console.log(shuffle);
  
  nowBattle(round[roundCount]);
};

// 취소 버튼
const cancelClick = () => {
  // 취소할 내역이 없음.
  if(roundCount <= 0 && history.length <= 0) {
    return; 
  }

  // 현재 라운드에서 하나라도 선택되었을 경우.
  if(roundCount > 0) {
    roundCount--;

    // 이전 선택 사항 취소.
    round[roundCount].getLeft().selected = false;
    round[roundCount].getRight().selected = false;

    nowBattle(round[roundCount]);
    return;
  }

  // 히스토리 이전 내용을 가져옴
  if(roundCount <= 0 && history.length > 0) {
    const prevRound = history.pop();

    console.log(prevRound);

    round = prevRound && prevRound.length > 0 ? prevRound : [];
    roundCount = round.length - 1;

     // 이전 선택 사항 취소.
    round[roundCount].getLeft().selected = false;
    round[roundCount].getRight().selected = false;
 
    // 현재 라운드 재 표기
    curRound.textContent = String(round.length * 2);

    nowBattle(round[roundCount]);
  }
}




// 새로운 라운드를 생성
const initNewRound = (list: Comic[]) => {
  round = []; // 초기화
  roundCount = 0;
  const shuffledList = shuffleList(list);

  for (let i = 0; i < shuffledList.length; i+=2) {
    console.log(i);
    round.push(new Stage(shuffledList[i], shuffledList[i+1]))
  }

  curRound.textContent = String(round.length * 2);

  // li 추가
  const liEl = document.createElement("li");
  shuffledList.forEach(item => liEl.appendChild(document.createTextNode(`${item.getName()}, `)))
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
