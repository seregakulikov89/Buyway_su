"use client";

import React, { useMemo, useState } from "react";

/**
 * Buy Way RU/KZ unified landing
 * - Главная + отдельные страницы: О нас / Услуги / Контакты
 * - Переключение Россия / Казахстан
 * - В шапке оставлены только логотип и слоган
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

            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                Buy way
              </div>

              <div className="text-xs sm:text-sm font-medium text-gray-500">
                {t.tagline}
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
            <button onClick={() => goToPage("about")} className={navClass(page === "about")}>
              О нас
            </button>
            <button onClick={() => goToPage("services")} className={navClass(page === "services")}>
              Услуги
            </button>
            <button onClick={() => goToPage("contacts")} className={navClass(page === "contacts")}>
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <RegionSwitch theme={theme} onChange={setTheme} />
            <button
              onClick={() => goToPage("home")}
              className="rounded-xl px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: palette.primary }}
            >
              Заявка
            </button>
          </div>
        </div>

        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex gap-4 text-sm font-medium text-gray-700">
            <button onClick={() => goToPage("about")} className={navClass(page === "about")}>О нас</button>
            <button onClick={() => goToPage("services")} className={navClass(page === "services")}>Услуги</button>
            <button onClick={() => goToPage("contacts")} className={navClass(page === "contacts")}>Контакты</button>
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
  return active
    ? "text-gray-950"
    : "text-gray-600 hover:text-gray-950 transition";
}

function HomePage({ t, palette }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 10%, ${palette.primary} 0, transparent 50%), radial-gradient(circle at 80% 30%, ${palette.accent} 0, transparent 50%)`,
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                {t.heroTitle}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{t.heroSubtitle}</p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#process"
                  className="rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: palette.primary }}
                >
                  {t.ctaSecondary}
                </a>
                <a
                  href="#faq"
                  className="rounded-xl px-5 py-3 text-sm font-semibold border"
                  style={{ borderColor: palette.primary, color: palette.primary }}
                >
                  {t.ctaTertiary}
                </a>
              </div>

              <div className="mt-6 text-sm text-gray-500">{t.disclaimer}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">{t.quoteTitle}</h3>
              <LeadForm palette={palette} t={t} />
              <p className="text-xs text-gray-500 mt-3">{t.privacyNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-white">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t.processTitle}</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {t.process.map((step, i) => (
              <li key={i} className="relative bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: palette.accent }}
                >
                  {i + 1}
                </div>
                <p className="font-medium mb-1">{step.title}</p>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 text-sm text-gray-500">{t.processFootnote}</div>
        </Container>
      </section>

      <section className="bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t.pricingTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.pricing.map((card, idx) => (
              <Card key={idx}>
                <div className="text-sm text-gray-500 mb-1">{card.kicker}</div>
                <div className="text-xl font-bold mb-3">{card.title}</div>
                <ul className="space-y-2 text-sm text-gray-700">
                  {card.points.map((pt, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: palette.primary }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-sm text-gray-500">{t.pricingNote}</div>
        </Container>
      </section>

      <section className="bg-white">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t.guaranteeTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.guarantees.map((g, i) => (
              <Card key={i}>
                <div className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>
                  {g.title}
                </div>
                <p className="text-sm text-gray-600">{g.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                  {item.q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function AboutPage({ t, palette }) {
  return (
    <>
      <PageHero
        palette={palette}
        label="О нас"
        title={t.aboutTitle}
        subtitle={t.aboutSubtitle}
      />

      <section className="bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5">{t.aboutBlockTitle}</h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                {t.aboutTexts.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.aboutStats.map((item, i) => (
                <Card key={i}>
                  <div className="text-2xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Почему нам доверяют</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.trust.map((item, i) => (
              <Card key={i}>
                <div className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>
                  {item.title}
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ServicesPage({ t, palette }) {
  return (
    <>
      <PageHero
        palette={palette}
        label="Услуги"
        title={t.servicesTitle}
        subtitle={t.servicesSubtitle}
      />

      <section className="bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {t.services.map((service, i) => (
              <Card key={i}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold mb-4"
                  style={{ backgroundColor: palette.primary }}
                >
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gray-50">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Что входит в сопровождение</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.serviceDetails.map((item, i) => (
              <Card key={i}>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactsPage({ t, palette }) {
  return (
    <>
      <PageHero
        palette={palette}
        label="Контакты"
        title="Свяжитесь с нами"
        subtitle={t.contactsSubtitle}
      />

      <section className="bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5">Как быстрее получить расчёт</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Отправьте ссылку на товар, город получения, желаемый способ оплаты и любые важные детали:
                размер, цвет, комплектацию, состояние или ограничения по срокам.
              </p>

              <div className="grid gap-4">
                <ContactCard title="Telegram" value="@buyway_support" href="https://t.me/buyway_support" />
                <ContactCard title="Email" value="service@buyway.su" href="mailto:service@buyway.su" />
              </div>
            </div>

            <Card>
              <h3 className="font-semibold mb-4">Получить точный расчёт</h3>
              <LeadForm palette={palette} t={t} />
              <p className="text-xs text-gray-500 mt-3">{t.privacyNote}</p>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}

function PageHero({
  palette,
  label,
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 10%, ${palette.primary} 0, transparent 50%), radial-gradient(circle at 80% 20%, ${palette.accent} 0, transparent 55%)`,
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <Badge palette={palette}>{label}</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 max-w-4xl">
          {title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function Footer({ t, palette, goToPage }) {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="flex items-center gap-3">
            <Logo color={palette.primary} accent={palette.accent} small />
            <div className="text-gray-600">{t.tagline}</div>
          </div>
          <p className="mt-3 text-gray-600">{t.footerAbout}</p>
        </div>

        <div>
          <div className="font-semibold mb-2">{t.footerLinks}</div>
          <ul className="space-y-1 text-gray-600">
            <li><button onClick={() => goToPage("about")} className="hover:underline">О нас</button></li>
            <li><button onClick={() => goToPage("services")} className="hover:underline">Услуги</button></li>
            <li><button onClick={() => goToPage("contacts")} className="hover:underline">Контакты</button></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-2">Контакты</div>
          <ul className="space-y-1 text-gray-600">
            <li>Telegram: <a href="https://t.me/buyway_support" className="underline" target="_blank" rel="noreferrer">@buyway_support</a></li>
            <li>Email: <a href="mailto:service@buyway.su" className="underline">service@buyway.su</a></li>
            <li>{t.legalName}</li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-center text-gray-400 py-4">
        © {new Date().getFullYear()} Buy Way. {t.footerRights}
      </div>
    </footer>
  );
}

function Container({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {children}
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

function Badge({ children, palette }) {
  return (
    <div
      className="inline-flex rounded-full px-4 py-1 text-sm font-medium mb-5"
      style={{
        backgroundColor: `${palette.primary}15`,
        color: palette.primary,
      }}
    >
      {children}
    </div>
  );
}

function ContactCard({ title, value, href }) {
  return (
    <a href={href} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-sm transition">
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div className="text-lg font-semibold">{value}</div>
    </a>
  );
}

function RegionSwitch({
  theme,
  onChange,
}) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-gray-200 p-1 bg-white">
      <button
        onClick={() => onChange("ru")}
        className={`px-3 py-1 text-sm rounded-lg ${theme === "ru" ? "bg-gray-900 text-white" : "text-gray-700"}`}
      >
        Россия
      </button>
      <button
        onClick={() => onChange("kz")}
        className={`px-3 py-1 text-sm rounded-lg ${theme === "kz" ? "bg-gray-900 text-white" : "text-gray-700"}`}
      >
        Казахстан
      </button>
    </div>
  );
}

function LeadForm({ palette, t }) {
  return (
    <form id="lead" className="grid gap-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="rounded-xl border border-gray-300 px-3 py-2" placeholder={t.formName} />
        <input className="rounded-xl border border-gray-300 px-3 py-2" placeholder={t.formPhone} />
      </div>
      <input className="rounded-xl border border-gray-300 px-3 py-2" placeholder={t.formLink} />
      <textarea className="rounded-xl border border-gray-300 px-3 py-2" placeholder={t.formDesc} rows={3} />
      <button
        type="button"
        className="rounded-xl px-5 py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: palette.primary }}
      >
        {t.formSubmit}
      </button>
    </form>
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

const ruPalette = {
  primary: "#0A5BE0",
  accent: "#D61E2B",
};

const kzPalette = {
  primary: "#00A3E0",
  accent: "#F2C300",
};

const ruText = {
  tagline: "Способ покупки с заботой и надёжностью",
  heroTitle: "Безопасный выкуп товаров из Европы под ключ",
  heroSubtitle:
    "Мы проверим, выкупим и аккуратно доставим товар из Германии: фото/видео-отчёт, бережная упаковка и прозрачная оплата по этапам.",
  ctaPrimary: "Оставить заявку",
  ctaSecondary: "Как мы работаем",
  ctaTertiary: "Ответы на вопросы",
  disclaimer:
    "Сроки доставки 8–27 дней ориентировочные и зависят от работы перевозчиков.",
  quoteTitle: "Получить точный расчёт",
  privacyNote: "Нажимая на кнопку, вы соглашаетесь с офертой и политикой конфиденциальности.",

  aboutTitle: "Покупки за границей без лишних рисков и сложностей",
  aboutSubtitle:
    "Мы сопровождаем покупку от первого сообщения до получения посылки: проверяем продавца, выкупаем товар, фиксируем состояние и организуем доставку.",
  aboutBlockTitle: "Мы берём на себя сложные этапы покупки",
  aboutTexts: [
    "Buy Way создан для клиентов, которым нужно купить товар за рубежом безопасно, понятно и без самостоятельного общения с продавцами, магазинами и перевозчиками.",
    "Мы работаем как посредник: принимаем заявку, проверяем товар и продавца, согласовываем условия, выкупаем заказ и организуем доставку. Клиент получает понятный расчёт, фото/видео-отчёт и сопровождение на каждом этапе.",
    "Особое внимание уделяем прозрачности. До оплаты вы понимаете, из чего складывается стоимость, какие сроки возможны и какие ограничения могут быть у перевозчика.",
  ],
  aboutStats: [
    { value: "100+", label: "обработанных заявок" },
    { value: "8–27 дней", label: "ориентировочная доставка" },
    { value: "Фото/видео", label: "контроль перед отправкой" },
    { value: "Под ключ", label: "от выкупа до получения" },
  ],
  trust: [
    { title: "Проверка до оплаты", desc: "Смотрим продавца, условия сделки, цену, доставку до склада и возможные риски." },
    { title: "Отчётность", desc: "Фиксируем состояние товара фото или видео, согласовываем отправку и упаковку." },
    { title: "Поддержка", desc: "Остаёмся на связи до момента получения посылки и помогаем в спорных ситуациях." },
  ],

  servicesTitle: "Услуги для безопасной покупки в Европе",
  servicesSubtitle:
    "Помогаем купить товары, которые сложно или невозможно приобрести напрямую: техника, автозапчасти, одежда, аксессуары, редкие позиции и товары у частных продавцов.",
  services: [
    {
      title: "Выкуп товаров",
      desc: "Покупаем товары в интернет-магазинах, на площадках и у продавцов в Европе. Перед оплатой проверяем условия, стоимость и возможность доставки.",
    },
    {
      title: "Проверка и фотоотчёт",
      desc: "После поступления товара на склад делаем фото или видео, проверяем внешний вид, комплектность и согласовываем дальнейшую отправку.",
    },
    {
      title: "Доставка и упаковка",
      desc: "Подбираем маршрут доставки, усиливаем упаковку при необходимости и передаём посылку перевозчику с отслеживанием.",
    },
  ],
  serviceDetails: [
    { title: "Поиск и проверка продавца", desc: "Оцениваем надёжность продавца, отзывы, условия оплаты и возврата." },
    { title: "Выкуп через посредника", desc: "Оплачиваем товар через партнёра и контролируем движение заказа до склада." },
    { title: "Консолидация заказов", desc: "Можем объединить несколько покупок в одну отправку, если это выгоднее." },
    { title: "Работа с нестандартными товарами", desc: "Отдельно согласуем условия по хрупким, дорогим или габаритным позициям." },
  ],

  processTitle: "Пошаговый процесс",
  processFootnote:
    "Предоплата 0–50% на ваш выбор. Остаток — после проверки товара на нашем складе в Германии.",
  process: [
    { title: "Заявка и подбор", desc: "Находим продавца/магазин в Европе по вашему запросу и фиксируем цену." },
    { title: "Предоплата и выкуп", desc: "Вносите предоплату. Партнёр в Германии выкупает товар." },
    { title: "Приёмка и проверка", desc: "Через 2–5 раб. дней товар на складе в Германии: делаем фото/видео, при необходимости видеосвязь." },
    { title: "Оставшаяся оплата", desc: "Оплачиваете остаток, подтверждаете отправку и адрес получателя." },
    { title: "Упаковка и отправка", desc: "Тщательно упаковываем и оформляем отслеживаемую посылку." },
    { title: "Доставка в РФ", desc: "Средний срок 8–27 дней. Получение в отделении или у курьера." },
  ],

  pricingTitle: "Тарифы и услуги",
  pricingNote:
    "Цены ориентировочные и зависят от категории товара, габаритов и направления. Точный расчёт — по заявке.",
  pricing: [
    {
      kicker: "Базовая комиссия",
      title: "Агентское сопровождение от 6%",
      points: ["Поиск и проверка продавца", "Выкуп через партнёра", "Фото/видео фиксация", "Трекинг и информирование"],
    },
    {
      kicker: "Дополнительно",
      title: "Проверка, упаковка, консолидация",
      points: ["Расширенная проверка", "Усиленная упаковка", "Страхование по заявке", "Консолидация посылок"],
    },
    {
      kicker: "Логистика",
      title: "Международная доставка",
      points: ["Отслеживаемая доставка", "Ориентировочно 8–27 дней", "Ограничения по правилам перевозчика", "Поддержка на всём пути"],
    },
  ],

  guaranteeTitle: "Гарантии и ответственность",
  guarantees: [
    { title: "Целостность посылки", desc: "Тщательная упаковка, фиксация состояния и помощь при подтверждённом повреждении в пути." },
    { title: "Прозрачная оплата", desc: "Оплата по этапам: клиент понимает, за что платит и когда происходит следующий шаг." },
    { title: "Возвраты по правилам", desc: "Отмена до выкупа без удержаний. Возврат после отправки — по условиям продавца и перевозчика." },
  ],

  faqTitle: "Частые вопросы",
  faq: [
    { q: "Какая предоплата?", a: "От 0 до 50% — решаете вы. Остаток — после проверки товара на складе." },
    { q: "Какие сроки?", a: "Приёмка 2–5 рабочих дней, доставка обычно 8–27 дней в зависимости от перевозчика." },
    { q: "Если товар повредился?", a: "Мы заранее фиксируем состояние товара и помогаем разобраться с перевозчиком при подтверждённом повреждении." },
    { q: "Можно ли работать с юрлицами?", a: "Да, условия согласуем индивидуально под задачу." },
  ],

  contactsSubtitle:
    "Оставьте заявку или напишите напрямую. Мы уточним детали, рассчитаем стоимость и предложим понятный маршрут покупки.",
  footerAbout: "Агентские услуги по выкупу товаров из Европы с проверкой и доставкой.",
  footerLinks: "Разделы",
  footerRights: "Все права защищены.",
  formName: "Ваше имя",
  formPhone: "Телефон или Telegram",
  formLink: "Ссылка на товар / описание",
  formDesc: "Комментарии к заказу",
  formSubmit: "Отправить заявку",
  legalName: "ООО «Способ покупки»",
};

const kzText = {
  tagline: "Способ покупки с заботой и надёжностью",
  heroTitle: "Посредническая покупка товаров в России и Европе",
  heroSubtitle:
    "Для граждан Казахстана: найдём и выкупим ваш товар в магазинах и на площадках РФ, включая Avito, Ozon, Wildberries, Drom и другие.",
  ctaPrimary: "Оставить заявку",
  ctaSecondary: "Как это работает",
  ctaTertiary: "FAQ",
  disclaimer:
    "Сроки зависят от маршрута и перевозчиков. Для РФ→КЗ часто 5–12 дней при стандартной доставке.",
  quoteTitle: "Запросить расчёт и сроки",
  privacyNote: "Нажимая на кнопку, вы принимаете условия оферты и политику конфиденциальности.",

  aboutTitle: "Помогаем клиентам из Казахстана покупать без границ",
  aboutSubtitle:
    "Мы выкупаем товары в России и Европе, проверяем продавцов, контролируем оплату и организуем доставку в Казахстан.",
  aboutBlockTitle: "Когда покупать напрямую неудобно — мы берём задачу на себя",
  aboutTexts: [
    "Buy Way помогает клиентам из Казахстана покупать товары в России и Европе, даже если магазин не принимает оплату из Казахстана или продавец не отправляет товар напрямую.",
    "Мы проверяем объявление, продавца, стоимость, условия выкупа и доставки. После покупки можем принять товар на склад, сделать фото/видео-отчёт и только после согласования отправить его дальше.",
    "Такой формат особенно удобен для покупок на Avito, Drom, маркетплейсах, в российских магазинах и у частных продавцов.",
  ],
  aboutStats: [
    { value: "РФ / Европа", label: "основные направления" },
    { value: "5–12 дней", label: "часто по РФ→КЗ" },
    { value: "KZT / RUB", label: "удобная оплата" },
    { value: "Проверка", label: "до отправки клиенту" },
  ],
  trust: [
    { title: "Проверяем продавца", desc: "Смотрим объявление, репутацию, условия сделки и возможные риски." },
    { title: "Фиксируем состояние", desc: "Делаем фото или видео перед отправкой, чтобы клиент понимал, что именно получает." },
    { title: "Сопровождаем доставку", desc: "Помогаем выбрать маршрут, упаковать товар и отследить посылку." },
  ],

  servicesTitle: "Услуги для клиентов из Казахстана",
  servicesSubtitle:
    "Помогаем купить нужный товар в России и Европе, когда оплата, проверка или доставка напрямую вызывают сложности.",
  services: [
    {
      title: "Выкуп в России",
      desc: "Покупаем товары на Avito, Ozon, Wildberries, Drom, в интернет-магазинах и у частных продавцов.",
    },
    {
      title: "Проверка товара",
      desc: "Проверяем продавца, состояние товара, комплектность, документы и при необходимости запрашиваем дополнительные фото или видео.",
    },
    {
      title: "Доставка в Казахстан",
      desc: "Подбираем способ доставки, упаковываем заказ и передаём его перевозчику с отслеживанием.",
    },
  ],
  serviceDetails: [
    { title: "Покупки на маркетплейсах", desc: "Помогаем приобрести товары, которые сложно оплатить или получить напрямую из Казахстана." },
    { title: "Сделки с частными продавцами", desc: "Проверяем продавца и условия, чтобы снизить риск при покупке с рук." },
    { title: "Выкуп автотоваров и запчастей", desc: "Подходит для заказов с Drom, Avito, магазинов запчастей и профильных площадок." },
    { title: "Консолидация покупок", desc: "Можем собрать несколько товаров и отправить одной посылкой, если это удобно и выгодно." },
  ],

  processTitle: "Как мы работаем",
  processFootnote:
    "Предоплата 10–50% для резервирования выкупа. Остаток — после проверки на складе или у партнёра.",
  process: [
    { title: "Заявка и проверка продавца", desc: "Проверим продавца, отзывы и документы. При необходимости — выездная проверка." },
    { title: "Предоплата и выкуп", desc: "Вносим предоплату и оперативно выкупаем товар на маркетплейсе/в магазине РФ." },
    { title: "Приёмка и осмотр", desc: "Доставка на наш склад в РФ или к партнёру: фото/видео-отчёт, согласование." },
    { title: "Остаток и упаковка", desc: "Оплачиваете остаток, усиливаем упаковку и подбираем перевозчика." },
    { title: "Доставка в Казахстан", desc: "Средний срок 5–12 дней для стандартных посылок." },
    { title: "Выдача и поддержка", desc: "Получение в отделении или у курьера. Помогаем по спорным вопросам." },
  ],

  pricingTitle: "Тарифы и услуги",
  pricingNote:
    "Окончательная стоимость зависит от категории товара, веса/объёма и маршрута. Сформируем индивидуальное предложение.",
  pricing: [
    {
      kicker: "Комиссия",
      title: "Агентская услуга от 7%",
      points: ["Поиск и проверка продавца", "Выкуп и контроль оплаты", "Фото/видео отчёт", "Подбор доставки в КЗ"],
    },
    {
      kicker: "Проверка и упаковка",
      title: "Осмотр, усиленная защита",
      points: ["Проверка по чек-листу", "Тестирование при необходимости", "Усиленная упаковка", "Консолидация покупок"],
    },
    {
      kicker: "Логистика",
      title: "Доставка РФ→КЗ",
      points: ["Эконом и экспресс решения", "Ориентировочно 5–12 дней", "Ограничения по правилам перевозчиков", "Поддержка на всём пути"],
    },
  ],

  guaranteeTitle: "Наши гарантии",
  guarantees: [
    { title: "Надёжность", desc: "Работаем по согласованной схеме и фиксируем ключевые этапы сделки." },
    { title: "Безопасная упаковка", desc: "Используем защитные материалы, чтобы товар доехал в хорошем состоянии." },
    { title: "Понятные условия", desc: "До выкупа объясняем стоимость, сроки, ограничения и возможные риски." },
  ],

  faqTitle: "FAQ",
  faq: [
    { q: "С какими площадками работаете?", a: "Avito, Ozon, Wildberries, Drom и другие магазины и площадки." },
    { q: "Как оплачивать из Казахстана?", a: "Принимаем KZT и RUB. Возможны переводы на Kaspi/Halyk и другие варианты по согласованию." },
    { q: "Что с таможней?", a: "Действуют правила перевозчиков и ограничения по категориям товаров. Уточним при расчёте." },
    { q: "Можно ли вернуть?", a: "Да, но условия зависят от продавца, этапа сделки и маршрута доставки." },
  ],

  contactsSubtitle:
    "Напишите нам в Telegram или оставьте заявку. Мы рассчитаем стоимость выкупа, доставки и подскажем оптимальный порядок действий.",
  footerAbout: "Сопровождаем покупки в РФ и Европе для граждан Казахстана: поиск, проверка, выкуп и доставка.",
  footerLinks: "Разделы",
  footerRights: "Все права защищены.",
  formName: "Ваше имя",
  formPhone: "Телефон или Telegram",
  formLink: "Ссылка на товар / описание",
  formDesc: "Комментарии к заказу",
  formSubmit: "Отправить заявку",
  legalName: "ТОО/ИП партнёра",
};
