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

  const rankedPlayers = sortedPlayers.map((player, index) => ({
    ...player,
    position: index + 1,
  }));

  return rankedPlayers;
}
