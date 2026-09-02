# WebDevPro Ultra Max 5 — Master Rebrand Guide

This is the approved reusable master based on the Granite Installations layout.

## Preserve on every rebrand
- Multi-page React/Vite structure
- Hero slider and motion/entry animations
- Responsive navbar and mobile bottom menu
- Home, About, Services, Gallery, FAQ, Testimonials and Contact pages
- Contact form with service dropdown and validation
- Map block on Contact page
- PWA manifest, install prompt, offline page and service worker
- Floating interactive WhatsApp assistant
- Vercel SPA routing (`vercel.json`)
- Responsive desktop/tablet/mobile layouts

## Change for each client
1. Business name, logo, favicon and page metadata.
2. Brand palette to match the supplied logo. Update Tailwind/CSS utility colors consistently.
3. Hero images, gallery images and all business imagery.
4. Business copy, services, testimonials, FAQ and About content.
5. Phone, WhatsApp, email, website, address and map embed.
6. `WHATSAPP_NUMBER` and `BUSINESS_NAME` in `src/components/FloatingWhatsApp.tsx`.
7. Service choices in both the Contact form and WhatsApp assistant.
8. `public/manifest.json` app name, short name, theme/background colors and icons.

## WhatsApp assistant behavior
The floating button opens an on-site interactive assistant first. It asks for:
- Name
- Phone
- Service / enquiry type
- Message / project details

It then shows a review screen and only after the visitor confirms does it open WhatsApp with a pre-filled structured message. Do not replace it with a direct WhatsApp-only button.

## Contact page standard
Keep the current premium layout: contact cards, validated quote form, service dropdown, business hours, map, and quick contact actions. Replace client-specific values only.

## Clean-source rule
Do not add Lovable/Bolt/Base44 or builder branding, badges, labels, scripts, metadata or dependencies. Keep the repository clean and deployable directly to GitHub + Vercel.

## Build
```bash
npm install
npm run build
```
Vercel: Framework = Vite, Build = `npm run build`, Output = `dist`.
