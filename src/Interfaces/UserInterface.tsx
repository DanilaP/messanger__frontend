export interface IUser {
    _id?: string,
    name?: string,
    email?: string,
    password?: string,
    avatar?: string,
    friends?: string,
    friendRequests?: {id: string, name: string, status: string, avatar: string}[],
    posts?: {id: number, image: string, text: string}[] | undefined,
}
export interface IStore {
    user: IUser
}
export interface IDialog {
    _id: string,
    avatar: string,
    name: string,
}