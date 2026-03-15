const FORMSPREE_URL = 'https://formspree.io/f/mvzwbdqr'

export interface FormspreeResult {
  ok: boolean
  errorMessage?: string
}

export async function submitToFormspree(
  data: Record<string, string>
): Promise<FormspreeResult> {
  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      return { ok: true }
    }
    return {
      ok: false,
      errorMessage: 'Something went wrong. Please email us at hello@korva.es',
    }
  } catch {
    return {
      ok: false,
      errorMessage: 'Something went wrong. Please email us at hello@korva.es',
    }
  }
}
