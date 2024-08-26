// src/lib/tokenService.ts

export const setToken = (token: string) => {
  const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString();
  document.cookie = `token=${token};expires=${expirationDate};path=/`;
};

export const getToken = (): string | null => {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const deleteToken = () => {
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
};
