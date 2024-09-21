class AppConfig {
  // Backend urls:
  public readonly dataUrl = 'http://localhost:4000/api/____/';

  // Axios options:
  public readonly axiosOptions = {
    headers: {
      // Tell axios to also send the image:
      // We're sending also files.
      'Content-Type': 'multipart/form-data',
    },
  };
}

export const appConfig = new AppConfig();
