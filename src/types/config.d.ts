interface SiteConfig {
  theme: string | undefined | null;
  blog: {
    title: string;
    description: string;
  };
  footer: {
    title: string;
    data: {
      name: string;
      url: string;
    }[];
  }[];
}
