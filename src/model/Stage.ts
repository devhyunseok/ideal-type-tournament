import Character from "./Character";

class Stage {
  private readonly left: Character;
  private readonly right: Character;

  constructor(left: Character, right: Character) {
    this.left = left;
    this.right = right;
  }

  getLeft(): Character {
    return this.left;
  }

  getRight(): Character {
    return this.right;
  }
}

export default Stage;
