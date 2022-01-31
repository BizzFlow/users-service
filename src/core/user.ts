export default interface User {
  userId: string;
  name: string;
  description?: string;
  active: boolean;
  createdAt: string;
}
