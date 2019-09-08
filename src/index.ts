import Character, { CharacterList } from './model/Character';
import { shuffleList } from "./utils/utils";
import Stage from "./model/Stage";

const btnGameStartEl = <HTMLButtonElement>document.getElementById("game-start");
const gameStartPageEl = <HTMLDivElement>document.getElementById("game-start-page");
const gameBoardEl = <HTMLDivElement>document.getElementById("game-board");
const leftImage = <HTMLImageElement>document.getElementById("left-img");
const rightImage = <HTMLImageElement>document.getElementById("right-img");
const btnLeft = <HTMLButtonElement>document.getElementById("btn-left-img");
const btnRight = <HTMLButtonElement>document.getElementById("btn-right-img");
const curRound = <HTMLSpanElement>document.getElementById("current-round");
const historyListEl = <HTMLUListElement>document.getElementById("history-list");
const btnBackEl = <HTMLButtonElement>document.getElementById("btn-back");
const btnRestartEl = <HTMLButtonElement>document.getElementsByClassName("btn-restart")[0];
const btnFirstEl = <HTMLButtonElement>document.getElementById("btn-first");

let roundCount = 0; // 현재 라운드
let history: Array<Stage[]> = [];
let round : Array<Stage> = [];

const main = () => {
  // TODO: 나중에 해제 해야함.
  // 게임 시작 버튼
  btnGameStartEl.addEventListener('click', onGameStart);
  // 왼쪽 선택 버튼
  btnLeft.addEventListener('click', leftImageClick);
  // 오른쪽 선택 버튼
  btnRight.addEventListener('click', rightImageClick);
  // 뒤로가기
  btnBackEl.addEventListener('click', cancelClick);
  // 게임 재 시작 버튼
  btnRestartEl.addEventListener('click', onGameRestart);
  // 처음으로 이동 버튼
  btnFirstEl.addEventListener('click', onGameRestart);
};

/**
* 게임 시작
*/
const onGameStart = () => {
  initNewRound(CharacterList);
  
  console.log(round);
  console.log(CharacterList);
  
  nowBattle(round[roundCount]);
  
  gameStartPageEl.style.display = 'none';
  gameBoardEl.style.display = 'block';
};

/**
* 게임 재 시작
*/
const onGameRestart = () => {
  const versusWrapperEl = <HTMLDivElement>document.getElementsByClassName("versus")[0];
  const versusResultWrapperEl = <HTMLDivElement>document.getElementsByClassName("versus-result")[0];
  
  roundCount = 0; // 현재 라운드
  history = [];
  round = [];
  
  while (historyListEl.firstChild){
    historyListEl.removeChild(historyListEl.firstChild);
  }
  versusWrapperEl.style.display = 'block';
  versusResultWrapperEl.style.display = 'none';
  
  gameStartPageEl.style.display = 'flex';
  gameBoardEl.style.display = 'none';
}

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
    
    // TODO: 히스토리 수정
    
    nowBattle(round[roundCount]);
  }
}

/**
* 새로운 라운드를 생성
* @param list 
*/
const initNewRound = (list: Character[]) => {
  round = []; // 초기화
  roundCount = 0;
  const shuffledList = shuffleList(list);
  
  for (let i = 0; i < shuffledList.length; i+=2) {
    console.log(i);
    round.push(new Stage(shuffledList[i], shuffledList[i+1]))
  }
  
  curRound.textContent = String(round.length * 2);
  
  // li 추가
  addHistoryItemView(shuffledList);
};

const addHistoryItemView = (list: Character[]) => {
  const liEl = document.createElement("li");
  liEl.className = 'history-row';
  
  list.forEach((item: Character) => {
    const imageEl = document.createElement('img');
    imageEl.className = 'history-img'
    imageEl.src = item.getImagePath();
    
    const spanEl = document.createElement('span');
    spanEl.className = 'history-name'
    spanEl.textContent = item.getName();
    
    const divEl = document.createElement("div");
    divEl.className = 'history-item'
    divEl.appendChild(imageEl);
    divEl.appendChild(spanEl);
    
    liEl.appendChild(divEl);
  });
  
  historyListEl.prepend(liEl);
}

/**
* 왼쪽 이미지 선택
*/
const leftImageClick = () => {
  round[roundCount].getLeft().selected = true;
  roundCount++;
  
  selectImage();
};

// 이미지 선택
const selectImage = () => {
  if(roundCount >= round.length) {
    const selectedCharacter = round.map((item: Stage) => {
      if(item.getLeft().getSelected()) {
        item.getLeft().selected = false;
        return item.getLeft();
      }
      item.getRight().selected = false;
      return item.getRight();
    });
    
    history.push(round);
    
    if(selectedCharacter.length === 1) {
      addHistoryItemView(selectedCharacter);
      endOfGame(selectedCharacter[0]);
      return;
    }
    
    initNewRound(selectedCharacter);
  }
  
  nowBattle(round[roundCount]);
}

/**
* 최종 선택
*/
const endOfGame = (character: Character) => {
  const versusWrapperEl = <HTMLDivElement>document.getElementsByClassName("versus")[0];
  const versusResultWrapperEl = <HTMLDivElement>document.getElementsByClassName("versus-result")[0];
  const resultImageEl = <HTMLImageElement>document.getElementsByClassName("result-img")[0];
  
  versusWrapperEl.style.display = 'none';
  versusResultWrapperEl.style.display = 'block';
  resultImageEl.src = character.getImagePath();
}


// 오른쪽 이미지 선택
const rightImageClick = () => {
  round[roundCount].getRight().selected = true;
  roundCount++;
  
  selectImage();
};

// 현재 스테이지 표시
const nowBattle = (curRound: Stage) => {
  leftImage.src = curRound.getLeft() && curRound.getLeft().getImagePath();
  rightImage.src = curRound.getRight() && curRound.getRight().getImagePath();
  console.log(roundCount);
  console.log(round);
};

main();
