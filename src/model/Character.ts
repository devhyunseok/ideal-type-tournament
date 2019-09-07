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
  new Character('아구몬', 'public/images/Agumon.png'),
  new Character('보노보노', 'public/images/Bonobono.jpeg'),
  new Character('쵸파', 'public/images/Chyopa.jpeg'),
  new Character('둘리', 'public/images/Dooly.jpg'),
  new Character('도라에몽', 'public/images/Doraemon.jpg'),
  new Character('토토로', 'public/images/Totoro.jpeg'),
  new Character('에비츄', 'public/images/Evichu.jpg'),
  new Character('미니언즈', 'public/images/Minions.jpg'),
  new Character('핑구', 'public/images/Pinggu.jpg'),
  new Character('피카츄', 'public/images/Pikachu.png'),
  new Character('포로리', 'public/images/Porori.jpg'),
  new Character('푸까', 'public/images/Pucca.jpg'),
  new Character('오버액션토끼', 'public/images/Overaction_Rabbit.jpg'),
  new Character('쿠테타마', 'public/images/Kutetama.png'),
  new Character('소닉', 'public/images/Sonic.jpeg'),
  new Character('스펀지밥', 'public/images/Spongebob.png')
];

export default Character;
