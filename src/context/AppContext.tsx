import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'uz' | 'ru' | 'en';
type Theme = 'dark' | 'light';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const translations = {
  uz: {
    // Nav
    'nav.home': 'Uy',
    'nav.branding': 'Brending',
    'nav.projects': 'Loyihalar',
    'nav.contact': 'Aloqa',
    'nav.portal': 'Mijoz',
    'nav.connect': "Hozir bog'lanish",
    
    // Hero Typewriter
    'hero.hello': 'Salom, men',
    'hero.name': 'Yahyobek Tohirjonov',
    'hero.role.1': 'SMM Mutaxassisiman',
    'hero.role.2': 'Grafik Dizaynerman',
    'hero.role.3': 'Web Dasturchiman',
    'hero.role.4': 'Digital Marketerman',

    // Hero
    'hero.badge': 'JUST YAVIZ DIGITAL AGENCY',
    'hero.desc': "Marketing, dizayn va IT orqali biznesingiz uchun samarali yechimlar. Mening ishlash portfoliom bilan tanishing va loyihangizni amalga oshirish uchum men bilan bog'laning.",
    'hero.cta.projects': "Barcha loyihalarni ko'rish",
    'hero.cta.contact': 'Hozir murojaat qiling',
    'hero.card1': 'Biznesingizga mos professional dizayn va aniq boshqaruv — natija kafolatlangan.',
    'hero.card2': 'Sifatli dizayn — bu tasodif emas, tizim.',
    'hero.card3': 'Innovatsion yechimlar va strategik yondashuv orqali natija.',
    
    // Skills
    'skills.badge': 'Yo‘nalishlarim',
    'skills.title': 'Professional Mahorat',
    'skills.smm': 'Digital Marketing & SMM',
    'skills.smm.desc': 'Brendlarni ijtimoiy tarmoqlarda rivojlantirish va auditoriya yig‘ish.',
    'skills.performance': 'Performance Marketing',
    'skills.performance.desc': 'Meta Ads orqali aniq auditoriyaga chiqish va konversiyani oshirish.',
    'skills.content': 'Content Production',
    'skills.content.desc': 'Qisqa videolar va viral kontentlar orqali e’tibor jalb qilish.',
    'skills.design': 'Graphic Design',
    'skills.design.desc': 'Brendning vizual identifikatsiyasini yaratish va kuchaytirish.',
    'skills.personal': 'Brandface & Personal',
    'skills.personal.desc': 'Shaxsiy va brend imidjini kamera oldida shakllantirish.',
    'skills.web': 'Web Development',
    'skills.web.desc': 'Biznes jarayonlarini avtomatlashtiruvchi web tizimlar yaratish.',
    'skills.ecom': 'E-commerce Systems',
    'skills.ecom.desc': 'Online do‘konlar va mukammal sotuv tizimlarini yo‘lga qo‘yish.',
    'skills.strategy': 'Marketing Strategy',
    'skills.strategy.desc': 'Biznesni tahlil qilish va tizimli o‘sishni ta’minlash.',

    // AI Section
    'ai.cta': "Bo'limga o'tish",

    // Workflow
    'workflow.badge': 'Jarayon',
    'workflow.title': "Biznesingizni tizimli ravishda o'stiramiz",
    'flow.1.title': 'Analiz & Tadqiqot',
    'flow.1.desc': "Sizning biznesingiz va raqobatchilaringizni chuqur tahlil qilib, optimal yo'lni aniqlaymiz.",
    'flow.2.title': 'Strategiya Tuzish',
    'flow.2.desc': "Aniq maqsadlar va ularga erishish uchun bosqichma-bosqich marketing rejasini ishlab chiqamiz.",
    'flow.3.title': 'Ijro & Kreativ',
    'flow.3.desc': "Kontent yaratish, reklama sozlash va texnik yechimlarni yuqori sifatda amalga oshiramiz.",
    'flow.4.title': 'Optimallash & Natija',
    'flow.4.desc': "Ko'rsatkichlarni doimiy tahlil qilib, natijani maksimal darajaga olib chiqamiz.",

    // FAQ
    'faq.title': "Ko'p so'raladigan savollar",
    'faq.1.q': "Xizmatlaringiz narxi qancha?",
    'faq.1.a': "Har bir loyiha uning murakkabligi va talablaridan kelib chiqib individual baholanadi. Biz biznesingiz byudjetiga mos va samarali yechimlarni taklif qilamiz.",
    'faq.2.q': "Loyihani yakunlash uchun qancha vaqt ketadi?",
    'faq.2.a': "Bu loyiha turiga bog'liq. Masalan, landing page 1 haftadan 2 haftagacha, to'liq marketing strategiyasi esa 1 oygacha vaqt olishi mumkin.",
    'faq.3.q': "Natijaga kafolat beriladimi?",
    'faq.3.a': "Biz va'da emas, strategiya va ijro sifatiga javob beramiz. Marketingda 100% natija kafolati yo'q, lekin bizda aniq tahlillar va amaliy tajriba natijasi bor.",
    'faq.4.q': "Qanday sohalarda tajribangiz bor?",
    'faq.4.a': "Biz ko'proq xizmat ko'rsatish sohalari, e-commerce, ta'lim va shaxsiy brendlar bilan ishlashda katta tajribaga egamiz.",

    // Footer
    'footer.rights': '© 2026 JUST YAVIZ. BARCHA HUQUQLAR HIMOYA QILINGAN.',
    'footer.privacy': 'Maxfiylik siyosati',
    'footer.terms': 'Foydalanish shartlari',
    
    // Static sections
    'section.projects': 'LOYIHALAR',
    'section.projects.title': 'Bizning so‘nggi ishlarimiz',
    'section.contact.title': 'Keling, birga ishlaymiz',

    // Branding Page
    'branding.hero.title': 'Sifatli dizayn — bu tasodif emas, tizim.',
    'branding.hero.desc': 'Biznesingizga mos professional dizayn va aniq boshqaruv — natija kafolatlangan. Har bir detal ustida tizimli ishlaymiz.',
    'branding.card1.title': 'Marketing Strategiyasi',
    'branding.card1.desc': "Biznesingizni rivojlantirish uchun aniq va natijaga yo'naltirilgan SMM strategiyalarini tuzamiz.",
    'branding.card2.title': 'IT Yechimlar',
    'branding.card2.desc': 'Veb-saytlar, admin panellar va avtomatlashtirilgan tizimlar orqali biznesingizni raqamlashtiramiz.',
    'branding.card3.title': 'Kreativ Kontent',
    'branding.card3.desc': 'Mijozlarni jalb qiluvchi Reels, Shorts va professional grafik dizayn xizmatlarini taqdim etamiz.',
    'branding.logo.title': 'Brendingiz uchun logolar',
    'branding.logo.desc': "Bizning professional mutaxassis dizaynerlarimiz bilan bevosita ishlang. Yangilanishlarni oling, fikr-mulohazalaringizni baham ko'ring va har qachongidan ham tezroq ishga tushiring.",
    'branding.logo.cta': 'Boshlaymiz',
    'branding.why.title': 'Nega biz bilan ishlash kerak?',
    'branding.why.subtitle': "Biznesingiz uchun eng to'g'ri tanlovni qiling.",
    'branding.choosetitle': 'Nega bizni tanlaysiz?',
    'branding.choosedesc': 'Biz har bir loyihaga individual yondashib, uning rivojlanishi uchun barcha zamonaviy marketing va IT vositalarini birlashtiramiz.',
    'branding.items.contracts': 'Shartnomalar',
    'branding.items.conv': 'Konvertatsiyaga qaratilgan',
    'branding.items.fast': 'Tezkor dizayn',

    // Projects Page
    'projects.hero.title': 'Hamkor Kompaniyalar',
    'projects.hero.desc': 'Siz ham brendingizni yuqori darajalarga olib chiqing, biz bunda yordam beramiz!',
    'projects.filter.all': 'Hammasi',
    'projects.filter.infographic': 'Infografik',
    'projects.filter.banner': 'Banner',
    'projects.filter.website': 'Web sayt',
    'projects.filter.crm': 'CRM',
    'projects.filter.youtube': 'YouTube',
    'projects.filter.reels': 'Reels',
    'projects.filter.brandbook': 'Brand book',
    'projects.filter.catalog': 'Catalog',
    'projects.filter.flayer': 'Flayer',
    'projects.empty': 'Yaqinda qo‘shiladi...',
    'projects.modal.close': 'Yopish',
    'projects.detail.back': 'Orqaga',
    'projects.detail.problem': 'Muammo',
    'projects.detail.solution': 'Yechim',
    'projects.detail.result': 'Natija',
    'projects.detail.view_live': 'Jonli ko\'rish',
    'projects.detail.view_video': 'Video ko\'rish',
    'projects.detail.gallery': 'Loyiha Fotogalereyasi',
    'projects.detail.client': 'Mijoz',
    'projects.detail.date': 'Sana',
    'projects.detail.category': 'Kategoriya',
    'projects.detail.similar': 'Shunga o\'xshash buyurtma berish',

    'services.badge': 'Xizmatlar',
    'services.title': 'Professional Paketlar',
    'services.order': 'Buyurtma',
    'services.popular': 'Eng ommabop',
    'services.start_price': 'Boshlang\'ich narx',
    'services.contact_us': 'Savol berish',
    'services.custom_title': 'Individual Yechim',
    'services.custom_desc': 'Sizning biznesingizga moslashtirilgan maxsus marketing va IT paketlar.',

    // Contact Page
    'contact.hero.title': "Har qanday savol tug'iladimi? Biz shu yerdamiz.",
    'contact.hero.desc': 'Savolingiz bormi, yordam kerakmi yoki yangi loyihani boshlashni xohlaysizmi, bizning jamoamiz yordam berish uchun shu yerda.',
    'contact.form.firstname': 'Ism',
    'contact.form.lastname': 'Familiya',
    'contact.form.contactmethod': 'Siz bilan qanday bog‘lanishimiz mumkin?',
    'contact.form.location': 'Siz qayerdansiz?',
    'contact.form.category': 'Sizning kompaniyangiz qanday?',
    'contact.form.message': 'Xabar',
    'contact.form.submit': 'Xabarni yuborish',
    'contact.form.placeholder': 'Xabaringizni yozing...',
    'contact.form.country.select': 'Mamlakatingizni tanlang...',
    'contact.form.country.uz': 'O‘zbekiston',
    'contact.form.country.other': 'Boshqa',
    'contact.form.category.select': 'Kategoriyani tanlang',
    'contact.form.category.marketing': 'Marketing',
    'contact.form.category.website': 'Web sayt',
    'contact.form.category.branding': 'Brending',
    'contact.info.email': 'Email',
        'contact.info.address': 'Manzil',
    'contact.info.address.val': 'Namangan, O‘zbekiston',
    'contact.info.social': 'Ijtimoiy tarmoqlar',

    // AI Page
    'ai.hero.badge': 'AI Ekotizim',
    'ai.hero.title': 'AI Ekotizim',
    'ai.hero.desc': 'Platformamizda siz IT sohasida ishlash, o‘rganish va rivojlanish uchun zarur bo‘lgan 45 ta muhim sayt hamda sun’iy intellekt xizmatlaridan foydalanishingiz mumkin.',
    'ai.download.title': 'Ilovani yuklab olish',
    'ai.download.desc': 'IT va marketing sohasidagi barcha vositalar bir joyda.',
    'ai.download.btn': 'Yuklab olish',

    // Bio Page
    'bio.sidebar.home': 'Asosiy',
    'bio.sidebar.who': 'Kim man?',
    'bio.sidebar.branding': 'dizayn13',
    'bio.sidebar.int': 'Xalqaro',
    'bio.sidebar.coding': 'Dasturlash',
    'bio.sidebar.ai': 'Ai',
    'bio.sidebar.video': 'Video montaj',
    'bio.sidebar.design': 'Dizayn',
    'bio.sidebar.extra': 'Qo\'shimcha',
    'bio.sidebar.company': 'Asosiy kompaniya',
    'bio.title': 'Kim man?',
    'bio.hero.title': 'Marketing, Media va IT sohasida tajriba',
    'bio.hero.desc': 'Men turli sohalarda faoliyat yuritib, marketing, savdo va media yo‘nalishlarida amaliy tajriba orttirganman. Hozirda ijtimoiy tarmoqlar, target reklama, grafik dizayn va web yechimlar orqali bizneslarni rivojlantirish bilan shug‘ullanaman.',
    'bio.cert.title': 'Sertifikatlar',
    'bio.cert.desc': 'O\'qish va rivojlanish davomida olingan xalqaro darajadagi yutuqlar.',
    'bio.exp.title': 'Ish Tajribasi',
    'bio.branding.badge': 'YouTube & Branding',
    'bio.branding.title': 'Just Yaviz Digital Brand',
    'bio.branding.desc': 'Just Yaviz — bu mening shaxsiy digital brendim bo‘lib, unda kreativ kontent, marketing yondashuvlar va zamonaviy vizual uslub orqali auditoriya bilan aloqa o‘rnataman. YouTube platformasida texnologiya, marketing va reklama roliklari orqali sifatli storytelling taqdim etaman.',
    'bio.branding.f1': 'Storytelling',
    'bio.branding.f2': 'Video Montaj',
    'bio.branding.f3': 'Auditoriya',
    'bio.branding.f4': 'Targeting',
    'bio.branding.card1.t': 'Auditoriya bilan ishlash',
    'bio.branding.card1.d': 'Mijoz va tomoshabin orasidagi ko\'prik.',
    'bio.branding.card2.t': 'Kontent strategiya',
    'bio.branding.card2.d': 'Viral va sotuvga yo‘naltirilgan rejalar.',
    'bio.branding.card3.t': 'Video Storytelling',
    'bio.branding.card3.d': 'Mahsulotni sinash va qiziqarli taqdim etish.',
    'bio.branding.card4.t': 'Brend bilan hamkorlik',
    'bio.branding.card4.d': 'Yirik kompaniyalar bilan ishlash tajribasi.',
    
    // Home sections
    'section.process': 'Ishlash tizimi',
    'section.about': 'Tanishuv',
    'testimonials.title': 'Mijozlarimizdan',
    'testimonials.subtitle': 'Muvaffaqiyat tarixi',
    'testimonials.t1.name': 'Asilbek K.',
    'testimonials.t1.role': 'E-commerce egasi',
    'testimonials.t1.text': "Marketing strategiyasi bo'yicha hamkorlikdan solingan investitsiya 3 barovar ko'proq foyda keltirdi. Professional yondashuv!",
    'testimonials.t2.name': 'Malika R.',
    'testimonials.t2.role': 'Kiyim-kechak brendi',
    'testimonials.t2.text': "SMM upakovka va videolar sahifamiz ko'rinishini butunlay o'zgartirdi. Mijozlar soni sezilarli darajada oshdi.",
    'testimonials.t3.name': 'Jasur O.',
    'testimonials.t3.role': 'Biznes maslahatchi',
    'testimonials.t3.text': "IT va Web yechimlar bo'yicha juda tez va sifatli ishlandi. Admin panel tizimi ishimizni sezilarli darajada osonlashtirdi.",
    'stats.projects': 'Muvaffaqiyatli loyihalar',
    'stats.clients': 'Mamnun mijozlar',
    'stats.campaigns': 'Target kempaynlar',
    'stats.web': 'Web yechimlar',
    'about.badge': 'Tanishuv',
    'about.p2': 'Faoliyatini ta’lim sohasida boshlagan va keyinchalik marketing, savdo va media yo‘nalishlariga o‘tgan. Hozirda marketing va IT sohalarini birlashtirib, bizneslar uchun innovatsion va samarali yechimlar yaratishga intiladi. Asosiy maqsadi — xalqaro darajada rivojlanish va o‘z marketing agentligini yaratishdir.',
    'about.cta1': 'Hamkorlik qilish',
    'about.cta2': "Bog'lanish",
  },
  ru: {
    // Nav
    'nav.home': 'Главная',
    'nav.branding': 'Брендинг',
    'nav.projects': 'Проекты',
    'nav.contact': 'Контакты',
    'nav.portal': 'Клиент',
    'nav.connect': 'Связаться сейчас',

    // Hero Typewriter
    'hero.hello': 'Привет, я',
    'hero.name': 'Яхёбек Тохиржонов',
    'hero.role.1': 'SMM-Специалист',
    'hero.role.2': 'Графический Дизайнер',
    'hero.role.3': 'Веб-Разработчик',
    'hero.role.4': 'Digital Маркетолог',
    
    // Hero
    'hero.badge': 'DIGITAL-АГЕНТСТВО JUST YAVIZ',
    'hero.desc': 'Эффективные решения для вашего бизнеса через маркетинг, дизайн и IT. Ознакомьтесь с моим портфолио и свяжитесь со мной для реализации вашего проекта.',
    'hero.cta.projects': 'Смотреть все проекты',
    'hero.cta.contact': 'Связаться сейчас',
    'hero.card1': 'Профессиональный дизайн и четкое управление для вашего бизнеса — результат гарантирован.',
    'hero.card2': 'Качественный дизайн — это не случайность, а система.',
    'hero.card3': 'Результат через инновационные решения и стратегический подход.',

    // Skills
    'skills.badge': 'Направления',
    'skills.title': 'Профессиональные Навыки',
    'skills.smm': 'Digital Marketing & SMM',
    'skills.smm.desc': 'Развитие брендов в социальных сетях и сбор аудитории.',
    'skills.performance': 'Performance Marketing',
    'skills.performance.desc': 'Выход на точную аудиторию через Meta Ads и повышение конверсии.',
    'skills.content': 'Content Production',
    'skills.content.desc': 'Привлечение внимания через короткие видео и виральный контент.',
    'skills.design': 'Graphic Design',
    'skills.design.desc': 'Создание и усиление визуальной идентификации бренда.',
    'skills.personal': 'Brandface & Personal',
    'skills.personal.desc': 'Формирование личного и брендового имиджа перед камерой.',
    'skills.web': 'Web Development',
    'skills.web.desc': 'Создание веб-систем для автоматизации бизнес-процессов.',
    'skills.ecom': 'E-commerce Systems',
    'skills.ecom.desc': 'Запуск онлайн-магазинов и совершенных систем продаж.',
    'skills.strategy': 'Marketing Strategy',
    'skills.strategy.desc': 'Анализ бизнеса и обеспечение системного роста.',

    // AI Section
    'ai.cta': "Перейти в раздел",

    // Workflow
    'workflow.badge': 'Процесс',
    'workflow.title': "Развиваем ваш бизнес системно",
    'flow.1.title': 'Анализ и Исследование',
    'flow.1.desc': "Мы глубоко анализируем ваш бизнес и конкурентов, определяя оптимальный путь.",
    'flow.2.title': 'Разработка Стратегии',
    'flow.2.desc': "Мы разрабатываем пошаговый маркетинговый план для достижения четких целей.",
    'flow.3.title': 'Исполнение и Креатив',
    'flow.3.desc': "Мы создаем контент, настраиваем рекламу и внедряем технические решения высокого качества.",
    'flow.4.title': 'Оптимизация и Результат',
    'flow.4.desc': "Мы постоянно анализируем показатели и доводим результат до максимума.",

    // FAQ
    'faq.title': "Часто задаваемые вопросы",
    'faq.1.q': "Сколько стоят ваши услуги?",
    'faq.1.a': "Каждый проект оценивается индивидуально в зависимости от его сложности и требований. Мы предлагаем решения, соответствующие вашему бюджету.",
    'faq.2.q': "Сколько времени занимает проект?",
    'faq.2.a': "Это зависит от типа проекта. Например, лендинг занимает от 1 до 2 недель, полная стратегия — до 1 месяца.",
    'faq.3.q': "Дается ли гарантия на результат?",
    'faq.3.a': "Мы отвечаем за качество стратегии и исполнения. В маркетинге нет 100% гарантии, но у нас есть четкий анализ и практический опыт.",
    'faq.4.q': "В каких сферах у вас есть опыт?",
    'faq.4.a': "У нас большой опыт работы в сфере услуг, электронной коммерции, образования и личных брендов.",
    
    // Footer
    'footer.rights': '© 2026 JUST YAVIZ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    
    // Static sections
    'section.projects': 'ПРОЕКТЫ',
    'section.projects.title': 'Наши последние работы',
    'section.contact.title': 'Давайте работать вместе',

    // Branding Page
    'branding.hero.title': 'Качественный дизайн — это не случайность, а система.',
    'branding.hero.desc': 'Профессиональный дизайн и четкое управление, подходящие для вашего бизнеса — результат гарантирован. Мы работаем планомерно над каждой деталью.',
    'branding.card1.title': 'Маркетинговая стратегия',
    'branding.card1.desc': 'Мы создаем точные и ориентированные на результат SMM-стратегии для развития вашего бизнеса.',
    'branding.card2.title': 'IT-Решения',
    'branding.card2.desc': 'Мы цифровизируем ваш бизнес с помощью веб-сайтов, админ-панелей и автоматизированных систем.',
    'branding.card3.title': 'Креативный контент',
    'branding.card3.desc': 'Предоставляем услуги Reels, Shorts и профессионального графического дизайна, привлекающие клиентов.',
    'branding.logo.title': 'Логотипы для вашего бренда',
    'branding.logo.desc': 'Работайте напрямую с нашими профессиональными дизайнерами. Получайте обновления, делитесь отзывами и запускайте проект быстрее, чем когда-либо.',
    'branding.logo.cta': 'Начать',
    'branding.why.title': 'Почему работать с нами?',
    'branding.why.subtitle': 'Сделайте правильный выбор для своего бизнеса.',
    'branding.choosetitle': 'Почему выбирают нас?',
    'branding.choosedesc': 'Мы подходим к каждому проекту индивидуально, объединяя все современные маркетинговые и IT-инструменты для его развития.',
    'branding.items.contracts': 'Контракты',
    'branding.items.conv': 'Ориентирован на конверсию',
    'branding.items.fast': 'Быстрый дизайн',

    // Projects Page
    'projects.hero.title': 'Компании-партнеры',
    'projects.hero.desc': 'Поднимите свой бренд на новые высоты, мы поможем вам в этом!',
    'projects.filter.all': 'Все',
    'projects.filter.infographic': 'Инфографика',
    'projects.filter.banner': 'Banner',
    'projects.filter.website': 'Веб-сайт',
    'projects.filter.crm': 'CRM',
    'projects.filter.youtube': 'YouTube',
    'projects.filter.reels': 'Reels',
    'projects.filter.brandbook': 'Бренд-бук',
    'projects.filter.catalog': 'Каталог',
    'projects.filter.flayer': 'Флаер',
    'projects.empty': 'Будет добавлено скоро...',
    'projects.modal.close': 'Закрыть',
    'projects.detail.back': 'Назад',
    'projects.detail.problem': 'Проблема',
    'projects.detail.solution': 'Решение',
    'projects.detail.result': 'Результат',
    'projects.detail.view_live': 'Смотреть вживую',
    'projects.detail.view_video': 'Смотреть видео',
    'projects.detail.gallery': 'Фотогалерея проекта',
    'projects.detail.client': 'Клиент',
    'projects.detail.date': 'Дата',
    'projects.detail.category': 'Категория',
    'projects.detail.similar': 'Заказать подобный проект',

    'services.badge': 'Услуги',
    'services.title': 'Профессиональные Пакеты',
    'services.order': 'Заказать',
    'services.popular': 'Самый популярный',
    'services.start_price': 'Начальная цена',
    'services.contact_us': 'Задать вопрос',
    'services.custom_title': 'Индивидуальное Решение',
    'services.custom_desc': 'Специальные пакеты маркетинга и ИТ, адаптированные под ваш бизнес.',

    // Contact Page
    'contact.hero.title': 'Есть вопросы? Мы здесь, чтобы помочь.',
    'contact.hero.desc': 'У вас есть вопрос, нужна помощь или вы хотите начать новый проект? Наша команда готова помочь вам.',
    'contact.form.firstname': 'Имя',
    'contact.form.lastname': 'Фамилия',
    'contact.form.contactmethod': 'Как мы можем с вами связаться?',
    'contact.form.location': 'Откуда вы?',
    'contact.form.category': 'Какова специализация вашей компании?',
    'contact.form.message': 'Сообщение',
    'contact.form.submit': 'Отправить сообщение',
    'contact.form.placeholder': 'Напишите ваше сообщение...',
    'contact.form.country.select': 'Выберите вашу страну...',
    'contact.form.country.uz': 'Узбекистан',
    'contact.form.country.other': 'Другое',
    'contact.form.category.select': 'Выберите категорию',
    'contact.form.category.marketing': 'Маркетинг',
    'contact.form.category.website': 'Веб-сайт',
    'contact.form.category.branding': 'Брендинг',
    'contact.info.email': 'Электронная почта',
    'contact.info.phone': 'Телефон',
    'contact.info.address': 'Адрес',
    'contact.info.address.val': 'Наманган, Узбекистан',
    'contact.info.social': 'Социальные сети',

    // AI Page
    'ai.hero.badge': 'AI Экосистема',
    'ai.hero.title': 'AI Экосистема',
    'ai.hero.desc': 'На нашей платформе вы можете использовать 45 важных сайтов и сервисов искусственного интеллекта, необходимых для работы, обучения и развития в сфере IT.',
    'ai.download.title': 'Скачать приложение',
    'ai.download.desc': 'Все инструменты в сфере IT и маркетинга в одном месте.',
    'ai.download.btn': 'Скачать',

    // Bio Page
    'bio.sidebar.home': 'Главная',
    'bio.sidebar.who': 'Кто я?',
    'bio.sidebar.branding': 'dizayn13',
    'bio.sidebar.int': 'Международный',
    'bio.sidebar.coding': 'Программирование',
    'bio.sidebar.ai': 'Ai',
    'bio.sidebar.video': 'Видео монтаж',
    'bio.sidebar.design': 'Дизайн',
    'bio.sidebar.extra': 'Дополнительно',
    'bio.sidebar.company': 'Основатель компании',
    'bio.title': 'Кто я?',
    'bio.hero.title': 'Опыт в маркетинге, медиа и IT',
    'bio.hero.desc': 'Работая в различных областях, я приобрел практический опыт в маркетинге, продажах и медиа. В настоящее время я занимаюсь развитием бизнеса через социальные сети, таргетированную рекламу, графический дизайн и веб-решения.',
    'bio.cert.title': 'Сертификаты',
    'bio.cert.desc': 'Международные достижения, полученные в процессе обучения и развития.',
    'bio.exp.title': 'Опыт Работы',
    'bio.branding.badge': 'YouTube & Брендинг',
    'bio.branding.title': 'Цифровой бренд Just Yaviz',
    'bio.branding.desc': 'Just Yaviz — это мой личный цифровой бренд, через который я общаюсь с аудиторией с помощью креативного контента, маркетинговых подходов и современного визуального стиля. На платформе YouTube я представляю качественный сторителлинг через ролики о технологиях, маркетинге и рекламе.',
    'bio.branding.f1': 'Сторителлинг',
    'bio.branding.f2': 'Видео монтаж',
    'bio.branding.f3': 'Аудитория',
    'bio.branding.f4': 'Таргетинг',
    'bio.branding.card1.t': 'Работа с аудиторией',
    'bio.branding.card1.d': 'Мост между клиентом и зрителем.',
    'bio.branding.card2.t': 'Контент-стратегия',
    'bio.branding.card2.d': 'Виральные и ориентированные на продажи планы.',
    'bio.branding.card3.t': 'Видео сторителлинг',
    'bio.branding.card3.d': 'Тестирование продукта и интересная презентация.',
    'bio.branding.card4.t': 'Сотрудничество с брендом',
    'bio.branding.card4.d': 'Опыт работы с крупными компаниями.',

    // Home sections
    'section.process': 'Система работы',
    'section.about': 'Знакомство',
    'testimonials.title': 'От наших клиентов',
    'testimonials.subtitle': 'Истории успеха',
    'testimonials.t1.name': 'Асилбек К.',
    'testimonials.t1.role': 'Владелец E-commerce',
    'testimonials.t1.text': 'Инвестиции в сотрудничество по маркетинговой стратегии принесли в 3 раза больше прибыли. Профессиональный подход!',
    'testimonials.t2.name': 'Малика Р.',
    'testimonials.t2.role': 'Бренд одежды',
    'testimonials.t2.text': 'SMM-упаковка и видео полностью изменили внешний вид нашей страницы. Количество клиентов значительно увеличилось.',
    'testimonials.t3.name': 'Жасур О.',
    'testimonials.t3.role': 'Бизнес-консультант',
    'testimonials.t3.text': 'Работа над ИТ и веб-решениями была выполнена очень быстро и качественно. Система админ-панели значительно облегчила нашу работу.',
    'stats.projects': 'Успешные проекты',
    'stats.clients': 'Довольные клиенты',
    'stats.campaigns': 'Таргет-кампании',
    'stats.web': 'Веб-решения',
    'about.badge': 'Знакомство',
    'about.p2': 'Начал свою деятельность в сфере образования, а позже перешел в сферу маркетинга, продаж и медиа. В настоящее время он стремится объединить сферы маркетинга и ИТ для создания инновационных и эффективных решений для бизнеса. Основная цель — развиваться на международном уровне и создать собственное маркетинговое агентство.',
    'about.cta1': 'Сотрудничать',
    'about.cta2': 'Связаться',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.branding': 'Branding',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.portal': 'Client',
    'nav.connect': 'Connect Now',

    // Hero Typewriter
    'hero.hello': 'Hello, I am',
    'hero.name': 'Yahyobek Tohirjonov',
    'hero.role.1': 'SMM Specialist',
    'hero.role.2': 'Graphic Designer',
    'hero.role.3': 'Web Developer',
    'hero.role.4': 'Digital Marketer',
    
    // Hero
    'hero.badge': 'JUST YAVIZ DIGITAL AGENCY',
    'hero.desc': 'Effective solutions for your business through marketing, design, and IT. Explore my portfolio of work and get in touch to bring your project to life.',
    'hero.cta.projects': 'View all projects',
    'hero.cta.contact': 'Contact now',
    'hero.card1': 'Professional design and clear management for your business — result guaranteed.',
    'hero.card2': 'Quality design is not an accident, it is a system.',
    'hero.card3': 'Result through innovative solutions and strategic approach.',

    // Skills
    'skills.badge': 'My Directions',
    'skills.title': 'Professional Skills',
    'skills.smm': 'Digital Marketing & SMM',
    'skills.smm.desc': 'Brand development in social networks and audience building.',
    'skills.performance': 'Performance Marketing',
    'skills.performance.desc': 'Meta Ads targeting and conversion optimization.',
    'skills.content': 'Content Production',
    'skills.content.desc': 'Attention attraction through short videos and viral content.',
    'skills.design': 'Graphic Design',
    'skills.design.desc': 'Creation and enforcement of brand visual identity.',
    'skills.personal': 'Brandface & Personal',
    'skills.personal.desc': 'Forming personal and brand image in front of the camera.',
    'skills.web': 'Web Development',
    'skills.web.desc': 'Building web systems for business process automation.',
    'skills.ecom': 'E-commerce Systems',
    'skills.ecom.desc': 'Launching online stores and perfect sales systems.',
    'skills.strategy': 'Marketing Strategy',
    'skills.strategy.desc': 'Business analysis and ensuring systematic growth.',

    // AI Section
    'ai.cta': "Go to section",

    // Workflow
    'workflow.badge': 'Workflow',
    'workflow.title': "We grow your business systematically",
    'flow.1.title': 'Analysis & Research',
    'flow.1.desc': "We identify the optimal path by deeply analyzing your business and competitors.",
    'flow.2.title': 'Strategy Building',
    'flow.2.desc': "We develop a step-by-step marketing plan to achieve clear goals.",
    'flow.3.title': 'Execution & Creative',
    'flow.3.desc': "We implement content creation, ad setup, and technical solutions with high quality.",
    'flow.4.title': 'Optimization & Result',
    'flow.4.desc': "We constantly analyze indicators and maximize the result.",

    // FAQ
    'faq.title': "Frequently Asked Questions",
    'faq.1.q': "How much do your services cost?",
    'faq.1.a': "Each project is evaluated individually based on complexity. We offer efficient solutions that fit your budget.",
    'faq.2.q': "How long does a project take?",
    'faq.2.a': "It depends on the type. For example, a landing page takes 1-2 weeks, a full strategy up to 1 month.",
    'faq.3.q': "Is there a guarantee for the result?",
    'faq.3.a': "We guarantee the quality of strategy and execution. Marketing has no 100% guarantee, but we have data and experience.",
    'faq.4.q': "What industries do you have experience in?",
    'faq.4.a': "We have extensive experience in services, e-commerce, education, and personal brands.",
    
    // Footer
    'footer.rights': '© 2026 JUST YAVIZ. ALL RIGHTS RESERVED.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Static sections
    'section.projects': 'PROJECTS',
    'section.projects.title': 'Our latest works',
    'section.contact.title': "Let's work together",

    // Branding Page
    'branding.hero.title': 'Quality design is not an accident, it is a system.',
    'branding.hero.desc': 'Professional design and clear management suitable for your business — result guaranteed. We work systematically on every detail.',
    'branding.card1.title': 'Marketing Strategy',
    'branding.card1.desc': 'We create precise and result-oriented SMM strategies to grow your business.',
    'branding.card2.title': 'IT Solutions',
    'branding.card2.desc': 'We digitize your business through websites, admin panels and automated systems.',
    'branding.card3.title': 'Creative Content',
    'branding.card3.desc': 'We provide Reels, Shorts and professional graphic design services that attract customers.',
    'branding.logo.title': 'Logos for your brand',
    'branding.logo.desc': 'Work directly with our professional designers. Get updates, share feedback and launch faster than ever.',
    'branding.logo.cta': 'Get Started',
    'branding.why.title': 'Why work with us?',
    'branding.why.subtitle': 'Make the right choice for your business.',
    'branding.choosetitle': 'Why choose us?',
    'branding.choosedesc': 'We approach each project individually, combining all modern marketing and IT tools for its development.',
    'branding.items.contracts': 'Contracts',
    'branding.items.conv': 'Conversion focused',
    'branding.items.fast': 'Fast design',

    // Projects Page
    'projects.hero.title': 'Partner Companies',
    'projects.hero.desc': 'Take your brand to new heights, we will help you with that!',
    'projects.filter.all': 'All',
    'projects.filter.infographic': 'Infographic',
    'projects.filter.banner': 'Banner',
    'projects.filter.website': 'Web site',
    'projects.filter.crm': 'CRM',
    'projects.filter.youtube': 'YouTube',
    'projects.filter.reels': 'Reels',
    'projects.filter.brandbook': 'Brand book',
    'projects.filter.catalog': 'Catalog',
    'projects.filter.flayer': 'Flayer',
    'projects.empty': 'Coming soon...',
    'projects.modal.close': 'Close',
    'projects.detail.back': 'Back',
    'projects.detail.problem': 'Problem',
    'projects.detail.solution': 'Solution',
    'projects.detail.result': 'Result',
    'projects.detail.view_live': 'View Live',
    'projects.detail.view_video': 'View Video',
    'projects.detail.gallery': 'Project Gallery',
    'projects.detail.client': 'Client',
    'projects.detail.date': 'Date',
    'projects.detail.category': 'Category',
    'projects.detail.similar': 'Order similar project',

    'services.badge': 'Services',
    'services.title': 'Professional Packages',
    'services.order': 'Order Now',
    'services.popular': 'Most Popular',
    'services.start_price': 'Starting at',
    'services.contact_us': 'Ask a Question',
    'services.custom_title': 'Custom Solution',
    'services.custom_desc': 'Bespoke marketing and IT packages tailored specifically to your business needs.',

    // Contact Page
    'contact.hero.title': 'Have any questions? We are here to help.',
    'contact.hero.desc': 'Whether you have a question, need help or want to start a new project, our team is here to assist you.',
    'contact.form.firstname': 'First Name',
    'contact.form.lastname': 'Last Name',
    'contact.form.contactmethod': 'How can we reach you?',
    'contact.form.location': 'Where are you from?',
    'contact.form.category': 'What is your company category?',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.placeholder': 'Write your message...',
    'contact.form.country.select': 'Select your country...',
    'contact.form.country.uz': 'Uzbekistan',
    'contact.form.country.other': 'Other',
    'contact.form.category.select': 'Select Category',
    'contact.form.category.marketing': 'Marketing',
    'contact.form.category.website': 'Web site',
    'contact.form.category.branding': 'Branding',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.address': 'Address',
    'contact.info.address.val': 'Namangan, Uzbekistan',
    'contact.info.social': 'Social Media',

    // AI Page
    'ai.hero.badge': 'AI Ecosystem',
    'ai.hero.title': 'AI Ecosystem',
    'ai.hero.desc': 'On our platform, you can use 45 essential sites and AI services necessary for working, learning, and developing in the IT field.',
    'ai.download.title': 'Download Application',
    'ai.download.desc': 'All tools in the IT and marketing field in one place.',
    'ai.download.btn': 'Download',

    // Bio Page
    'bio.sidebar.home': 'Home',
    'bio.sidebar.who': 'Who am I?',
    'bio.sidebar.branding': 'dizayn13',
    'bio.sidebar.int': 'International',
    'bio.sidebar.coding': 'Coding',
    'bio.sidebar.ai': 'Ai',
    'bio.sidebar.video': 'Video editing',
    'bio.sidebar.design': 'Design',
    'bio.sidebar.extra': 'Extra',
    'bio.sidebar.company': 'Main Company',
    'bio.title': 'Who am I?',
    'bio.hero.title': 'Experience in Marketing, Media and IT',
    'bio.hero.desc': 'Working in various fields, I have gained practical experience in marketing, sales and media. Currently, I am busy developing businesses through social networks, target advertising, graphic design and web solutions.',
    'bio.cert.title': 'Certificates',
    'bio.cert.desc': 'International achievements gained during study and development.',
    'bio.exp.title': 'Work Experience',
    'bio.branding.badge': 'YouTube & Branding',
    'bio.branding.title': 'Just Yaviz Digital Brand',
    'bio.branding.desc': 'Just Yaviz is my personal digital brand where I communicate with the audience through creative content, marketing approaches and modern visual style. On the YouTube platform, I present high-quality storytelling through tech, marketing and advertising videos.',
    'bio.branding.f1': 'Storytelling',
    'bio.branding.f2': 'Video Editing',
    'bio.branding.f3': 'Audience',
    'bio.branding.f4': 'Targeting',
    'bio.branding.card1.t': 'Working with Audience',
    'bio.branding.card1.d': 'Bridge between client and viewer.',
    'bio.branding.card2.t': 'Content Strategy',
    'bio.branding.card2.d': 'Viral and sales-oriented plans.',
    'bio.branding.card3.t': 'Video Storytelling',
    'bio.branding.card3.d': 'Product testing and interesting presentation.',
    'bio.branding.card4.t': 'Brand Collaboration',
    'bio.branding.card4.d': 'Experience working with large companies.',

    // Home sections
    'section.process': 'Working System',
    'section.about': 'About',
    'testimonials.title': 'From Our Clients',
    'testimonials.subtitle': 'Success Stories',
    'testimonials.t1.name': 'Asilbek K.',
    'testimonials.t1.role': 'E-commerce owner',
    'testimonials.t1.text': 'Collaboration on marketing strategy resulted in 3 times more profit from the investment. Professional approach!',
    'testimonials.t2.name': 'Malika R.',
    'testimonials.t2.role': 'Clothing brand',
    'testimonials.t2.text': 'SMM packaging and videos completely changed the look of our page. The number of customers increased significantly.',
    'testimonials.t3.name': 'Jasur O.',
    'testimonials.t3.role': 'Business consultant',
    'testimonials.t3.text': 'IT and Web solutions were developed very quickly and efficiently. The admin panel system has significantly simplified our work.',
    'stats.projects': 'Successful projects',
    'stats.clients': 'Happy clients',
    'stats.campaigns': 'Target campaigns',
    'stats.web': 'Web solutions',
    'about.badge': 'About',
    'about.p2': 'Started his career in the field of education and later moved into marketing, sales, and media. Currently, he aims to combine the fields of marketing and IT to create innovative and effective solutions for businesses. The main goal is to develop internationally and create his own marketing agency.',
    'about.cta1': 'Collaborate',
    'about.cta2': 'Contact',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>((localStorage.getItem('app_lang') as Language) || 'uz');
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('app_theme') as Theme) || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = (key: string) => {
    return (translations[lang] as any)[key] || key;
  };

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
