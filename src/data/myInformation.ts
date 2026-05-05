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

export const MY_PROJECTS: Project[] = [
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
];
