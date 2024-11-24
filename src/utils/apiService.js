import fetch from 'node-fetch';

export async function registerUserInAPI(userData) {
  try {
    const response = await fetch(process.env.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al registrar usuario en API:', error);
    throw error;
  }
}