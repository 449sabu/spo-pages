interface SiteConfig {
  theme: string | undefined | null;
  footer: {
    title: string;
    data: {
      name: string;
      url: string;
    }[];
  }[];
}
