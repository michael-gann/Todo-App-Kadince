export const authenticate = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return user;
  }

  return { error: "You are not authenticated" };
};

export const login = async (email, password) => {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const user = await response.json();

  if (!user.errors) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    return user.errors;
  }

  return user;
};

// export const logout = async () => {
//   const response = await fetch("/api/auth/logout", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();
//   if (data.message === "User logged out") {
//     localStorage.removeItem("user");
//   }
// };

// export const signUp = async (firstName, lastName, email, password) => {
//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       first_name: firstName,
//       last_name: lastName,
//       email,
//       password,
//     }),
//   });
//   return await response.json();
// };
