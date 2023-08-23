export type Card = {
  title: string,
  completed: boolean,
};

export type Group = {
  name: string,
  cards: Card[],
};

export type Board = {
  name: string,
  groups: Group[],
};
