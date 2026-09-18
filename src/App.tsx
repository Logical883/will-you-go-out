import { useMemo, useState, type FormEvent } from 'react'
import { HeartField } from './components/HeartField'
import { RunawayButton } from './components/RunawayButton'
import { sendReplyEmail } from './lib/notify'

type Step = 'ask' | 'confirm' | 'schedule' | 'done'

const yesClass =
  'yes-glow min-h-12 w-full rounded-full bg-rose-500 px-8 py-3.5 text-base font-extrabold text-white transition hover:bg-rose-600 active:scale-[0.98] sm:w-auto sm:min-w-36 sm:text-lg'

const choiceRow = 'mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center'

function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function formatDateTime(date: string, time: string) {
  const parsed = new Date(`${date}T${time}`)
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(parsed)
}

export default function App() {
  const [step, setStep] = useState<Step>('ask')
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState('18:30')
  const minDate = useMemo(() => todayISO(), [])
  const when = formatDateTime(date, time)

  const onSchedule = (event: FormEvent) => {
    event.preventDefault()
    if (!date || !time) return
    void sendReplyEmail(when, date, time).catch(() => {})
    setStep('done')
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-3 py-6 sm:px-6 sm:py-10 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <HeartField />

      <main className="card-enter relative z-10 w-full max-w-xl rounded-[28px] border border-rose-200 bg-white/95 px-5 py-8 text-center shadow-[0_24px_80px_rgba(190,18,60,0.18)] backdrop-blur-xl sm:rounded-[32px] sm:px-12 sm:py-12">
        <p className="font-script text-[clamp(1.75rem,8vw,3rem)] leading-none text-rose-500">
          for you, my love
        </p>

        {step === 'ask' && (
          <section className="mt-4">
            <h1 className="font-display text-[clamp(1.65rem,7vw,3rem)] leading-tight text-rose-950 italic">
              Will you go on a date with me?
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-rose-700 sm:mt-4 sm:text-base">
              I made this little place just for you. One answer is easy. The other one gets a little dramatic.
            </p>
            <div className={choiceRow}>
              <button type="button" className={yesClass} onClick={() => setStep('confirm')}>
                Yes
              </button>
              <RunawayButton>No</RunawayButton>
            </div>
          </section>
        )}

        {step === 'confirm' && (
          <section className="mt-4">
            <h1 className="font-display text-[clamp(1.55rem,6.5vw,2.4rem)] leading-tight text-rose-950 italic">
              Are you really saying yes?
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-rose-700 sm:mt-4 sm:text-base">
              I need to hear it once more, just so my heart can believe it.
            </p>
            <div className={choiceRow}>
              <button type="button" className={yesClass} onClick={() => setStep('schedule')}>
                Yes, I mean it
              </button>
              <RunawayButton>Not sure</RunawayButton>
            </div>
          </section>
        )}

        {step === 'schedule' && (
          <section className="mt-4">
            <h1 className="font-display text-[clamp(1.55rem,6.5vw,2.4rem)] leading-tight text-rose-950 italic">
              When should I pick you up?
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-rose-700 sm:mt-4 sm:text-base">
              Choose a day and a time. I will be counting the hours.
            </p>
            <form className="mx-auto mt-6 grid w-full max-w-sm gap-4 text-left sm:mt-8" onSubmit={onSchedule}>
              <label className="block">
                <span className="mb-2 block text-xs font-bold tracking-wide text-rose-700 uppercase sm:text-sm">
                  Date
                </span>
                <input
                  required
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="min-h-12 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base text-rose-900 outline-none ring-rose-300 focus:ring-2"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold tracking-wide text-rose-700 uppercase sm:text-sm">
                  Time
                </span>
                <input
                  required
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="min-h-12 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-base text-rose-900 outline-none ring-rose-300 focus:ring-2"
                />
              </label>
              <button type="submit" className={`${yesClass} mt-1 sm:w-full`}>
                Save our date
              </button>
            </form>
          </section>
        )}

        {step === 'done' && (
          <section className="mt-4">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-2xl text-rose-500 sm:mb-4 sm:h-16 sm:w-16 sm:text-3xl">
              ♥
            </div>
            <h1 className="font-display text-[clamp(1.55rem,6.5vw,2.4rem)] leading-tight text-rose-950 italic">
              It is a date, my love
            </h1>
            <p className="mt-3 px-1 text-[clamp(1.05rem,4.2vw,1.35rem)] leading-snug font-semibold text-rose-700">
              {when}
            </p>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-rose-800 sm:mt-6 sm:text-lg">
              Thank you for saying yes. I already know that evening will feel like a secret
              written just for us — slow, warm, and a little bit magical. I will be there,
              smiling before you even see me, grateful that you chose this moment with me.
            </p>
            <p className="font-script mt-6 text-[clamp(1.6rem,6vw,1.9rem)] text-rose-600 sm:mt-8">
              always yours
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
