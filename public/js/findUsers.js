const registeredUsers =
  JSON.parse(localStorage.getItem("registeredUsers")) || [];

export function getUser(email, password) {
  return registeredUsers.find(
    (user) => user.email === email && user.password === password
  );
}
