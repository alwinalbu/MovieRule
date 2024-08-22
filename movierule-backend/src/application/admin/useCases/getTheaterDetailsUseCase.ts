import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const getTheaterDetailsUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { getTheaterById },
  } = dependencies;

  return {
    execute: async (theaterId: string) => {
      try {
        const deatails = await getTheaterById(theaterId);
        console.log(deatails, "after updating the theater in backend");
        return deatails;
      } catch (error: any) {
        console.error("Failed to handle block/unblock:", error);
        throw new Error("Failed to handle block/unblock");
      }
    },
  };
};
