class Character {
  private readonly name: string;
  private readonly imagePath: string;
  private isSelected: boolean;

  constructor(name: string, imagePath: string) {
    this.name = name;
    this.imagePath = imagePath;
    this.isSelected = false;
  }

  getName(): string {
    return this.name;
  }

  getImagePath(): string {
    return this.imagePath;
  }

  getSelected(): boolean {
    return this.isSelected
  }

  set selected(isSelected: boolean) {
    this.isSelected = isSelected;
  }
}

export const CharacterList = [
  new Character('아구몬', 'public/characters/Agumon.png'),
  new Character('보노보노', 'public/characters/Bonobono.jpeg'),
  new Character('쵸파', 'public/characters/Chyopa.jpeg'),
  new Character('둘리', 'public/characters/Dooly.jpg'),
  new Character('도라에몽', 'public/characters/Doraemon.jpg'),
  new Character('토토로', 'public/characters/Totoro.jpeg'),
  new Character('에비츄', 'public/characters/Evichu.jpg'),
  new Character('미니언즈', 'public/characters/Minions.jpg'),
  new Character('핑구', 'public/characters/Pinggu.jpg'),
  new Character('피카츄', 'public/characters/Pikachu.png'),
  new Character('포로리', 'public/characters/Porori.jpg'),
  new Character('푸까', 'public/characters/Pucca.jpg'),
  new Character('오버액션토끼', 'public/characters/Overaction_Rabbit.jpg'),
  new Character('쿠테타마', 'public/characters/Kutetama.png'),
  new Character('소닉', 'public/characters/Sonic.jpeg'),
  new Character('스펀지밥', 'public/characters/Spongebob.png'),
  new Character('무민', 'public/characters/Moomin.jpeg'),
  new Character('스누피', 'public/characters/Snoopy.png'),
  new Character('주디', 'public/characters/Judy.jpeg'),
  new Character('닉', 'public/characters/Nick.jpeg'),
  new Character('올라프', 'public/characters/Olaf.jpeg'),
  new Character('스티치', 'public/characters/Stitch.jpeg'),
  new Character('미키 마우스', 'public/characters/Mickey_Mouse.png'),
  new Character('도날드 덕', 'public/characters/Donald_Duck.png'),
  new Character('곰돌이 푸', 'public/characters/Pooh.jpeg'),
  new Character('피글렛', 'public/characters/Piglet.jpg'),
  new Character('이요르', 'public/characters/Eeyore.png'),
  new Character('티거', 'public/characters/Tigger.jpg'),
  new Character('심바', 'public/characters/Simba.jpg'),
  new Character('티몬', 'public/characters/Timon.jpeg'),
  new Character('품바', 'public/characters/Pumba.jpg'),
  new Character('톰', 'public/characters/Tom.jpeg'),
];

export default Character;
