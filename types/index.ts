export type SocialLink = {
  platform: string;
  url: string;
};

export type TerminalEntry = {
  command: string;
  output: string;
};

export type Personal = {
  name: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  aboutScript: TerminalEntry[];
  socials: SocialLink[];
};

export type Project = {
  name: string;
  description: string;
  link: string;
  stack: string[];
  image?: string;
};

export type ExperienceEntry = {
  position: string;
  company: string;
  start: string;
  end: string;
  description: string;
};

export type TerminalCommand = {
  command: string;
  partial: boolean;
  response: string;
};