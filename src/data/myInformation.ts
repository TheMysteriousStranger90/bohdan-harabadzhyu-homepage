export interface Project {
  name: string;
  url: string;
}

export interface InfoItem {
  index: number;
  title: string;
  content: string | Project[];
  logo: string;
}

export const MY_INFORMATION: InfoItem[] = [
  {
    index: 1,
    title: 'ABOUT ME',
    content: 'I am passionate about C# development and focus on creating applications using ASP.NET MVC, .NET Core and Web API. I aspire to combine my passion for programming and technology to create engaging web applications. I am also fond of classical music, fiction literature and English lessons.',
    logo: './smile.svg',
  },
  {
    index: 2,
    title: 'EDUCATION',
    content: '|| First Higher Education - V.O. Sukhomlynskyi Mykolaiv National University (Ethnology. Obtained qualification: Master Degree. 2017) || Second Higher Education - Admiral Makarov National University of Shipbuilding (Computer sciences. Obtained qualification: Bachelor Degree. 2021) ||',
    logo: './book.svg',
  },
  {
    index: 3,
    title: 'SKILLS',
    content: '|| Programming languages: C#, TypeScript, SQL || Frameworks: ASP.NET Core, Entity Framework, Blazor, Angular, Avalonia UI || Database: MSSQL || ',
    logo: './cpu.svg',
  },
  {
    index: 4,
    title: 'PERSONAL PROJECTS',
    content: [
      { name: 'AzioVoiceRecorder', url: 'https://apps.microsoft.com/detail/9PP795T0KSFP' },
      { name: 'AzioSpeech', url: 'https://apps.microsoft.com/detail/9PFV5DG73198' },
      { name: 'AzioWhisperFTP', url: 'https://apps.microsoft.com/detail/9N73GM6JPBXZ' },
      { name: 'AzioEventLogAnalyzer', url: 'https://apps.microsoft.com/detail/9NMBDKF5C8F9' },
      { name: 'AzioSystemTerminal', url: 'https://apps.microsoft.com/detail/9N55212L65GW' },
      { name: 'MusicEmbersFire', url: 'https://youtu.be/8eKxZsZwIU8' },
      { name: 'FashionClothesAndTrends', url: 'https://github.com/TheMysteriousStranger90/FashionClothesAndTrends' },
      { name: 'TheatreProjectMicroservices', url: 'https://github.com/TheMysteriousStranger90/TheatreProjectMicroservices' },
      { name: 'ArtGallery', url: 'https://github.com/TheMysteriousStranger90/ArtGallery' },
      { name: 'CodeForum', url: 'https://github.com/TheMysteriousStranger90/CodeForum' },
      { name: 'TelegramBotForGitHub', url: 'https://github.com/TheMysteriousStranger90/TelegramBotForGitHub' },
      { name: 'TelegramBotForSpotify', url: 'https://github.com/TheMysteriousStranger90/TelegramBotForSpotify' },
      { name: 'MedicalApp', url: 'https://github.com/TheMysteriousStranger90/MedicalApp' },
      { name: 'TheSailOS', url: 'https://github.com/TheMysteriousStranger90/TheSailOS' },
      { name: 'ConsoleWebScraper', url: 'https://github.com/TheMysteriousStranger90/ConsoleWebScraper' },
      { name: 'FileConversionLibrary', url: 'https://www.nuget.org/packages/FileConversionLibrary' },
      { name: 'SaveEditorForPathologic2', url: 'https://www.nexusmods.com/pathologic2/mods/27' },
      { name: 'TheLighthouseWavesPlayer', url: 'https://github.com/walk-away/TheLighthouseWavesPlayer' },
    ],
    logo: './terminal.svg',
  },
];
