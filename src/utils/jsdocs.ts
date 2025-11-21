export const expandJsdocs = (jsdocs: string): string => {
  const lines = jsdocs.split("\n");
  const result = lines.length === 1
    ? lines[0]
    : `\n${lines.map(x => `* ${x}`)
      .join("\n")}\n`;

  return `/**${result}*/\n`;
};
