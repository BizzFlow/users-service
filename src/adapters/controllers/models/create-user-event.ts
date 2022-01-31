/**
Header
Content-Type: application/json

{
  name: "Name Surname",
  description: "Description"
}
*/

export interface CreateUserEvent {
  name: string;
  description?: string;
}
