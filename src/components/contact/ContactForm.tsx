import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { FiSend } from "react-icons/fi";

import type { Dictionary } from "@/i18n/i18n";

type FormCopy = Dictionary["contact"]["form"];

interface Props {
  copy: FormCopy;
  lang: string;
}

/** Built per-render so the messages come from the active dictionary. */
const buildSchema = (t: FormCopy) =>
  z.object({
    name: z.string().trim().min(2, t.required),
    email: z.string().trim().email({ message: t.invalidEmail }),
    phone: z.string().trim().optional(),
    company: z.string().trim().optional(),
    message: z.string().trim().min(12, t.tooShort),
    /** Honeypot — real people never fill this in. */
    website: z.string().max(0).optional(),
  });

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

export default function ContactForm({ copy, lang }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(copy)),
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, lang }),
      });

      if (!response.ok) throw new Error(String(response.status));

      toast.success(copy.success);
      reset();
    } catch {
      toast.error(copy.error);
    }
  };

  const fieldClass = (invalid: boolean) =>
    `field ${invalid ? "field--invalid" : ""}`;

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Honeypot: off-screen, never announced, never tabbable */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label={copy.fullName}
            error={errors.name?.message}
            required
          >
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className={fieldClass(!!errors.name)}
              {...register("name")}
            />
          </Field>

          <Field
            id="email"
            label={copy.email}
            error={errors.email?.message}
            required
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className={fieldClass(!!errors.email)}
              {...register("email")}
            />
          </Field>

          <Field id="phone" label={copy.phone} error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={fieldClass(!!errors.phone)}
              {...register("phone")}
            />
          </Field>

          <Field
            id="company"
            label={copy.company}
            error={errors.company?.message}
          >
            <input
              id="company"
              type="text"
              autoComplete="organization"
              className={fieldClass(!!errors.company)}
              {...register("company")}
            />
          </Field>
        </div>

        <Field
          id="message"
          label={copy.message}
          error={errors.message?.message}
          required
        >
          <textarea
            id="message"
            rows={5}
            placeholder={copy.messagePlaceholder}
            aria-invalid={!!errors.message}
            className={`${fieldClass(!!errors.message)} resize-y`}
            {...register("message")}
          />
        </Field>

        <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-relaxed text-faint">
            {copy.consent}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary group shrink-0"
          >
            {isSubmitting ? copy.sending : copy.submitButton}
            <FiSend
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </form>

      <Toaster
        position="bottom-center"
        richColors
        toastOptions={{ className: "text-sm" }}
      />
    </>
  );
}

/** Label + control + inline error, so validation reads next to what failed. */
function Field({
  id,
  label,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
      >
        {label}
        {required && (
          <span className="ml-1 text-secondary" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
