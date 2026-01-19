export async function registerService(email, password, name) {
  const VITE_API_URL =
    import.meta.env.API_URL || 'http://localhost:3004/login-page/register'

  try {
    const response = await fetch(VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
