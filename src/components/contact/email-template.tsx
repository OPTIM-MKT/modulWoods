import * as React from "react";

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  lang?: string;
}

interface EmailTemplateProps {
  data: ContactEmailData;
}

/* -------------------------------------------------------------------------- */
/*  Brand tokens — mirror the site's CSS custom properties                     */
/*  --brand-coffee: #24160f | --brand-amber: #f48220 | --brand-cream: #f8f3ec */
/* -------------------------------------------------------------------------- */
const BRAND = {
  coffee: "#24160f",
  coffeeLight: "#3d2215",
  amber: "#f48220",
  amberLight: "#fba54a",
  cream: "#f8f3ec",
  creamDeep: "#efe6d8",
  white: "#ffffff",
  muted: "#7b6a5d",
  faint: "#a3948a",
  border: "#e5ded3",
} as const;

const s = {
  wrapper: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: BRAND.cream,
    padding: "40px 20px",
    margin: 0,
  } as React.CSSProperties,

  card: {
    maxWidth: 620,
    margin: "0 auto",
    backgroundColor: BRAND.white,
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(36,22,15,0.10)",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  header: {
    background: `linear-gradient(135deg, ${BRAND.coffee} 0%, ${BRAND.coffeeLight} 100%)`,
    padding: "36px 40px",
  } as React.CSSProperties,

  logoBadge: {
    display: "inline-block",
    backgroundColor: BRAND.amber,
    borderRadius: 8,
    padding: "4px 14px",
    color: BRAND.coffee,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    marginBottom: 16,
  } as React.CSSProperties,

  headerTitle: {
    color: BRAND.white,
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  } as React.CSSProperties,

  headerSubtitle: {
    color: "rgba(248,243,236,0.75)",
    fontSize: 14,
    margin: "6px 0 0",
    lineHeight: 1.5,
  } as React.CSSProperties,

  body: { padding: "32px 40px" } as React.CSSProperties,

  greeting: {
    fontSize: 15,
    color: BRAND.coffee,
    marginBottom: 24,
    lineHeight: 1.65,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: BRAND.amber,
    margin: "0 0 12px",
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 12,
  } as React.CSSProperties,

  fieldBox: {
    backgroundColor: BRAND.cream,
    borderRadius: 10,
    padding: "12px 16px",
    border: `1px solid ${BRAND.border}`,
  } as React.CSSProperties,

  fieldBoxFull: {
    backgroundColor: BRAND.cream,
    borderRadius: 10,
    padding: "12px 16px",
    border: `1px solid ${BRAND.border}`,
    marginBottom: 12,
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: BRAND.faint,
    letterSpacing: "0.10em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 4,
  } as React.CSSProperties,

  fieldValue: {
    fontSize: 14,
    color: BRAND.coffee,
    fontWeight: 500,
    margin: 0,
    lineHeight: 1.5,
  } as React.CSSProperties,

  divider: {
    border: "none",
    borderTop: `1px solid ${BRAND.border}`,
    margin: "24px 0",
  } as React.CSSProperties,

  messageBox: {
    backgroundColor: `${BRAND.amber}16`,
    border: `1px solid ${BRAND.amber}40`,
    borderRadius: 10,
    padding: "18px 20px",
    marginBottom: 24,
  } as React.CSSProperties,

  messageLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: BRAND.coffee,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 10,
  } as React.CSSProperties,

  messageText: {
    fontSize: 14,
    color: BRAND.coffee,
    lineHeight: 1.75,
    margin: 0,
    whiteSpace: "pre-wrap" as const,
  } as React.CSSProperties,

  replyBtn: {
    display: "inline-block",
    backgroundColor: BRAND.amber,
    color: BRAND.coffee,
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 700,
    textDecoration: "none",
    letterSpacing: "0.02em",
  } as React.CSSProperties,

  footer: {
    borderTop: `1px solid ${BRAND.border}`,
    padding: "20px 40px",
    backgroundColor: BRAND.creamDeep,
    textAlign: "center" as const,
  } as React.CSSProperties,

  footerText: {
    fontSize: 12,
    color: BRAND.muted,
    margin: 0,
    lineHeight: 1.65,
  } as React.CSSProperties,
};

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                              */
/* -------------------------------------------------------------------------- */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={s.fieldBox}>
      <span style={s.fieldLabel}>{label}</span>
      <p style={s.fieldValue}>{value}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main template                                                               */
/* -------------------------------------------------------------------------- */
export function EmailTemplate({ data }: EmailTemplateProps) {
  const hasOptional = data.phone || data.company;

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={s.header}>
          <div style={s.logoBadge}>Modul Woods</div>
          <h1 style={s.headerTitle}>New enquiry from your website</h1>
          <p style={s.headerSubtitle}>
            {data.name} sent a message via the contact form.
          </p>
        </div>

        {/* ── Body ───────────────────────────────────────────────── */}
        <div style={s.body}>
          <p style={s.greeting}>
            Hello team — you received a new enquiry from{" "}
            <strong>{data.name}</strong>. Here are the details:
          </p>

          {/* Contact info */}
          <p style={s.sectionTitle}>Contact information</p>
          <div style={s.grid}>
            <Field label="Full name" value={data.name} />
            <Field label="E-mail" value={data.email} />
          </div>

          {hasOptional && (
            <div style={s.grid}>
              {data.phone && <Field label="Phone" value={data.phone} />}
              {data.company && <Field label="Company" value={data.company} />}
            </div>
          )}

          {data.lang && (
            <div style={{ ...s.fieldBoxFull, marginBottom: 24 }}>
              <span style={s.fieldLabel}>Language preference</span>
              <p style={s.fieldValue}>
                {data.lang === "es" ? "Spanish" : "English"}
              </p>
            </div>
          )}

          <hr style={s.divider} />

          {/* Message */}
          <p style={s.sectionTitle}>Message</p>
          <div style={s.messageBox}>
            <p style={s.messageText}>{data.message}</p>
          </div>

          {/* Reply CTA */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <a
              href={`mailto:${data.email}`}
              style={s.replyBtn}
            >
              Reply to {data.name} →
            </a>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div style={s.footer}>
          <p style={s.footerText}>
            This email was generated automatically by the contact form at{" "}
            <strong>modul-woods.com</strong>. Reply directly to reach the
            sender — the reply-to address is already set.
          </p>
          <p style={{ ...s.footerText, marginTop: 8 }}>
            © {new Date().getFullYear()} Modul Woods · Manufactured in
            Monterrey, MX · Distributed from Laredo, TX
          </p>
        </div>
      </div>
    </div>
  );
}
