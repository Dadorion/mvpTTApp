export default function leadersReduce({ matches }) {
  const players = matches.reduce((acc, match) => {
    const updatePlayer = (id, name, points) => {
      if (acc[id]) {
        acc[id] = {
          ...acc[id],
          points: acc[id].points + points,
        };
      } else {
        acc[id] = { id, name, points };
      }
    };

    updatePlayer(
      match.fp_id,
      `${match.fp_name} ${match.fp_surname}`,
      match.fp_score,
    );
    updatePlayer(
      match.sp_id,
      `${match.sp_name} ${match.sp_surname}`,
      match.sp_score,
    );

    return acc;
  }, {});

  const sortedPlayers = Object.values(players).sort(
    (a, b) => b.points - a.points,
  );

  let currentRank = 1;
  const rankedPlayers = sortedPlayers.map((player, index) => {
    if (index > 0 && player.points === sortedPlayers[index - 1].points) {
      return { ...player, position: currentRank };
    }

    currentRank = index + 1;
    return { ...player, position: currentRank };
  });

  return rankedPlayers;
}
