import { fetch } from "./csrf";

export const authenticate = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return user;
  }

  return { error: "You are not authenticated" };
};

export const login = async (email, password) => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const user = res.data;

  if (!user.errors) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    return user.errors;
  }

  return user;
};

export const logout = async () => {
  const res = await fetch("/api/users/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const loggedOut = res.data;
  localStorage.clear();

  if (loggedOut.message === "success") {
    return true;
  } else {
    console.error("Trouble logging out");
  }
};

export const signUp = async (firstName, lastName, email, password) => {
  const res = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email,
      password,
    }),
  });
  return await res.data;
};
