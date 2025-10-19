
export const waitForCookies = async () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const delay = isMobile ? 800 : 300;
  await new Promise((resolve) => setTimeout(resolve, delay));
};
