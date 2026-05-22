"use client";

import React, { useMemo, useState } from "react";

/**
 * Buy Way RU/KZ unified landing
 */
export default function BuyWayLanding() {
  const [theme, setTheme] = useState("ru");
  const [page, setPage] = useState("home");

  const t = useMemo(() => (theme === "ru" ? ruText : kzText), [theme]);
  const palette = useMemo(() => (theme === "ru" ? ruPalette : kzPalette), [theme]);

  const goToPage = (nextPage) => {
    setPage(nextPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <button onClick={() => goToPage("home")} className="flex items-center gap-3 text-left">
            <Logo color={palette.primary} accent={palette.accent} />
            <div className="text-sm sm:text-base font-medium text-gray-600 leading-tight">{t.tagline}</div>
          </button>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
            <button onClick={() => goToPage("about")} className={navClass(page === "about")}>О нас</button>
            <button onClick={() => goToPage("services")} className={navClass(page === "services")}>Услуги</button>
            <button onClick={() => goToPage("contacts")} className={navClass(page === "contacts")}>Контакты</button>
          </nav>

          <div className="flex items-center gap-2">
            <RegionSwitch theme={theme} onChange={setTheme} />
          </div>
        </div>
      </header>

      {page === "home" && <HomePage t={t} palette={palette} />}
      {page === "about" && <AboutPage t={t} palette={palette} />}
      {page === "services" && <ServicesPage t={t} palette={palette} />}
      {page === "contacts" && <ContactsPage t={t} palette={palette} />}

      <Footer t={t} palette={palette} goToPage={goToPage} />
    </div>
  );
}

function navClass(active) {
  return active ? "text-gray-950" : "text-gray-600 hover:text-gray-950 transition";
}

function HomePage({ t, palette }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">{t.heroTitle}</h1>
        <p className="text-lg text-gray-600 mb-6">{t.heroSubtitle}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {t.cards.map((card, i) => (
            <Card key={i}>
              <div className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>{card.title}</div>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage({ t }) {
  return (
    <Container>
      <h2 className="text-2xl sm:text-3xl font-bold mb-5">{t.aboutTitle}</h2>
      <p className="text-gray-600 leading-relaxed">{t.aboutSubtitle}</p>
    </Container>
  );
}

function ServicesPage({ t }) {
  return (
    <Container>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t.servicesTitle}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {t.services.map((service, i) => (
          <Card key={i}>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}

function ContactsPage({ t }) {
  return (
    <Container>
      <h2 className="text-2xl sm:text-3xl font-bold mb-5">Контакты</h2>
      <p className="text-gray-600 leading-relaxed mb-6">{t.contactsSubtitle}</p>
      <div className="grid gap-4">
        <ContactCard title="Telegram" value="@buyway_support" href="https://t.me/buyway_support" />
        <ContactCard title="Email" value="service@buyway.su" href="mailto:service@buyway.su" />
      </div>
    </Container>
  );
}

function Footer({ t, palette, goToPage }) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div className="flex items-center gap-3">
          <Logo color={palette.primary} accent={palette.accent} small />
          <div className="text-gray-600">{t.tagline}</div>
        </div>
        <ul className="space-y-1 text-gray-600">
          <li><button onClick={() => goToPage("about")} className="hover:underline">О нас</button></li>
          <li><button onClick={() => goToPage("services")} className="hover:underline">Услуги</button></li>
          <li><button onClick={() => goToPage("contacts")} className="hover:underline">Контакты</button></li>
        </ul>
      </div>
    </footer>
  );
}

function Container({ children }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">{children}</div>;
}

function Card({ children }) {
  return <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">{children}</div>;
}

function ContactCard({ title, value, href }) {
  return (
    <a href={href} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-sm transition">
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div className="text-lg font-semibold">{value}</div>
    </a>
  );
}

function RegionSwitch({ theme, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1 bg-white">
      <button onClick={() => onChange("ru")} className={`px-3 py-1 text-sm rounded-lg ${theme === "ru" ? "bg-gray-900 text-white" : "text-gray-700"}`}>Россия</button>
      <button onClick={() => onChange("kz")} className={`px-3 py-1 text-sm rounded-lg ${theme === "kz" ? "bg-gray-900 text-white" : "text-gray-700"}`}>Казахстан</button>
    </div>
  );
}

function Logo({ color, accent, small = false }) {
  const size = small ? 28 : 38;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="36" height="28" rx="6" stroke={color} strokeWidth="2" />
      <path d="M10 30 L22 22 L30 28 L40 18" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ruPalette = { primary: "#0A5BE0", accent: "#D61E2B" };
const kzPalette = { primary: "#00A3E0", accent: "#F2C300" };

const ruText = {
  tagline: "Способ покупки с заботой и надёжностью",
  heroTitle: "Безопасный выкуп товаров из Европы под ключ",
  heroSubtitle: "Мы проверим, выкупим и аккуратно доставим товар из Германии.",
  aboutTitle: "Покупки за границей без лишних рисков и сложностей",
  aboutSubtitle: "Сопровождаем покупку от первого сообщения до получения посылки.",
  servicesTitle: "Услуги для безопасной покупки в Европе",
  services: [
    { title: "Выкуп товаров", desc: "Покупаем товары в интернет-магазинах и у частных продавцов." },
    { title: "Проверка", desc: "Фото/видео-отчёт перед отправкой." },
    { title: "Доставка", desc: "Маршрут, упаковка и отслеживание." },
  ],
  cards: [
    { title: "Проверка до оплаты", desc: "Смотрим продавца, условия и риски." },
    { title: "Отчётность", desc: "Фиксируем состояние товара." },
    { title: "Поддержка", desc: "Сопровождаем до получения." },
  ],
  contactsSubtitle: "Оставьте заявку или напишите напрямую.",
};

const kzText = {
  tagline: "Способ покупки с заботой и надёжностью",
  heroTitle: "Посредническая покупка товаров в России и Европе",
  heroSubtitle: "Для граждан Казахстана: выкуп в РФ и доставка в КЗ.",
  aboutTitle: "Помогаем клиентам из Казахстана покупать без границ",
  aboutSubtitle: "Проверяем продавцов, выкупаем и организуем доставку.",
  servicesTitle: "Услуги для клиентов из Казахстана",
  services: [
    { title: "Выкуп в России", desc: "Avito, Ozon, Wildberries, Drom и другие." },
    { title: "Проверка товара", desc: "Осмотр и фото/видео фиксация." },
    { title: "Доставка в Казахстан", desc: "Надёжный маршрут и трекинг." },
  ],
  cards: [
    { title: "Проверяем продавца", desc: "Снижаем риски сделки." },
    { title: "Фиксируем состояние", desc: "Показываем что отправляем." },
    { title: "Сопровождаем", desc: "Поддержка на всём пути." },
  ],
  contactsSubtitle: "Напишите в Telegram или оставьте заявку.",
};
