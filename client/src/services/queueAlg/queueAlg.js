export default function makeQueue(players) {
  let queue = [];
  let outputList = [];
  let flag = 0;
  let id = 0;

  for (let n = 0; n < players.length; n++) {
    for (let i = flag; i < players.length; i++) {
      // сам с собой не играет
      if (players[n].id !== players[i].id) {
        const pair = {id, playersPair: [{ ...players[n] }, { ...players[i] }]};
        queue.push(pair);
        id++
      }
    }
    // не повторяется
    flag++;
  }

  for (let i = 0; i < queue.length / 2; i++) {
    const el1 = queue.slice(i, i + 1);
    const el2 = queue.slice(queue.length - i - 1, queue.length - i);

    outputList.push(el1[0]);
    if (i !== Math.floor(queue.length / 2)) {
      outputList.push(el2[0]);
    }
  }

  return outputList;
}
