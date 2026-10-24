import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Arrow, EASE } from "./ui";
import { BUDGETS, CONTACT_INBOX, SERVICES } from "../data";

/*
 * Submission: enquiries are emailed to CONTACT_INBOX (data.js) through FormSubmit
 * (https://formsubmit.co) — no backend or API key needed. The very first submission sends an
 * activation email to that inbox; click its link once and every later message is delivered.
 * To use your own API or another form service instead, set VITE_FORM_ENDPOINT.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${CONTACT_INBOX}`;

const RULES = {
  name: (v) => v.trim().length >= 2 || "Please tell us your name.",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
  service: (v) => !!v || "Pick the service that fits best — “Not sure yet” is fine.",
  message: (v) => v.trim().length >= 20 || "Tell us a little more — at least 20 characters.",
};

const EMPTY = { name: "", email: "", service: "", budget: "", message: "" };

async function send(values) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      service: values.service,
      budget: values.budget || "Not specified",
      message: values.message,
      // FormSubmit options: subject line, reply goes to the visitor, tidy table layout, no captcha page
      _subject: `New project enquiry — ${values.name}`,
      _replyto: values.email,
      _template: "table",
      _captcha: "false",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) === "false") throw new Error(data.message || `Form endpoint responded ${res.status}`);
  return "sent";
}

const fieldCls =
  "peer w-full rounded-none border-0 border-b-2 border-ink/80 bg-transparent px-0 py-3 text-[1.1rem] font-medium text-ink placeholder:text-ink/35 transition-colors focus:border-ink focus:bg-ink/[.03] focus:outline-none aria-invalid:border-danger";

function Field({ id, label, hint, error, children }) {
  return (
    <div className="relative grid gap-1.5">
      <label htmlFor={id} className="label flex justify-between gap-3">
        <span>{label}</span>
        {hint && <span className="text-ink/50">{hint}</span>}
      </label>
      <div className="relative">
        {children}
        {/* animated focus rule */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ink transition-transform duration-500 ease-creep peer-focus:scale-x-100" />
      </div>
      {error && (
        <p id={`${id}-err`} className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <span aria-hidden="true">✕</span> {error}
        </p>
      )}
    </div>
  );
}

function Success({ onReset }) {
  return (
    <m.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex min-h-[420px] flex-col justify-center"
      role="status"
      tabIndex={-1}
      ref={(el) => el?.focus()}
    >
      <svg viewBox="0 0 64 64" className="size-16" aria-hidden="true">
        <circle cx="32" cy="32" r="30" className="fill-ink" />
        <m.path
          d="M19 33 L28 42 L46 23"
          fill="none"
          stroke="var(--color-lime)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        />
      </svg>
      <h3 className="mt-6 font-display text-[clamp(2rem,3.4vw,3rem)] font-black uppercase leading-[.95] tracking-[-.04em]">
        Message received.
      </h3>
      <p className="mt-4 max-w-[40ch] text-lg text-ink-2">Thanks for reaching out — we’ll creep into your inbox within two working days.</p>
      <button type="button" onClick={onReset} className="link-underline mt-8 w-fit cursor-pointer">
        Send another enquiry
      </button>
    </m.div>
  );
}

export default function ContactForm({ className = "" }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const check = (name, value = values[name]) => {
    const result = RULES[name]?.(value) ?? true;
    setErrors((e) => ({ ...e, [name]: result === true ? undefined : result }));
    return result === true;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) check(name, value);
    if (status === "error") setStatus("idle");
  };
  const onBlur = (e) => e.target.value && check(e.target.name);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const names = Object.keys(RULES);
    const results = names.map((n) => check(n));
    const firstBad = results.indexOf(false);
    if (firstBad !== -1) {
      form.elements[names[firstBad]].focus();
      return;
    }
    setStatus("sending");
    try {
      setStatus(await send(values));
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const props = (name) => ({
    name,
    id: `f-${name}`,
    value: values[name],
    onChange,
    onBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });

  const done = status === "sent";

  return (
    <div className={`rounded-[18px] border-2 border-ink bg-cream p-[clamp(22px,3.4vw,44px)] shadow-[10px_12px_0_var(--color-ink)] ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <Success key="success" onReset={() => setStatus("idle")} />
        ) : (
          <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="grid gap-7" aria-describedby="form-note">
            <div className="flex items-center justify-between gap-4">
              <p className="label">Project enquiry</p>
              <p id="form-note" className="label text-ink/50">All fields marked * are required</p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="f-name" label="Your name *" error={errors.name}>
                <input type="text" autoComplete="name" required placeholder="Jane Creep" className={fieldCls} {...props("name")} />
              </Field>
              <Field id="f-email" label="Email *" error={errors.email}>
                <input type="email" autoComplete="email" required placeholder="jane@company.com" className={fieldCls} {...props("email")} />
              </Field>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field id="f-service" label="Service required *" error={errors.service}>
                <select required className={`select-arrow !bg-transparent pr-8 ${fieldCls}`} {...props("service")}>
                  <option value="">Choose one</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug}>{s.name}</option>
                  ))}
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field id="f-budget" label="Budget range" hint="Optional">
                <select className={`select-arrow !bg-transparent pr-8 ${fieldCls}`} {...props("budget")}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id="f-message" label="Project description *" hint={`${values.message.trim().length} / 20+`} error={errors.message}>
              <textarea
                rows={4}
                required
                placeholder="What are you making, who is it for, and what does success look like?"
                className={`min-h-[132px] resize-y ${fieldCls}`}
                {...props("message")}
              />
            </Field>

            {status === "error" && (
              <p role="alert" className="rounded-lg border-2 border-danger bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
                Something went wrong sending your message. Please try again, or email us at{" "}
                <a href={`mailto:${CONTACT_INBOX}`} className="underline">
                  {CONTACT_INBOX}
                </a>
                .
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button type="submit" className="btn px-7 py-[1.05em] text-[1.05rem] disabled:cursor-wait" disabled={status === "sending"} data-cursor="Send it">
                {status === "sending" ? (
                  <>
                    <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send enquiry</span>
                    <Arrow />
                  </>
                )}
              </button>
              <p className="label max-w-[28ch] text-ink/55">We reply within two working days. No spam, ever.</p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
