export type Standing = {
  position: number,
  played: number,
  team_id: number,
  team_name: string,
  short_code: string,
  team_logo: string,
  goals: string,
  goal_diff: number,
  wins: number,
  lost: number,
  draws: number,
  points: number,
  description: string,
  recent_form: string,
  fairplay_points_lose: number
}

export type Group = [Standing, Standing, Standing, Standing];

export type ThirdPlacers = [Standing, Standing, Standing, Standing, Standing, Standing];

export type GroupStage = {
    a: Group,
    b: Group,
    c: Group,
    d: Group,
    e: Group,
    f: Group
};
