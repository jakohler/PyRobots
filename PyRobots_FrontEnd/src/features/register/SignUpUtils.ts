export const isValidEmail = (email: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

export const isValidPassword = (password: string) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^+&*-.;:",?]{8,16}$/.test(
    password
  );
};
export const isValidUserName = (username: string) => {
  return /^[0-9a-zA-Z!@#$%^_+&*.-;:",?]{6,12}$/.test(username);
};

export const isMatchingPassword = (passwords: {
  password: string;
  confirmPassword: string;
}) => {
  return passwords.password === passwords.confirmPassword;
};
