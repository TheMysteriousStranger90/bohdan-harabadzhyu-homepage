export type Language = 'en' | 'ru';

const translations = {
  en: {
    heroSubtitle: 'Full-Stack .NET Developer',
    reachMe: 'How to reach me ...',
    factsAboutMe: '...a few facts about me...',
    footerRights: 'All rights reserved.',
    infoTitles: {
      aboutMe: 'ABOUT ME',
      education: 'EDUCATION',
      skills: 'SKILLS',
      personalProjects: 'PERSONAL PROJECTS',
    },
    infoContent: {
      aboutMe: "I'm a C# / .NET developer who enjoys turning complex requirements into clean, maintainable solutions. My background spans microservices, REST APIs, web front-ends built with Angular and Blazor, and desktop apps — including several titles published in the Microsoft Store. I'm always looking for opportunities to build something meaningful.",      education: '|| First Higher Education - V.O. Sukhomlynskyi Mykolaiv National University (Ethnology. Obtained qualification: Master Degree. 2017) || Second Higher Education - Admiral Makarov National University of Shipbuilding (Computer sciences. Obtained qualification: Bachelor Degree. 2021) ||',
      skills: '|| Programming languages: C#, TypeScript, SQL || Frameworks: ASP.NET Core, Entity Framework, Blazor, Angular, Avalonia UI || Database: MSSQL ||',
    },
    arts: {
      poems: 'POEMS',
      music: 'MUSIC',
      musicComingSoon: 'The music section is currently under development',
      backToMain: 'Back to main page',
      readOn: 'Read on poeziya.ru',
      listenOn: 'Listen on SoundCloud',
    },
  },
  ru: {
    heroSubtitle: 'Full-Stack .NET Developer',
    reachMe: 'Как связаться со мной ...',
    factsAboutMe: '...несколько фактов обо мне...',
    footerRights: 'Все права защищены.',
    infoTitles: {
      aboutMe: 'ОБО МНЕ',
      education: 'ОБРАЗОВАНИЕ',
      skills: 'НАВЫКИ',
      personalProjects: 'ЛИЧНЫЕ ПРОЕКТЫ',
    },
    infoContent: {
      aboutMe: 'Я C# / .NET разработчик, которому нравится превращать сложные требования в чистые и поддерживаемые решения. Мой опыт охватывает микросервисы, REST API, веб-интерфейсы на Angular и Blazor, а также настольные приложения — включая несколько проектов, опубликованных в Microsoft Store. Я всегда ищу возможности создавать что-то значимое.',      education: '|| Первое высшее образование - Николаевский национальный университет им. В.А. Сухомлинского (Этнология. Квалификация: Магистр. 2017) || Второе высшее образование - Национальный университет кораблестроения им. адмирала Макарова (Компьютерные науки. Квалификация: Бакалавр. 2021) ||',
      skills: '|| Языки программирования: C#, TypeScript, SQL || Фреймворки: ASP.NET Core, Entity Framework, Blazor, Angular, Avalonia UI || База данных: MSSQL ||',
    },
    arts: {
      poems: 'СТИХИ',
      music: 'МУЗЫКА',
      musicComingSoon: 'Раздел с музыкой находится в разработке',
      backToMain: 'Вернуться на главную',
      readOn: 'Читать на poeziya.ru',
      listenOn: 'Слушать на SoundCloud',
    },
  },
} as const;

export default translations;
