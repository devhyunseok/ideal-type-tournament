import Comic from "./Comic";

class Stage {
  private readonly left: Comic;
  private readonly right: Comic;

  constructor(left: Comic, right: Comic) {
    this.left = left;
    this.right = right;
  }

  getLeft(): Comic {
    return this.left;
  }

  getRight(): Comic {
    return this.right;
  }
}

export default Stage;
