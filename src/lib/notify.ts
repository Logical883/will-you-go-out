import { recipient } from '../config'

export function dateReplyMessage(when: string) {
  return `Yes 💕 I would love to go on a date with you.\n\nWhen: ${when}`
}

export async function sendReplyEmail(when: string, date: string, time: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${recipient.email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `She said yes — ${when}`,
      _captcha: 'false',
      name: recipient.name,
      date,
      time,
      when,
      message: dateReplyMessage(when),
    }),
  })

  if (!response.ok) {
    throw new Error('Could not send email')
  }
}
