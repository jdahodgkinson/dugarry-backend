import { Group, GroupStage, ThirdPlaceTable, Standing } from './types';
import fetch from 'node-fetch';
import * as fs from 'fs';

/* const getGroup = (id: number): Group => { */
/*   const path = `./test/test_data/${id}.json`; */
/*   const buf = fs.readFileSync(path); */
/*   const res = JSON.parse(buf.toString()); */
/*   return res['data']; */
/* }; */

export const getGroupApi = async (id: number): Promise<Group> => {
  const apiToken = process.env.API_TOKEN;
  // TODO: Change this to live standings.
  const url = `https://soccer.sportmonks.com/api/v2.0/standings/season/15733?api_token=${apiToken}&group_id=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const groups = data['data'];
  const desiredGroup = groups.filter((group: Record<string, unknown>) => group.id == id).pop();
  return desiredGroup.standings.data;
};

const getGS = async (): Promise<GroupStage> => {
  const gs = {
    a: await getGroupApi(225400),
    b: await getGroupApi(225401),
    c: await getGroupApi(225402),
    d: await getGroupApi(225403),
    e: await getGroupApi(225404),
    f: await getGroupApi(225405),
  };
  return gs;
};

const get3rdPlace = (group: Group): Standing => {
  const thirdPlacers = group.filter(standing => standing.position == 3);
  if (thirdPlacers.length != 1) {
    throw 'Numerous third place finishers in group.';
  }
  return thirdPlacers[0];
};

const build3rdPlaceTable = (gs: GroupStage): ThirdPlaceTable => {
  return [
    get3rdPlace(gs['a']),
    get3rdPlace(gs['b']),
    get3rdPlace(gs['c']),
    get3rdPlace(gs['d']),
    get3rdPlace(gs['e']),
    get3rdPlace(gs['f'])
  ];
};

const goalsScored = (s: Standing): number => {
  return parseInt(s.goals[0]);
};

const qualiTable = (): Record<string, number> => {
  const buf = fs.readFileSync('./qualifier_ranking.json');
  return JSON.parse(buf.toString());
};

export const get3rdPlaceTable = async (): Promise<ThirdPlaceTable> => {
  const gs = await getGS();
  const thirdPlacers = build3rdPlaceTable(gs);
  return thirdPlacers.sort(standingSort);
};

const standingSort = (first: Standing, second: Standing): number => {
  const points_diff = first.points - second.points;
  if (points_diff != 0) {
    return points_diff;
  }
  
  const goal_diff = first.goal_diff - second.goal_diff;
  if (goal_diff != 0) {
    return goal_diff;
  }

  const scored_diff = goalsScored(first) - goalsScored(second);
  if (scored_diff != 0) {
    return scored_diff;
  }

  const wins_diff = first.wins - second.wins;
  if (wins_diff != 0) {
    return wins_diff;
  }

  const fair_diff = first.fairplay_points_lose - second.fairplay_points_lose;
  if (fair_diff != 0) {
    return fair_diff;
  }

  const quali_table = qualiTable();
  const fst_code = first.short_code;
  const snd_code = second.short_code;

  const quali_diff = quali_table[fst_code] - quali_table[snd_code];
  return quali_diff;
};
