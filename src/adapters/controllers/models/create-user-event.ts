/**
Header
Content-Type: application/json

{
  firstName: "Firstname",
  lastName: "Lastname",
  email: "fulano@gmail.com",
  password: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8", //SHA1
  description: "Description"
}
*/

export interface CreateUserEvent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
}
