export const shuffleList = (list: any) => {
  let newArray = [...list];
  let temp;

  for (let i = newArray.length - 1; i >= 0; i -= 1) {
    const x = Math.floor(Math.random() * i);

    temp = newArray[i];
    newArray[i] = newArray[x];
    newArray[x] = temp;
  }

  return newArray;
};
