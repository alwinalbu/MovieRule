import { IAdminDependencies } from "../interfaces/IAdminDependencies";

export const adminHandleBlockUnblockUserUseCase = (dependencies: IAdminDependencies) => {
  const {
    repositories: { updateUserStatus },
  } = dependencies;

  return {
    execute: async (id: string, status: string) => {
      try {
        const updatedUser = await updateUserStatus(id, status);
        console.log(updatedUser,"after updating the user in backend");
        
        return updatedUser;
      } catch (error:any) {
        console.error("Failed to handle block/unblock:", error);
        throw new Error("Failed to handle block/unblock");
      }
    },
  };
};
