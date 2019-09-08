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
  new Character('스펀지밥', 'public/characters/Spongebob.png')
];

export default Character;
