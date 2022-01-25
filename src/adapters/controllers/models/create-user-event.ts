/**
{
  userId: "ABC-123",
  name: "Name Surname",
  description: "Description"
}
*/

export interface CreateUserEvent {
  userId: number;
  name: string;
  description?: string;
}
