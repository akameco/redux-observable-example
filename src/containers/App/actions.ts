export const increment = () => ({ type: "increment" } as const);
export const decrement = () => ({ type: "decrement" } as const);
export const incrementAsync = (delay: number) =>
  ({ type: "incrementAsync", delay } as const);
