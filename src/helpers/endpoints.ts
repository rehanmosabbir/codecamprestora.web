export const allEndpoints = (): {
  ownerPaths: string[];
  managerPaths: string[];
} => {
  const ownerPaths: string[] = ["/categories", "/branches/*/users"];
  const managerPaths: string[] = ["/branches", "/branches/*", "/categories"];

  return {
    ownerPaths,
    managerPaths,
  };
};
