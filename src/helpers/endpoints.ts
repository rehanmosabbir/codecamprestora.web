export const allEndpoints = (): { ownerPaths: string[]; managerPaths: string[] } => {
    const ownerPaths: string[] = ["/branches", "/categories"];
    const managerPaths: string[] = ["/branches", "/branches/*", "/categories"];

    return {
      ownerPaths,
      managerPaths,
    };
  };