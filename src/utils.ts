export function isNumeric (input: any) : boolean {
  return (typeof input === 'number') || (!isNaN(parseFloat(input)) && isFinite(input));
}

export type numberlike = number;

export const strToNum = (str: string) : numberlike => {
  return parseInt(str);
};
