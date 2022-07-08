import { Schema, model } from "mongoose";

interface IUser {
 username: string;
 password: string;
 role: string;
}

const userSchema = new Schema<IUser>({
 username: String,
 password: String,
 role: String // tạo role để phân quyền
})

const UserModel = model<IUser>('User', userSchema);

export { UserModel };