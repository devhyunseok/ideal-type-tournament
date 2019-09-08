import Character, { CharacterList } from './model/Character';
import { shuffleList } from "./utils/utils";
import Stage from "./model/Stage";

const btnGameStartEl = <HTMLButtonElement>document.getElementById("game-start");
const btnLeft = <HTMLButtonElement>document.getElementById("btn-left-img");
const btnRight = <HTMLButtonElement>document.getElementById("btn-right-img");
const btnBackEl = <HTMLButtonElement>document.getElementById("btn-back");
const btnRestartEl = <HTMLButtonElement>document.getElementsByClassName("btn-restart")[0];
const btnFirstEl = <HTMLButtonElement>document.getElementById("btn-first");

let roundCount = 0; // 현재 라운드
let history: Array<Stage[]> = [];
let round : Array<Stage> = [];

const initialize = () => {
  // 게임 시작 버튼
  btnGameStartEl.addEventListener('click', onGameStart);
};

/**
* 게임 시작
*/
const onGameStart = () => {
   // 게임 시작 버튼 리스너 제거
  btnGameStartEl.removeEventListener('click', onGameStart);
  // 왼쪽 선택 버튼 리스너 등록
  btnLeft.addEventListener('click', leftImageClick);
  // 오른쪽 선택 버튼 리스너 등록
  btnRight.addEventListener('click', rightImageClick);
  // 뒤로가기 리스너 등록
  btnBackEl.addEventListener('click', cancelClick);
  // 게임 재 시작 버튼 리스너 등록
  btnRestartEl.addEventListener('click', onGameRestart);
  // 처음으로 이동 버튼 리스너 등록
  btnFirstEl.addEventListener('click', onGameRestart);

  var selectEl = <HTMLSelectElement>document.getElementsByClassName("game-select-round")[0];
  var selectedRound = Number(selectEl.options[selectEl.selectedIndex].value);
  const shuffledList = shuffleList(CharacterList);
  const selectedList = shuffledList.filter((item: Character, index: number) => {
    if(index < selectedRound) {
        return item;
    }
  })

  initNewRound(selectedList);
  nowBattle(round[roundCount]);
  
  const gameStartPageEl = <HTMLDivElement>document.getElementById("game-start-page");
  gameStartPageEl.style.display = 'none';
  const gameBoardEl = <HTMLDivElement>document.getElementById("game-board");
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
  
  // 이전 히스토리 삭제
  const historyListEl = <HTMLUListElement>document.getElementById("history-list");
  while(historyListEl.firstChild) {
    historyListEl.removeChild(historyListEl.firstChild);
  }

  versusWrapperEl.style.display = 'block';
  versusResultWrapperEl.style.display = 'none';
  
  const gameStartPageEl = <HTMLDivElement>document.getElementById("game-start-page");
  gameStartPageEl.style.display = 'flex';
  const gameBoardEl = <HTMLDivElement>document.getElementById("game-board");
  gameBoardEl.style.display = 'none';

  // 게임 시작 버튼 리스너 등록
  btnGameStartEl.addEventListener('click', onGameStart);
  // 왼쪽 선택 버튼 리스너 제거
  btnLeft.removeEventListener('click', leftImageClick);
  // 오른쪽 선택 버튼 리스너 제거
  btnRight.removeEventListener('click', rightImageClick);
  // 뒤로가기 리스너 제거
  btnBackEl.removeEventListener('click', cancelClick);
  // 게임 재 시작 버튼 리스너 제거
  btnRestartEl.removeEventListener('click', onGameRestart);
  // 처음으로 이동 버튼 리스너 제거
  btnFirstEl.removeEventListener('click', onGameRestart);
}

/**
* 취소 버튼
*/
const cancelClick = () => {
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

    round = prevRound && prevRound.length > 0 ? prevRound : [];
    roundCount = round.length - 1;
    
    // 이전 선택 사항 취소.
    round[roundCount].getLeft().selected = false;
    round[roundCount].getRight().selected = false;
    
    // 현재 라운드 재 표기
    showCurrentRound(`${round.length * 2}강`);
    
    // 이전 히스토리 삭제.
    const historyListEl = <HTMLUListElement>document.getElementById("history-list");
    if(historyListEl.firstChild) {
      historyListEl.removeChild(historyListEl.firstChild);
    }
   
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
    round.push(new Stage(shuffledList[i], shuffledList[i+1]))
  }
  
  showCurrentRound(`${round.length * 2}강`);
  
  // li 추가
  addHistoryItemView(shuffledList);
};

// 화면에 현재 라운드 표시
const showCurrentRound = (text: string) => {
  const curRoundEl = <HTMLSpanElement>document.getElementById("current-round");
  curRoundEl.textContent = text;
}

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
  
  const historyListEl = <HTMLUListElement>document.getElementById("history-list");
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

/**
 * 뒤로가기 버튼 사용 가능 여부 체크
 */
const checkUsableBackButton = () => {
  if(roundCount < 1 && history.length < 1) {
    btnBackEl.disabled = true;
  }else {
    btnBackEl.disabled = false;
  }
}

/**
* 이미지 선택
*/
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
  showCurrentRound('최종');
  btnBackEl.disabled = true;

  const versusWrapperEl = <HTMLDivElement>document.getElementsByClassName("versus")[0];
  const versusResultWrapperEl = <HTMLDivElement>document.getElementsByClassName("versus-result")[0];
  const resultImageEl = <HTMLImageElement>document.getElementsByClassName("result-img")[0];
  
  versusWrapperEl.style.display = 'none';
  versusResultWrapperEl.style.display = 'block';
  resultImageEl.src = character.getImagePath();
}

/**
* 오른쪽 이미지 선택
*/ 
const rightImageClick = () => {
  round[roundCount].getRight().selected = true;
  roundCount++;
  
  selectImage();
};

/**
* 현재 스테이지 표시
* @param nowStage 
*/
const nowBattle = (nowStage: Stage) => {
  checkUsableBackButton();

  const leftImage = <HTMLImageElement>document.getElementById("left-img");
  const rightImage = <HTMLImageElement>document.getElementById("right-img");

  leftImage.src = nowStage.getLeft() && nowStage.getLeft().getImagePath();
  rightImage.src = nowStage.getRight() && nowStage.getRight().getImagePath();
};

initialize();
