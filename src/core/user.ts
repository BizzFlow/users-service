export default interface User {
  userId: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    description?: string;
  };
  active: boolean;
  createdAt: string;
}
