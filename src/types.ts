export type UserToCreateDTO = {
    name: string,
    email: string,
    password: string,
}

export type UserDTO = {
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
}

export type UpdateUserDTO = {
    id: string,
    name: string,
    email: string,
}