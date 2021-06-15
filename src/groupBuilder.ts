import { Group, GroupStage, ThirdPlaceTable, Standing } from './types';
import fetch from 'node-fetch';
import * as fs from 'fs';

export const getGroupApi = async (id: number): Promise<Group> => {
  const apiToken = process.env.API_TOKEN;
  const url = `https://soccer.sportmonks.com/api/v2.0/standings/season/live/15733?api_token=${apiToken}&group_id=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
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

const getQualiTable = (): Record<string, number> => {
  const buf = fs.readFileSync('./public/qualiRank.json');
  return JSON.parse(buf.toString());
};

export const get3rdPlaceTable = async (): Promise<ThirdPlaceTable> => {
  const gs = await getGS();
  const thirdPlacers = build3rdPlaceTable(gs);
  return thirdPlacers.sort(standingSort);
};

const standingSort = (first: Standing, second: Standing): number => {
  const pointsDiff = second.points - first.points;
  if (pointsDiff != 0) {
    return pointsDiff;
  }
  
  const goalDiff = second.goal_diff - first.goal_diff;
  if (goalDiff != 0) {
    return goalDiff;
  }

  const scoredDiff = goalsScored(second) - goalsScored(first);
  if (scoredDiff != 0) {
    return scoredDiff;
  }

  const winsDiff = second.wins - first.wins;
  if (winsDiff != 0) {
    return winsDiff;
  }

  const fairDiff = first.fairplay_points_lose - second.fairplay_points_lose;
  if (fairDiff != 0) {
    return fairDiff;
  }

  const qualiTable = getQualiTable();
  const fstCode = first.short_code;
  const sndCode = second.short_code;

  const qualiDiff = qualiTable[fstCode] - qualiTable[sndCode];
  return qualiDiff;
};
