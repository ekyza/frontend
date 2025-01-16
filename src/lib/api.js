export async function signUp({ name, email, number, password }) {
  const URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        number,
        password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      return data;
    }

    const error = await response.json();

    throw new Error(error.message || "Failed to sign up");
  } catch (error) {
    throw new Error(error);
  }
}

export async function signIn({ email, password }) {
  const URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      return data;
    }

    const error = await response.json();

    throw new Error(error.message || "Failed to sign in");
  } catch (error) {
    throw new Error(error.message);
  }
}
