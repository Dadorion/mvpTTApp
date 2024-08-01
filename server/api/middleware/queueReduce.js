export default function makeQueue({ playersAnswer, matchesAnswer }) {
  const queue = matchesAnswer.reduce((acc, match) => {
    const pair = {
      id: match.id,
      playersPair: [
        {
          f_player: match.f_player_id,
          name: playersAnswer.find((player) => player.id === match.f_player_id)
            .p_name,
          surname: playersAnswer.find(
            (player) => player.id === match.f_player_id,
          ).p_surname,
        },
        {
          s_player: match.s_player_id,
          name: playersAnswer.find((player) => player.id === match.s_player_id)
            .p_name,
          surname: playersAnswer.find(
            (player) => player.id === match.s_player_id,
          ).p_surname,
        },
      ],
    };

    acc.push(pair);
    return acc;
  }, []);
  return queue;
}
