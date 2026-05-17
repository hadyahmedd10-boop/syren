type Params = {
  subject: string;
  preheader: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

export function generateSyrenEmail({ subject, preheader, bodyHtml, ctaLabel, ctaUrl }: Params): string {
  const button = ctaLabel && ctaUrl
    ? `<div style="text-align:center; margin:24px 0;">
         <a href="${ctaUrl}" style="display:inline-block; background:#C9A84C; color:#000000; font-weight:700; text-transform:uppercase; padding:14px 32px; border-radius:4px; text-decoration:none; letter-spacing:0.08em;">
           ${ctaLabel}
         </a>
       </div>`
    : "";
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${subject}</title>
    <style>
      @media (prefers-color-scheme: dark) { body { background: #0a0a0a; } }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#0a0a0a; color:#e8e0d0;">
    <span style="display:none; visibility:hidden; opacity:0; height:0; width:0; overflow:hidden;">${preheader}</span>
    <div style="width:100%; background:#0a0a0a; padding:24px 0;">
      <div style="max-width:600px; margin:0 auto; background:#111111;">
        <div style="background:#0a0a0a; padding:24px 16px; text-align:center;">
          <div style="font-family: Georgia, serif; font-size:28px; letter-spacing:0.15em; color:#C9A84C;">SYREN</div>
        </div>
        <div style="height:1px; background:#C9A84C; opacity:0.5;"></div>
        <div style="padding:32px; font-family: Georgia, serif; line-height:1.8; color:#e8e0d0;">
          ${bodyHtml}
          ${button}
        </div>
        <div style="height:1px; background:#C9A84C; opacity:0.5;"></div>
        <div style="padding:20px 24px; font-family: Georgia, serif; text-align:center; background:#0a0a0a;">
          <div style="color:#C9A84C; text-transform:uppercase; letter-spacing:0.15em; font-size:12px; margin-bottom:6px;">Syren Travel</div>
          <div style="margin:6px 0;">
            <a href="https://www.syrentravel.com" style="color:#C9A84C; text-decoration:none;">syrentravel.com</a>
          </div>
          <div style="margin:6px 0;">
            <span style="color:#e8e0d0;">info@syrentravel.com</span>
          </div>
          <div style="margin:6px 0;">
            <span style="color:#e8e0d0;">+20 1016015723</span>
          </div>
          <div style="margin-top:10px; color:#7f7767; font-size:12px;">© 2026 Syren Travel. All rights reserved.</div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
