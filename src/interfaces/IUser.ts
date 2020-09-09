interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;
