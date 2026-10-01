"use client";

import { useMemo, useState, type FormEvent } from "react";

export function HireTerminal() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const valid = useMemo(() => /.+@.+\..+/.test(from) && subject.trim().length > 2 && message.trim().length > 8, [from, subject, message]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) return;
    const body = `${message}\n\nFrom: ${from}`;
    window.location.href = `mailto:shivam.singh.koyad2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="hire-terminal" onSubmit={submit}>
      <div><label>to:</label><span>shivam.singh.koyad2006@gmail.com</span></div>
      <div><label htmlFor="hire-from">from:</label><input id="hire-from" type="email" value={from} onChange={(event) => setFrom(event.target.value)} placeholder="you@example.com" /></div>
      <div><label htmlFor="hire-subject">subject:</label><input id="hire-subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="What are we building?" /></div>
      <textarea aria-label="Message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Share the problem, team, and why this could be a good fit..." />
      <button type="submit" disabled={!valid}>send</button>
    </form>
  );
}
