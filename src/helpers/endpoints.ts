export const allEndpoints = (): {
  ownerPaths: string[];
  managerPaths: string[];
} => {
  const ownerPaths: string[] = ["/categories", "/branches/*/users"];
  const managerPaths: string[] = [];

  return {
    ownerPaths,
    managerPaths,
  };
};
