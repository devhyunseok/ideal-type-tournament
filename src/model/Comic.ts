class Comic {
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

export const comicList = [
  new Comic('아구몬', 'public/images/Agumon.png'),
  new Comic('보노보노', 'public/images/Bonobono.jpeg'),
  new Comic('쵸파', 'public/images/Chyopa.jpeg'),
  new Comic('둘리', 'public/images/Dooly.jpg'),
  new Comic('도라에몽', 'public/images/Doraemon.jpg'),
  new Comic('에드워드 엘릭', 'public/images/Edward Ellick.jpeg'),
  new Comic('에비츄', 'public/images/Evichu.jpg'),
  new Comic('미니언즈', 'public/images/Minions.jpg'),
  new Comic('나루토', 'public/images/Naruto.jpeg'),
  new Comic('피카츄', 'public/images/Pikachu.png'),
  new Comic('포로리', 'public/images/Porori.jpg'),
  new Comic('푸까', 'public/images/Pucca.jpg'),
  new Comic('루피', 'public/images/Rupee.jpeg'),
  new Comic('사스케', 'public/images/Sasuke.png'),
  new Comic('소닉', 'public/images/Sonic.jpeg'),
  new Comic('스펀지밥', 'public/images/Spongebob.png')
];

export default Comic;
