export const verifyToken = () => {
  const username = localStorage.getItem("username")?.toString();
  const password = localStorage.getItem("password")?.toString();
  const access_token = localStorage.getItem("access_token")?.toString();
  return username !== null && password !== null && access_token !== null;
};
