export const validateUser = async (google_uid: string) => {
  try {
    const response = await fetch(
      'https://validateuser-tc4c2viizq-uc.a.run.app/',
      {
        method: 'POST',
        body: JSON.stringify({ google_uid: google_uid }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { userExists } = await response.json();
    return userExists;
  } catch (error: any) {
    throw error;
  }
};
