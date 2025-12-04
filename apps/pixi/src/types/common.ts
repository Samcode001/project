export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | undefined;

export interface IPosition {
  x: number;
  y: number;
}

export interface IAvatar {
  id: string;
  x: number;
  y: number;
  direction: Direction;
  avatar: string;
}
