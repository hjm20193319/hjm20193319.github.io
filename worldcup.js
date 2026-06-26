(function () {
  "use strict";

  const KOREA_ID = "KOR";
  const DIRECT_GROUP = "A";
  const BEST_THIRD_SLOTS = 8;
  const REQUIRED_SUCCESS_COUNT = 4;

  const teams = {
    MEX: { id: "MEX", name: "멕시코" },
    RSA: { id: "RSA", name: "남아공" },
    KOR: { id: "KOR", name: "대한민국" },
    CZE: { id: "CZE", name: "체코" },
    CAN: { id: "CAN", name: "캐나다" },
    QAT: { id: "QAT", name: "카타르" },
    SUI: { id: "SUI", name: "스위스" },
    BIH: { id: "BIH", name: "보스니아 헤르체고비나" },
    BRA: { id: "BRA", name: "브라질" },
    MAR: { id: "MAR", name: "모로코" },
    HAI: { id: "HAI", name: "아이티" },
    SCO: { id: "SCO", name: "스코틀랜드" },
    USA: { id: "USA", name: "미국" },
    PAR: { id: "PAR", name: "파라과이" },
    AUS: { id: "AUS", name: "호주" },
    TUR: { id: "TUR", name: "튀르키예" },
    GER: { id: "GER", name: "독일" },
    CIV: { id: "CIV", name: "코트디부아르" },
    ECU: { id: "ECU", name: "에콰도르" },
    CUR: { id: "CUR", name: "퀴라소" },
    NED: { id: "NED", name: "네덜란드" },
    JPN: { id: "JPN", name: "일본" },
    SWE: { id: "SWE", name: "스웨덴" },
    TUN: { id: "TUN", name: "튀니지" },
    BEL: { id: "BEL", name: "벨기에" },
    EGY: { id: "EGY", name: "이집트" },
    IRN: { id: "IRN", name: "이란" },
    NZL: { id: "NZL", name: "뉴질랜드" },
    ESP: { id: "ESP", name: "스페인" },
    CPV: { id: "CPV", name: "카보베르데" },
    URU: { id: "URU", name: "우루과이" },
    KSA: { id: "KSA", name: "사우디아라비아" },
    FRA: { id: "FRA", name: "프랑스" },
    SEN: { id: "SEN", name: "세네갈" },
    IRQ: { id: "IRQ", name: "이라크" },
    NOR: { id: "NOR", name: "노르웨이" },
    ARG: { id: "ARG", name: "아르헨티나" },
    ALG: { id: "ALG", name: "알제리" },
    AUT: { id: "AUT", name: "오스트리아" },
    JOR: { id: "JOR", name: "요르단" },
    POR: { id: "POR", name: "포르투갈" },
    COD: { id: "COD", name: "콩고민주공화국" },
    UZB: { id: "UZB", name: "우즈베키스탄" },
    COL: { id: "COL", name: "콜롬비아" },
    ENG: { id: "ENG", name: "잉글랜드" },
    CRO: { id: "CRO", name: "크로아티아" },
    GHA: { id: "GHA", name: "가나" },
    PAN: { id: "PAN", name: "파나마" },
  };

  const sampleData = {
    teams,
    groups: {
      A: ["MEX", "RSA", "KOR", "CZE"],
      B: ["CAN", "QAT", "SUI", "BIH"],
      C: ["BRA", "MAR", "HAI", "SCO"],
      D: ["USA", "PAR", "AUS", "TUR"],
      E: ["GER", "CIV", "ECU", "CUR"],
      F: ["NED", "JPN", "SWE", "TUN"],
      G: ["BEL", "EGY", "IRN", "NZL"],
      H: ["ESP", "CPV", "URU", "KSA"],
      I: ["FRA", "SEN", "IRQ", "NOR"],
      J: ["ARG", "ALG", "AUT", "JOR"],
      K: ["POR", "COD", "UZB", "COL"],
      L: ["ENG", "CRO", "GHA", "PAN"],
    },
    matches: [
      { id: "A1", group: "A", homeTeam: "MEX", awayTeam: "RSA", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-11 20:00" },
      { id: "A2", group: "A", homeTeam: "KOR", awayTeam: "CZE", homeScore: 2, awayScore: 1, status: "finished", startTime: "2026-06-12 17:00" },
      { id: "A3", group: "A", homeTeam: "MEX", awayTeam: "KOR", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-18 22:00" },
      { id: "A4", group: "A", homeTeam: "CZE", awayTeam: "RSA", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-18 19:00" },
      { id: "A5", group: "A", homeTeam: "CZE", awayTeam: "MEX", homeScore: 0, awayScore: 3, status: "finished", startTime: "2026-06-24 16:00" },
      { id: "A6", group: "A", homeTeam: "RSA", awayTeam: "KOR", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-24 16:00" },

      { id: "B1", group: "B", homeTeam: "CAN", awayTeam: "QAT", homeScore: 3, awayScore: 0, status: "finished", startTime: "2026-06-12 17:00" },
      { id: "B2", group: "B", homeTeam: "SUI", awayTeam: "BIH", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-13 12:00" },
      { id: "B3", group: "B", homeTeam: "SUI", awayTeam: "QAT", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-18 16:00" },
      { id: "B4", group: "B", homeTeam: "CAN", awayTeam: "BIH", homeScore: 3, awayScore: 1, status: "finished", startTime: "2026-06-18 19:00" },
      { id: "B5", group: "B", homeTeam: "BIH", awayTeam: "QAT", homeScore: 3, awayScore: 2, status: "finished", startTime: "2026-06-24 15:00" },
      { id: "B6", group: "B", homeTeam: "CAN", awayTeam: "SUI", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-24 15:00" },

      { id: "C1", group: "C", homeTeam: "HAI", awayTeam: "SCO", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-13 13:00" },
      { id: "C2", group: "C", homeTeam: "BRA", awayTeam: "MAR", homeScore: 3, awayScore: 0, status: "finished", startTime: "2026-06-13 18:00" },
      { id: "C3", group: "C", homeTeam: "BRA", awayTeam: "HAI", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-19 15:00" },
      { id: "C4", group: "C", homeTeam: "SCO", awayTeam: "MAR", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-19 18:00" },
      { id: "C5", group: "C", homeTeam: "SCO", awayTeam: "BRA", homeScore: 0, awayScore: 3, status: "finished", startTime: "2026-06-24 18:00" },
      { id: "C6", group: "C", homeTeam: "MAR", awayTeam: "HAI", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-24 18:00" },

      { id: "D1", group: "D", homeTeam: "USA", awayTeam: "PAR", homeScore: 3, awayScore: 0, status: "finished", startTime: "2026-06-12 18:00" },
      { id: "D2", group: "D", homeTeam: "AUS", awayTeam: "TUR", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-13 15:00" },
      { id: "D3", group: "D", homeTeam: "USA", awayTeam: "AUS", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-19 18:00" },
      { id: "D4", group: "D", homeTeam: "TUR", awayTeam: "PAR", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-19 13:00" },
      { id: "D5", group: "D", homeTeam: "TUR", awayTeam: "USA", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-25 15:00" },
      { id: "group-d", group: "D", homeTeam: "AUS", awayTeam: "PAR", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-25 15:00" },

      { id: "E1", group: "E", homeTeam: "CIV", awayTeam: "ECU", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-14 15:00" },
      { id: "E2", group: "E", homeTeam: "GER", awayTeam: "CUR", homeScore: 7, awayScore: 1, status: "finished", startTime: "2026-06-14 18:00" },
      { id: "E3", group: "E", homeTeam: "GER", awayTeam: "CIV", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-20 15:00" },
      { id: "group-e", group: "E", homeTeam: "ECU", awayTeam: "CUR", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-20 18:00" },
      { id: "E5", group: "E", homeTeam: "CUR", awayTeam: "CIV", homeScore: 0, awayScore: 2, status: "finished", startTime: "2026-06-25 16:00" },
      { id: "E6", group: "E", homeTeam: "ECU", awayTeam: "GER", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-25 16:00" },

      { id: "F1", group: "F", homeTeam: "NED", awayTeam: "JPN", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-14 12:00" },
      { id: "F2", group: "F", homeTeam: "SWE", awayTeam: "TUN", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-14 15:00" },
      { id: "F3", group: "F", homeTeam: "NED", awayTeam: "SWE", homeScore: 2, awayScore: 1, status: "finished", startTime: "2026-06-20 13:00" },
      { id: "F4", group: "F", homeTeam: "TUN", awayTeam: "JPN", homeScore: 0, awayScore: 3, status: "finished", startTime: "2026-06-20 18:00" },
      { id: "group-f", group: "F", homeTeam: "JPN", awayTeam: "SWE", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-25 17:00" },
      { id: "F6", group: "F", homeTeam: "TUN", awayTeam: "NED", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-25 17:00" },

      { id: "G1", group: "G", homeTeam: "BEL", awayTeam: "EGY", homeScore: 1, awayScore: 2, status: "finished", startTime: "2026-06-15 13:00" },
      { id: "G2", group: "G", homeTeam: "IRN", awayTeam: "NZL", homeScore: 3, awayScore: 0, status: "finished", startTime: "2026-06-15 16:00" },
      { id: "G3", group: "G", homeTeam: "BEL", awayTeam: "IRN", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-21 13:00" },
      { id: "G4", group: "G", homeTeam: "NZL", awayTeam: "EGY", homeScore: 0, awayScore: 2, status: "finished", startTime: "2026-06-21 16:00" },
      { id: "group-g", group: "G", homeTeam: "EGY", awayTeam: "IRN", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-26 13:00" },
      { id: "G6", group: "G", homeTeam: "NZL", awayTeam: "BEL", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-26 13:00" },

      { id: "H1", group: "H", homeTeam: "KSA", awayTeam: "URU", homeScore: 0, awayScore: 2, status: "finished", startTime: "2026-06-15 15:00" },
      { id: "H2", group: "H", homeTeam: "ESP", awayTeam: "CPV", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-15 18:00" },
      { id: "H3", group: "H", homeTeam: "URU", awayTeam: "CPV", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-21 15:00" },
      { id: "H4", group: "H", homeTeam: "ESP", awayTeam: "KSA", homeScore: 3, awayScore: 0, status: "finished", startTime: "2026-06-21 18:00" },
      { id: "H5", group: "H", homeTeam: "CPV", awayTeam: "KSA", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-26 16:00" },
      { id: "group-h", group: "H", homeTeam: "ESP", awayTeam: "URU", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-26 16:00" },

      { id: "I1", group: "I", homeTeam: "FRA", awayTeam: "SEN", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-16 13:00" },
      { id: "I2", group: "I", homeTeam: "IRQ", awayTeam: "NOR", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-16 16:00" },
      { id: "I3", group: "I", homeTeam: "FRA", awayTeam: "IRQ", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-22 13:00" },
      { id: "I4", group: "I", homeTeam: "NOR", awayTeam: "SEN", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-22 16:00" },
      { id: "I5", group: "I", homeTeam: "NOR", awayTeam: "FRA", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-26 13:00" },
      { id: "group-i", group: "I", homeTeam: "SEN", awayTeam: "IRQ", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-26 13:00" },

      { id: "J1", group: "J", homeTeam: "ARG", awayTeam: "ALG", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-16 18:00" },
      { id: "J2", group: "J", homeTeam: "AUT", awayTeam: "JOR", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-16 15:00" },
      { id: "J3", group: "J", homeTeam: "ARG", awayTeam: "AUT", homeScore: 2, awayScore: 1, status: "finished", startTime: "2026-06-22 18:00" },
      { id: "J4", group: "J", homeTeam: "JOR", awayTeam: "ALG", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-22 15:00" },
      { id: "group-j", group: "J", homeTeam: "AUT", awayTeam: "ALG", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-27 15:00" },
      { id: "J6", group: "J", homeTeam: "JOR", awayTeam: "ARG", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-27 15:00" },

      { id: "K1", group: "K", homeTeam: "POR", awayTeam: "COD", homeScore: 2, awayScore: 0, status: "finished", startTime: "2026-06-17 13:00" },
      { id: "K2", group: "K", homeTeam: "UZB", awayTeam: "COL", homeScore: 0, awayScore: 1, status: "finished", startTime: "2026-06-17 16:00" },
      { id: "K3", group: "K", homeTeam: "POR", awayTeam: "UZB", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-23 13:00" },
      { id: "K4", group: "K", homeTeam: "COL", awayTeam: "COD", homeScore: 2, awayScore: 1, status: "finished", startTime: "2026-06-23 16:00" },
      { id: "K5", group: "K", homeTeam: "COL", awayTeam: "POR", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-27 16:00" },
      { id: "group-k", group: "K", homeTeam: "UZB", awayTeam: "COD", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-27 16:00" },

      { id: "L1", group: "L", homeTeam: "GHA", awayTeam: "PAN", homeScore: 1, awayScore: 0, status: "finished", startTime: "2026-06-17 13:00" },
      { id: "L2", group: "L", homeTeam: "ENG", awayTeam: "CRO", homeScore: 4, awayScore: 1, status: "finished", startTime: "2026-06-17 16:00" },
      { id: "L3", group: "L", homeTeam: "ENG", awayTeam: "GHA", homeScore: 1, awayScore: 1, status: "finished", startTime: "2026-06-23 13:00" },
      { id: "L4", group: "L", homeTeam: "PAN", awayTeam: "CRO", homeScore: 0, awayScore: 2, status: "finished", startTime: "2026-06-23 16:00" },
      { id: "L5", group: "L", homeTeam: "PAN", awayTeam: "ENG", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-27 17:00" },
      { id: "group-l", group: "L", homeTeam: "GHA", awayTeam: "CRO", homeScore: 0, awayScore: 0, status: "scheduled", startTime: "2026-06-27 17:00" },
    ],
  };

  function cloneData(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function sanitizeScore(value) {
    if (value === "" || value === null || value === undefined) {
      return 0;
    }
    const score = Number.parseInt(value, 10);
    if (Number.isNaN(score) || score < 0) {
      return 0;
    }
    return score;
  }

  function isCountedMatch(match) {
    return match.status === "finished" || match.status === "live" || match.status === "completed" || match.status === "in_progress";
  }

  function emptyStanding(teamId, teamMap) {
    return {
      teamId,
      name: teamMap[teamId] ? teamMap[teamId].name : teamId,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  }

  function compareStandings(a, b) {
    return b.points - a.points
      || b.goalDifference - a.goalDifference
      || b.goalsFor - a.goalsFor
      || a.name.localeCompare(b.name, "ko");
  }

  function calculateStandings(matches, group, teamMap = teams) {
    const groupMatches = matches.filter((match) => match.group === group);
    const table = new Map();

    groupMatches.forEach((match) => {
      if (!table.has(match.homeTeam)) {
        table.set(match.homeTeam, emptyStanding(match.homeTeam, teamMap));
      }
      if (!table.has(match.awayTeam)) {
        table.set(match.awayTeam, emptyStanding(match.awayTeam, teamMap));
      }
      if (!isCountedMatch(match)) {
        return;
      }

      const home = table.get(match.homeTeam);
      const away = table.get(match.awayTeam);
      const homeScore = sanitizeScore(match.homeScore);
      const awayScore = sanitizeScore(match.awayScore);

      home.played += 1;
      away.played += 1;
      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;
      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;

      if (homeScore > awayScore) {
        home.wins += 1;
        away.losses += 1;
        home.points += 3;
      } else if (homeScore < awayScore) {
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

    return Array.from(table.values())
      .map((row) => ({
        ...row,
        goalDifference: row.goalsFor - row.goalsAgainst,
      }))
      .sort(compareStandings);
  }

  function getAllStandings(data) {
    return Object.keys(data.groups).reduce((acc, group) => {
      acc[group] = calculateStandings(data.matches, group, data.teams);
      return acc;
    }, {});
  }

  function getThirdPlaceRanking(data) {
    return Object.entries(getAllStandings(data))
      .map(([group, standings]) => ({ group, ...standings[2] }))
      .filter((row) => row.teamId)
      .sort(compareStandings)
      .map((row, index) => ({ ...row, thirdRank: index + 1 }));
  }

  function updateMatchScore(data, matchId, homeScore, awayScore) {
    const match = data.matches.find((item) => item.id === matchId);
    if (!match) {
      return null;
    }
    match.homeScore = sanitizeScore(homeScore);
    match.awayScore = sanitizeScore(awayScore);
    if (match.status === "scheduled") {
      match.status = "finished";
    }
    return match;
  }

  function updateMatchStatus(data, matchId, status) {
    const match = data.matches.find((item) => item.id === matchId);
    if (!match) {
      return null;
    }
    match.status = status;
    return match;
  }

  function countRemaining(matches, predicate) {
    return matches.filter((match) => match.status === "scheduled" && predicate(match)).length;
  }

  const scenarioDefinitions = [
    {
      id: "group-d",
      group: "D",
      match: "호주 vs 파라과이",
      condition: "호주 승리 또는 파라과이 2골 차 이상 승리",
      evaluate(homeScore, awayScore) {
        const australiaWin = homeScore > awayScore;
        const paraguayWinByTwo = awayScore - homeScore >= 2;
        return australiaWin || paraguayWinByTwo;
      },
    },
    {
      id: "group-e",
      group: "E",
      match: "에콰도르 vs 퀴라소",
      condition: "이미 조건 불충족으로 확정된 시나리오",
      evaluate() {
        return false;
      },
    },
    {
      id: "group-f",
      group: "F",
      match: "일본 vs 스웨덴",
      condition: "일본이 2골 차 이상 승리",
      evaluate(homeScore, awayScore) {
        return homeScore - awayScore >= 2;
      },
    },
    {
      id: "group-c-third",
      group: "C",
      match: "스코틀랜드 3위 비교",
      condition: "C조 3위 스코틀랜드가 대한민국보다 3위 순위에서 아래",
      evaluateContext(context) {
        const koreaThird = context.thirdRanking.find((row) => row.teamId === KOREA_ID);
        const scotlandThird = context.thirdRanking.find((row) => row.teamId === "SCO");
        return Boolean(koreaThird && scotlandThird && koreaThird.thirdRank < scotlandThird.thirdRank);
      },
      detail(context) {
        const koreaThird = context.thirdRanking.find((row) => row.teamId === KOREA_ID);
        const scotlandThird = context.thirdRanking.find((row) => row.teamId === "SCO");
        if (!koreaThird || !scotlandThird) {
          return "대한민국 또는 스코틀랜드가 조 3위가 아닙니다.";
        }
        return `대한민국 3위 비교 ${koreaThird.thirdRank}위, 스코틀랜드 ${scotlandThird.thirdRank}위`;
      },
    },
    {
      id: "group-g",
      group: "G",
      match: "이집트 vs 이란",
      condition: "이집트 승리",
      evaluate(homeScore, awayScore) {
        return homeScore > awayScore;
      },
    },
    {
      id: "group-h",
      group: "H",
      match: "스페인 vs 우루과이",
      condition: "스페인 승리",
      evaluate(homeScore, awayScore) {
        return homeScore > awayScore;
      },
    },
    {
      id: "group-i",
      group: "I",
      match: "세네갈 vs 이라크",
      condition: "무승부 또는 세네갈 1골 차 승리",
      evaluate(homeScore, awayScore) {
        const draw = homeScore === awayScore;
        const senegalWinByOne = homeScore - awayScore === 1;
        return draw || senegalWinByOne;
      },
    },
    {
      id: "group-j",
      group: "J",
      match: "오스트리아 vs 알제리",
      condition: "오스트리아 승리 또는 알제리 2골 차 이상 승리",
      evaluate(homeScore, awayScore) {
        const austriaWin = homeScore > awayScore;
        const algeriaWinByTwo = awayScore - homeScore >= 2;
        return austriaWin || algeriaWinByTwo;
      },
    },
    {
      id: "group-k",
      group: "K",
      match: "우즈베키스탄 vs 콩고민주공화국",
      condition: "콩고민주공화국이 승리하지 않음",
      evaluate(homeScore, awayScore) {
        return homeScore >= awayScore;
      },
    },
    {
      id: "group-l",
      group: "L",
      match: "가나 vs 크로아티아",
      condition: "가나 승리",
      evaluate(homeScore, awayScore) {
        return homeScore > awayScore;
      },
    },
  ];

  function evaluateScenario(scenario, data, context) {
    if (scenario.evaluateContext) {
      const success = scenario.evaluateContext(context);
      return {
        id: scenario.id,
        group: scenario.group,
        title: `${scenario.group}조 ${scenario.match}`,
        match: scenario.match,
        condition: scenario.condition,
        status: success ? "met" : "failed",
        symbol: success ? "○" : "×",
        detail: scenario.detail ? scenario.detail(context) : "",
      };
    }

    const match = data.matches.find((item) => item.id === scenario.id);
    if (!match || match.status === "scheduled") {
      return {
        id: scenario.id,
        group: scenario.group,
        title: `${scenario.group}조 ${scenario.match}`,
        match: scenario.match,
        condition: scenario.condition,
        status: "scheduled",
        symbol: "–",
        detail: "아직 경기 결과가 확정되지 않았습니다.",
      };
    }
    if (match.status === "failed") {
      return {
        id: scenario.id,
        group: scenario.group,
        title: `${scenario.group}조 ${scenario.match}`,
        match: scenario.match,
        condition: scenario.condition,
        status: "failed",
        symbol: "×",
        detail: "이미 조건 실패로 확정된 경우의 수입니다.",
      };
    }

    const success = scenario.evaluate(sanitizeScore(match.homeScore), sanitizeScore(match.awayScore));
    return {
      id: scenario.id,
      group: scenario.group,
      title: `${scenario.group}조 ${scenario.match}`,
      match: scenario.match,
      condition: scenario.condition,
      status: success ? "met" : match.status === "live" ? "progress" : "failed",
      symbol: success ? "○" : "×",
      detail: `${getTeamName(match.homeTeam, data)} ${sanitizeScore(match.homeScore)} : ${sanitizeScore(match.awayScore)} ${getTeamName(match.awayTeam, data)}`,
    };
  }

  function calculateProbability(context) {
    const scenarioRatio = context.metScenarioCount / REQUIRED_SUCCESS_COUNT;
    const qualified = context.metScenarioCount >= REQUIRED_SUCCESS_COUNT;
    const noRemaining = context.pendingScenarioCount === 0;

    if (qualified && noRemaining) {
      return 100;
    }
    if (!qualified && noRemaining) {
      return 0;
    }

    let probability = 18;
    probability += context.korea.points * 8;
    probability += Math.max(-8, context.korea.goalDifference * 5);
    probability += context.koreaRank === 1 ? 28 : context.koreaRank === 2 ? 22 : context.koreaRank === 3 ? 10 : -8;
    probability += context.remainingKoreaMatches * 4;
    probability += scenarioRatio * 42;

    if (context.koreaThirdRank) {
      probability += Math.max(-16, (BEST_THIRD_SLOTS + 1 - context.koreaThirdRank) * 3);
    }

    return Math.max(3, Math.min(98, Math.round(probability)));
  }

  function evaluateQualification(data) {
    const standings = calculateStandings(data.matches, DIRECT_GROUP, data.teams);
    const korea = standings.find((row) => row.teamId === KOREA_ID) || emptyStanding(KOREA_ID, data.teams);
    const koreaRank = standings.findIndex((row) => row.teamId === KOREA_ID) + 1;
    const thirdRanking = getThirdPlaceRanking(data);
    const koreaThird = thirdRanking.find((row) => row.teamId === KOREA_ID);
    const remainingKoreaMatches = countRemaining(data.matches, (match) => match.homeTeam === KOREA_ID || match.awayTeam === KOREA_ID);
    const remainingGroupMatches = countRemaining(data.matches, (match) => match.group === DIRECT_GROUP);
    const remainingExternalMatches = countRemaining(data.matches, (match) => match.group !== DIRECT_GROUP);
    const context = {
      data,
      standings,
      korea,
      koreaRank,
      thirdRanking,
      koreaThirdRank: koreaThird ? koreaThird.thirdRank : null,
      remainingKoreaMatches,
      remainingGroupMatches,
      remainingExternalMatches,
      scenarios: [],
      metScenarioCount: 0,
      pendingScenarioCount: 0,
    };
    const scenarios = scenarioDefinitions.map((scenario) => evaluateScenario(scenario, data, context));
    const metRequired = scenarios.filter((scenario) => scenario.status === "met").length;
    const pendingScenarios = scenarios.filter((scenario) => scenario.status === "scheduled" || scenario.status === "progress").length;
    context.scenarios = scenarios;
    context.metScenarioCount = metRequired;
    context.pendingScenarioCount = pendingScenarios;
    const qualified = metRequired >= REQUIRED_SUCCESS_COUNT;
    const eliminated = !qualified && pendingScenarios === 0;

    return {
      status: qualified ? "qualified" : eliminated ? "eliminated" : "live",
      statusLabel: qualified ? "조건 충족" : eliminated ? "조건 실패" : "진행 중",
      summary: qualified
        ? `현재 입력값 기준 필요한 ${REQUIRED_SUCCESS_COUNT}개 조건을 충족했습니다.`
        : eliminated
          ? `현재 입력값 기준 필요한 ${REQUIRED_SUCCESS_COUNT}개 조건을 충족하지 못했습니다.`
          : `현재 ${metRequired}개 충족, ${REQUIRED_SUCCESS_COUNT}개가 필요합니다.`,
      probability: calculateProbability(context),
      standings,
      thirdRanking,
      scenarios,
      conditions: {
        met: metRequired,
        required: REQUIRED_SUCCESS_COUNT,
        total: scenarios.length,
      },
      korea,
      koreaRank,
    };
  }

  const statusLabels = {
    finished: "종료",
    live: "진행 중",
    scheduled: "예정",
    failed: "조건 실패",
  };

  const stateLabels = {
    met: "조건 충족",
    failed: "실패",
    progress: "진행 중",
    scheduled: "예정",
  };

  function getTeamName(teamId, data) {
    return data.teams[teamId] ? data.teams[teamId].name : teamId;
  }

  function formatGoalDifference(value) {
    return value > 0 ? `+${value}` : `${value}`;
  }

  function makeTeamCell(row) {
    return `<span class="team-name"><span class="team-code ${row.teamId === KOREA_ID ? "korea-code" : ""}">${row.teamId}</span>${row.name}</span>`;
  }

  function bootDashboard() {
    const root = document.querySelector("#worldcup-dashboard");
    if (!root) {
      return;
    }

    let data = cloneData(sampleData);
    const matchGrid = document.querySelector("#match-grid");

    function pulse() {
      root.classList.remove("updating");
      window.requestAnimationFrame(() => {
        root.classList.add("updating");
        window.setTimeout(() => root.classList.remove("updating"), 360);
      });
    }

    function renderStatus(result) {
      document.querySelector("#qualification-state").textContent = result.statusLabel;
      document.querySelector("#qualification-summary").textContent = result.summary;
      document.querySelector("#probability-value").textContent = `${result.probability}%`;
      document.querySelector("#probability-bar").style.width = `${result.probability}%`;
      document.querySelector("#condition-counter").textContent = `${result.conditions.met} / ${result.conditions.required}`;
      document.querySelector("#korea-rank").textContent = `${result.koreaRank}위`;
      document.querySelector("#korea-points").textContent = `${result.korea.points}`;
      document.querySelector("#korea-gd").textContent = formatGoalDifference(result.korea.goalDifference);
    }

    function renderGroupStandings(result) {
      document.querySelector("#group-standings").innerHTML = result.standings.map((row, index) => `
        <tr class="${row.teamId === KOREA_ID ? "korea-row" : ""}">
          <td>${index + 1}</td>
          <td>${makeTeamCell(row)}</td>
          <td>${row.played}</td>
          <td>${row.wins}</td>
          <td>${row.draws}</td>
          <td>${row.losses}</td>
          <td>${row.goalsFor}</td>
          <td>${row.goalsAgainst}</td>
          <td>${formatGoalDifference(row.goalDifference)}</td>
          <td>${row.points}</td>
        </tr>
      `).join("");
    }

    function renderThirdStandings(result) {
      document.querySelector("#third-standings").innerHTML = result.thirdRanking.map((row) => `
        <tr class="${row.teamId === KOREA_ID ? "korea-row" : ""}">
          <td>${row.thirdRank}</td>
          <td>${row.group}</td>
          <td>${makeTeamCell(row)}</td>
          <td>${row.points}</td>
          <td>${formatGoalDifference(row.goalDifference)}</td>
        </tr>
      `).join("");
    }

    function renderScenarios(result) {
      document.querySelector("#scenario-grid").innerHTML = result.scenarios.map((scenario) => `
        <article class="scenario-card state-${scenario.status}">
          <div class="scenario-topline">
            <span class="result-mark state-${scenario.status}" aria-hidden="true">${scenario.symbol}</span>
            <span class="state-pill state-${scenario.status}">${stateLabels[scenario.status]}</span>
          </div>
          <h3>${scenario.title}</h3>
          <p class="condition-text">${scenario.condition}</p>
          <p>${scenario.detail}</p>
        </article>
      `).join("");
    }

    function renderMatches() {
      matchGrid.innerHTML = Object.keys(data.groups).map((group) => {
        const matches = data.matches.filter((match) => match.group === group);
        return `
          <section class="group-card" aria-label="${group}조 경기">
            <div class="group-title"><span>Group ${group}</span><span>${matches.length} matches</span></div>
            ${matches.map((match) => `
              <div class="match-row" data-match-id="${match.id}">
                <strong>${getTeamName(match.homeTeam, data)}</strong>
                <input class="score-input" type="number" min="0" step="1" inputmode="numeric" data-side="home" value="${sanitizeScore(match.homeScore)}" aria-label="${getTeamName(match.homeTeam, data)} 득점">
                <span class="versus">:</span>
                <input class="score-input" type="number" min="0" step="1" inputmode="numeric" data-side="away" value="${sanitizeScore(match.awayScore)}" aria-label="${getTeamName(match.awayTeam, data)} 득점">
                <strong>${getTeamName(match.awayTeam, data)}</strong>
                <div class="match-meta">
                  <select class="status-select" aria-label="${match.id} 경기 상태">
                    ${Object.entries(statusLabels).map(([value, label]) => `<option value="${value}" ${match.status === value ? "selected" : ""}>${label}</option>`).join("")}
                  </select>
                  <span class="start-time">${match.startTime}</span>
                </div>
              </div>
            `).join("")}
          </section>
        `;
      }).join("");
    }

    function renderOutputs(shouldPulse) {
      const result = evaluateQualification(data);
      renderStatus(result);
      renderGroupStandings(result);
      renderThirdStandings(result);
      renderScenarios(result);
      if (shouldPulse) {
        pulse();
      }
    }

    matchGrid.addEventListener("input", (event) => {
      if (!event.target.matches(".score-input")) {
        return;
      }
      const row = event.target.closest(".match-row");
      const homeInput = row.querySelector('[data-side="home"]');
      const awayInput = row.querySelector('[data-side="away"]');
      homeInput.value = sanitizeScore(homeInput.value);
      awayInput.value = sanitizeScore(awayInput.value);
      updateMatchScore(data, row.dataset.matchId, homeInput.value, awayInput.value);
      const select = row.querySelector(".status-select");
      select.value = data.matches.find((match) => match.id === row.dataset.matchId).status;
      renderOutputs(true);
    });

    matchGrid.addEventListener("change", (event) => {
      if (!event.target.matches(".status-select")) {
        return;
      }
      const row = event.target.closest(".match-row");
      updateMatchStatus(data, row.dataset.matchId, event.target.value);
      renderOutputs(true);
    });

    document.querySelector("#reset-sample").addEventListener("click", () => {
      data = cloneData(sampleData);
      renderMatches();
      renderOutputs(true);
    });

    renderMatches();
    renderOutputs(false);
  }

  window.WorldCupCalculator = {
    sampleData,
    sanitizeScore,
    calculateStandings,
    getThirdPlaceRanking,
    evaluateQualification,
    updateMatchScore,
    updateMatchStatus,
  };

  document.addEventListener("DOMContentLoaded", bootDashboard);
}());
