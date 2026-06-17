export const stageInfo = {
  round: "group-stage",
  matchday: "Matchday 1",
  knockout: "before-round-of-32",
  asOf: "2026-06-17",
  startDate: "2026.06.11",
  endDate: "07.19"
};

export const groupTeams = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Haiti", "Scotland", "Brazil", "Morocco"],
  D: ["United States", "Paraguay", "Australia", "Turkiye"],
  E: ["Ivory Coast", "Ecuador", "Germany", "Curacao"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Iran", "New Zealand", "Belgium", "Egypt"],
  H: ["Saudi Arabia", "Uruguay", "Spain", "Cabo Verde"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["Ghana", "Panama", "England", "Croatia"]
};

export const matches = [
  match("A-1", "A", 1, "2026-06-11", "20:00", "Mexico City Stadium", "Mexico", "South Africa", [2, 0], "done", ["18' Mexico goal", "61' Mexico goal", "73' South Africa yellow card"]),
  match("A-2", "A", 1, "2026-06-11", "23:00", "Estadio Guadalajara", "South Korea", "Czechia", [2, 1], "done", ["12' South Korea goal", "47' Czechia goal", "84' South Korea goal"]),
  match("B-1", "B", 1, "2026-06-12", "01:00", "Toronto Stadium", "Canada", "Bosnia and Herzegovina", [1, 1], "done", ["Canada goal", "Bosnia and Herzegovina goal"]),
  match("D-1", "D", 1, "2026-06-12", "07:00", "Los Angeles Stadium", "United States", "Paraguay", [4, 1], "done", ["9' United States goal", "28' United States goal", "52' Paraguay goal", "69' United States goal", "88' United States goal"]),
  match("C-1", "C", 1, "2026-06-13", "04:00", "Boston Stadium", "Haiti", "Scotland", [0, 1], "done", ["Scotland goal"]),
  match("D-2", "D", 1, "2026-06-13", "07:00", "BC Place Vancouver", "Australia", "Turkiye", [2, 0], "done", ["Australia goal", "Australia goal"]),
  match("C-2", "C", 1, "2026-06-13", "10:00", "New York New Jersey Stadium", "Brazil", "Morocco", [1, 1], "done", ["Brazil goal", "Morocco goal"]),
  match("B-2", "B", 1, "2026-06-13", "13:00", "San Francisco Bay Area Stadium", "Qatar", "Switzerland", [1, 1], "done", ["Qatar goal", "Switzerland goal"]),
  match("E-1", "E", 1, "2026-06-14", "01:00", "Philadelphia Stadium", "Ivory Coast", "Ecuador", [1, 0], "done", ["Ivory Coast goal"]),
  match("E-2", "E", 1, "2026-06-14", "04:00", "Houston Stadium", "Germany", "Curacao", [7, 1], "done", ["Germany goal", "Germany goal", "Curacao goal", "Germany goal", "Germany goal", "Germany goal", "Germany goal", "Germany goal"]),
  match("F-1", "F", 1, "2026-06-14", "07:00", "Dallas Stadium", "Netherlands", "Japan", [2, 2], "done", ["Netherlands goal", "Japan goal", "Netherlands goal", "Japan goal"]),
  match("F-2", "F", 1, "2026-06-14", "10:00", "Estadio Monterrey", "Sweden", "Tunisia", [5, 1], "done", ["Sweden goal", "Sweden goal", "Tunisia goal", "Sweden goal", "Sweden goal", "Sweden goal"]),
  match("H-1", "H", 1, "2026-06-15", "01:00", "Miami Stadium", "Saudi Arabia", "Uruguay", [1, 1], "done", ["Saudi Arabia goal", "Uruguay goal"]),
  match("H-2", "H", 1, "2026-06-15", "04:00", "Atlanta Stadium", "Spain", "Cabo Verde", [0, 0], "done", ["No goals"]),
  match("G-1", "G", 1, "2026-06-15", "07:00", "Los Angeles Stadium", "Iran", "New Zealand", [2, 2], "done", ["Iran goal", "New Zealand goal", "Iran goal", "New Zealand goal"]),
  match("G-2", "G", 1, "2026-06-15", "10:00", "Seattle Stadium", "Belgium", "Egypt", [1, 1], "done", ["Belgium goal", "Egypt goal"]),
  match("I-1", "I", 1, "2026-06-16", "01:00", "New York New Jersey Stadium", "France", "Senegal", [3, 1], "done", ["France goal", "France goal", "Senegal goal", "France goal"]),
  match("I-2", "I", 1, "2026-06-16", "04:00", "Boston Stadium", "Iraq", "Norway", [1, 4], "done", ["Norway goal", "Norway goal", "Iraq goal", "Norway goal", "Norway goal"]),
  match("J-1", "J", 1, "2026-06-16", "07:00", "Kansas City Stadium", "Argentina", "Algeria", [3, 0], "done", ["21' Argentina goal", "55' Argentina goal", "79' Argentina goal"]),
  match("J-2", "J", 1, "2026-06-16", "10:00", "San Francisco Bay Area Stadium", "Austria", "Jordan", null, "checking", ["Official final record pending"]),
  match("L-1", "L", 1, "2026-06-17", "01:00", "Toronto Stadium", "Ghana", "Panama", null, "scheduled", ["Kickoff pending"]),
  match("L-2", "L", 1, "2026-06-17", "04:00", "Dallas Stadium", "England", "Croatia", null, "scheduled", ["Kickoff pending"]),
  match("K-1", "K", 1, "2026-06-17", "07:00", "Houston Stadium", "Portugal", "DR Congo", null, "scheduled", ["Kickoff pending"]),
  match("K-2", "K", 1, "2026-06-17", "10:00", "Mexico City Stadium", "Uzbekistan", "Colombia", null, "scheduled", ["Kickoff pending"]),
  match("A-3", "A", 2, "2026-06-18", "TBD", "Atlanta Stadium", "Czechia", "South Africa", null, "scheduled", ["Matchday 2"]),
  match("B-3", "B", 2, "2026-06-18", "TBD", "Los Angeles Stadium", "Switzerland", "Bosnia and Herzegovina", null, "scheduled", ["Matchday 2"]),
  match("B-4", "B", 2, "2026-06-18", "TBD", "BC Place Vancouver", "Canada", "Qatar", null, "scheduled", ["Matchday 2"]),
  match("A-4", "A", 2, "2026-06-18", "TBD", "Mexico City Stadium", "Mexico", "South Korea", null, "scheduled", ["Matchday 2"]),
  match("C-3", "C", 2, "2026-06-19", "TBD", "TBD", "Haiti", "Brazil", null, "scheduled", ["Matchday 2"]),
  match("C-4", "C", 2, "2026-06-19", "TBD", "TBD", "Morocco", "Scotland", null, "scheduled", ["Matchday 2"]),
  match("D-3", "D", 2, "2026-06-19", "TBD", "TBD", "United States", "Australia", null, "scheduled", ["Matchday 2"]),
  match("D-4", "D", 2, "2026-06-19", "TBD", "TBD", "Turkiye", "Paraguay", null, "scheduled", ["Matchday 2"]),
  match("E-3", "E", 2, "2026-06-20", "TBD", "TBD", "Ivory Coast", "Germany", null, "scheduled", ["Matchday 2"]),
  match("E-4", "E", 2, "2026-06-20", "TBD", "TBD", "Curacao", "Ecuador", null, "scheduled", ["Matchday 2"]),
  match("F-3", "F", 2, "2026-06-20", "TBD", "TBD", "Netherlands", "Sweden", null, "scheduled", ["Matchday 2"]),
  match("F-4", "F", 2, "2026-06-20", "TBD", "TBD", "Tunisia", "Japan", null, "scheduled", ["Matchday 2"]),
  match("G-3", "G", 2, "2026-06-21", "TBD", "TBD", "Iran", "Belgium", null, "scheduled", ["Matchday 2"]),
  match("G-4", "G", 2, "2026-06-21", "TBD", "TBD", "Egypt", "New Zealand", null, "scheduled", ["Matchday 2"]),
  match("H-3", "H", 2, "2026-06-21", "TBD", "TBD", "Saudi Arabia", "Spain", null, "scheduled", ["Matchday 2"]),
  match("H-4", "H", 2, "2026-06-21", "TBD", "TBD", "Cabo Verde", "Uruguay", null, "scheduled", ["Matchday 2"]),
  match("I-3", "I", 2, "2026-06-22", "TBD", "TBD", "France", "Iraq", null, "scheduled", ["Matchday 2"]),
  match("I-4", "I", 2, "2026-06-22", "TBD", "TBD", "Norway", "Senegal", null, "scheduled", ["Matchday 2"]),
  match("J-3", "J", 2, "2026-06-22", "TBD", "TBD", "Argentina", "Austria", null, "scheduled", ["Matchday 2"]),
  match("J-4", "J", 2, "2026-06-22", "TBD", "TBD", "Jordan", "Algeria", null, "scheduled", ["Matchday 2"]),
  match("K-3", "K", 2, "2026-06-23", "TBD", "TBD", "Portugal", "Uzbekistan", null, "scheduled", ["Matchday 2"]),
  match("K-4", "K", 2, "2026-06-23", "TBD", "TBD", "Colombia", "DR Congo", null, "scheduled", ["Matchday 2"]),
  match("L-3", "L", 2, "2026-06-23", "TBD", "TBD", "Ghana", "England", null, "scheduled", ["Matchday 2"]),
  match("L-4", "L", 2, "2026-06-23", "TBD", "TBD", "Croatia", "Panama", null, "scheduled", ["Matchday 2"])
];

export const groups = buildStandingsMap();

export const squads = [
  squad("Mexico", "A", "Javier Aguirre", [["G. Ochoa", "GK", 0, 0, 0, 3], ["E. Alvarez", "MF", 0, 0, 1, 0], ["S. Gimenez", "FW", 1, 0, 0, 0], ["H. Lozano", "FW", 1, 1, 0, 0], ["J. Sanchez", "DF", 0, 0, 0, 0]]),
  squad("South Korea", "A", "Hong Myung-bo", [["Son Heung-min", "FW", 1, 0, 0, 0], ["Lee Kang-in", "MF", 0, 1, 0, 0], ["Kim Min-jae", "DF", 0, 0, 1, 0], ["Jo Hyeon-woo", "GK", 0, 0, 0, 3]]),
  squad("United States", "D", "Mauricio Pochettino", [["Christian Pulisic", "FW", 1, 1, 0, 0], ["Folarin Balogun", "FW", 1, 0, 0, 0], ["Weston McKennie", "MF", 0, 1, 1, 0], ["Matt Turner", "GK", 0, 0, 0, 2]]),
  squad("Argentina", "J", "Lionel Scaloni", [["Lionel Messi", "FW", 3, 0, 0, 0], ["Lautaro Martinez", "FW", 0, 1, 0, 0], ["Enzo Fernandez", "MF", 0, 1, 0, 0], ["Emiliano Martinez", "GK", 0, 0, 0, 4]]),
  squad("Germany", "E", "Julian Nagelsmann", [["Jamal Musiala", "MF", 2, 1, 0, 0], ["Florian Wirtz", "MF", 1, 2, 0, 0], ["Kai Havertz", "FW", 1, 0, 0, 0], ["Manuel Neuer", "GK", 0, 0, 0, 2]])
];

export const cities = [
  ["Vancouver", "CAN"], ["Toronto", "CAN"], ["Boston", "USA"], ["New York/New Jersey", "USA"],
  ["Philadelphia", "USA"], ["Miami", "USA"], ["Atlanta", "USA"], ["Dallas", "USA"],
  ["Houston", "USA"], ["Kansas City", "USA"], ["Los Angeles", "USA"], ["San Francisco", "USA"],
  ["Seattle", "USA"], ["Monterrey", "MEX"], ["Mexico City", "MEX"], ["Guadalajara", "MEX"]
];

function match(id, group, matchday, date, time, stadium, home, away, score, status, events) {
  return { id, group, matchday, date, time, stadium, home, away, score, status, events };
}

function squad(team, group, coach, players) {
  return { team, group, coach, players };
}

export function buildStandingsMap() {
  return Object.fromEntries(Object.keys(groupTeams).map((group) => [group, buildStandings(group)]));
}

export function buildStandings(group) {
  const table = Object.fromEntries(groupTeams[group].map((team) => [team, {
    team,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    gf: 0,
    ga: 0,
    points: 0
  }]));

  matches
    .filter((item) => item.group === group && item.score)
    .forEach((item) => {
      const home = table[item.home];
      const away = table[item.away];
      const [homeGoals, awayGoals] = item.score;

      home.played += 1;
      away.played += 1;
      home.gf += homeGoals;
      home.ga += awayGoals;
      away.gf += awayGoals;
      away.ga += homeGoals;

      if (homeGoals > awayGoals) {
        home.wins += 1;
        away.losses += 1;
        home.points += 3;
      } else if (homeGoals < awayGoals) {
        away.wins += 1;
        home.losses += 1;
        away.points += 3;
      } else {
        home.draws += 1;
        away.draws += 1;
        home.points += 1;
        away.points += 1;
      }
    });

  return Object.values(table)
    .sort((a, b) => b.points - a.points || goalDiff(b) - goalDiff(a) || b.gf - a.gf || a.team.localeCompare(b.team))
    .map((row) => [row.team, row.wins, row.draws, row.losses, row.gf, row.ga, row.points]);
}

export function goalDiff(row) {
  if (Array.isArray(row)) {
    return row[4] - row[5];
  }
  return row.gf - row.ga;
}

export function probability(row) {
  const played = row[1] + row[2] + row[3];
  const remaining = Math.max(0, 3 - played);
  const base = row[6] * 18 + goalDiff(row) * 5 + row[4] * 2 + remaining * 9;
  return Math.max(8, Math.min(92, Math.round(28 + base)));
}

export function completedMatches() {
  return matches.filter((item) => item.score);
}

export function upcomingMatches() {
  return matches.filter((item) => !item.score);
}

export function allPlayers() {
  return squads.flatMap((team) => team.players.map((player) => ({
    name: player[0],
    team: team.team,
    position: player[1],
    goals: player[2],
    assists: player[3],
    yellows: player[4],
    saves: player[5],
    reds: 0
  })));
}
