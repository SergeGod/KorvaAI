// app/api/capture-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    const sanitized = email.trim().toLowerCase()
    const origin =
      req.headers.get('origin') ||
      req.headers.get('referer') ||
      req.headers.get('host') ||
      'unknown'
    const dateTime = new Date().toUTCString()

    await resend.emails.send({
      from: 'KorvaAI Leads <onboarding@resend.dev>',
      to: 'serge1hagopian@gmail.com',
      subject: 'New Lead from KorvaAI',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 8px;">
          <h2 style="margin: 0 0 24px; color: #111827; font-size: 20px;">New Lead from KorvaAI</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Email</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${sanitized}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Date &amp; Time</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px;">${dateTime}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Source</td>
              <td style="padding: 10px 0; color: #111827; font-size: 14px;">${origin}</td>
            </tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[capture-email]', err)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
