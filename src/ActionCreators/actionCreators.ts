import { IUser } from "../Interfaces/UserInterface";

export const userCreator = (payload: IUser | undefined) => {
    return {
        type: "USER",
        payload: payload,
    };
}