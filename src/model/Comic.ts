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
  new Comic('아구몬', 'dist/images/Agumon.png'),
  new Comic('보노보노', 'dist/images/Bonobono.jpeg'),
  new Comic('쵸파', 'dist/images/Chyopa.jpg'),
  new Comic('둘리', 'dist/images/Dooly.jpg'),
  new Comic('도라에몽', 'dist/images/Doraemon.jpg'),
  new Comic('에드워드 엘릭', 'dist/images/Edward Ellick.jpeg'),
  new Comic('에비츄', 'dist/images/Evichu.jpg'),
  new Comic('미니언즈', 'dist/images/Minions.jpg'),
  new Comic('나루토', 'dist/images/Naruto.jpeg'),
  new Comic('피카츄', 'dist/images/Pikachu.png'),
  new Comic('포로리', 'dist/images/Porori.jpg'),
  new Comic('푸까', 'dist/images/Pucca.jpg'),
  new Comic('루피', 'dist/images/Rupee.jpeg'),
  new Comic('사스케', 'dist/images/Sasuke.png'),
  new Comic('소닉', 'dist/images/Sonic.jpeg'),
  new Comic('스펀지밥', 'dist/images/Spongebob.png')
];

export default Comic;
