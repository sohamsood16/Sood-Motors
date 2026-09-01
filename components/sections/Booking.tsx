"use client";

import { useMemo, useState, type FormEvent } from "react";
import { business, buildBookingMessage, services, whatsapp } from "@/lib/business";
import { useBooking } from "@/lib/BookingContext";

interface FormState {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  phone: "",
  vehicle: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

const PHONE_PATTERN = /^[+]?[\d\s-]{8,15}$/;

export default function Booking() {
  const { selectedService } = useBooking();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Sync the service selected on the Services grid into the form during
  // render (rather than in an effect) to avoid an extra render pass.
  const [appliedService, setAppliedService] = useState<string | null>(null);
  if (selectedService && selectedService !== appliedService) {
    setAppliedService(selectedService);
    setForm((f) => ({ ...f, service: selectedService }));
  }

  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.phone.trim()) next.phone = "Enter a phone number.";
    else if (!PHONE_PATTERN.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.vehicle.trim()) next.vehicle = "Enter your vehicle make and model.";
    if (!form.service) next.service = "Choose a service.";
    if (!form.date) next.date = "Choose a preferred date.";
    else if (form.date < todayIso) next.date = "Choose a date from today onward.";
    if (!form.time) next.time = "Choose a preferred time.";
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const message = buildBookingMessage(form);
    const url = whatsapp.buildUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-none border-b border-white/20 bg-transparent py-3 text-bone placeholder:text-steel-dim focus:border-copper focus:outline-none";
  const labelClass =
    "font-mono text-[0.65rem] tracking-[0.2em] text-steel-dim";
  const errorClass = "mt-1 text-xs text-copper";

  return (
    <section
      id="booking"
      className="relative border-t border-white/10 bg-charcoal py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
        <div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl">
            Book a Detail
          </h2>
          <p className="mt-6 max-w-sm text-balance leading-relaxed text-steel">
            Tell us about your vehicle and preferred time. Submitting opens
            WhatsApp with your details filled in — we&apos;ll confirm
            availability there directly.
          </p>
          <p className="mt-8 font-mono text-sm text-steel-dim">
            Prefer to call?{" "}
            <a
              href={`tel:${business.phoneDial}`}
              className="text-bone underline decoration-copper underline-offset-4"
            >
              {business.phone}
            </a>
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
        >
          <div>
            <label htmlFor="name" className={labelClass}>
              NAME
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Your full name"
              className={inputClass}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className={errorClass}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              PHONE
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+91 00000 00000"
              className={inputClass}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className={errorClass}>
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="vehicle" className={labelClass}>
              VEHICLE
            </label>
            <input
              id="vehicle"
              type="text"
              value={form.vehicle}
              onChange={update("vehicle")}
              placeholder="e.g. Hyundai Creta 2022"
              className={inputClass}
              aria-invalid={!!errors.vehicle}
              aria-describedby={errors.vehicle ? "vehicle-error" : undefined}
            />
            {errors.vehicle && (
              <p id="vehicle-error" className={errorClass}>
                {errors.vehicle}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="service" className={labelClass}>
              SERVICE
            </label>
            <select
              id="service"
              value={form.service}
              onChange={update("service")}
              className={`${inputClass} appearance-none`}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="" className="bg-charcoal">
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.title} className="bg-charcoal">
                  {s.title}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className={errorClass}>
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date" className={labelClass}>
              PREFERRED DATE
            </label>
            <input
              id="date"
              type="date"
              min={todayIso}
              value={form.date}
              onChange={update("date")}
              className={inputClass}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <p id="date-error" className={errorClass}>
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="time" className={labelClass}>
              PREFERRED TIME
            </label>
            <input
              id="time"
              type="time"
              value={form.time}
              onChange={update("time")}
              className={inputClass}
              aria-invalid={!!errors.time}
              aria-describedby={errors.time ? "time-error" : undefined}
            />
            {errors.time && (
              <p id="time-error" className={errorClass}>
                {errors.time}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className={labelClass}>
              MESSAGE (OPTIONAL)
            </label>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={update("message")}
              placeholder="Anything we should know before you arrive?"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-bone px-8 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-copper"
            >
              Send Booking via WhatsApp
            </button>
            {submitted && (
              <p role="status" className="mt-4 text-sm text-steel">
                WhatsApp should have opened in a new tab with your booking
                details. If it didn&apos;t, check your pop-up blocker.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
