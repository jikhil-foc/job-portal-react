export const getDataFromLocalStorage = (key: string): any => {
  return localStorage.getItem(key);
};

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export const setDataToLocalStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const isAuthenticated = (): boolean => {
  const user = JSON.parse(getDataFromLocalStorage("user"));

  return user != null;
};

export const isAuthorized = (role: UserRole): boolean => {
  const user = JSON.parse(getDataFromLocalStorage("user"));

  return user.role === role;
};

export const IsAdmin = (): boolean => {
  const user = JSON.parse(getDataFromLocalStorage("user"));

  return user.role === UserRole.ADMIN;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};
