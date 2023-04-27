type ExtendedMetadata = {
  verification?: string;
  info?: {
    url_png_icon_64x64?: string;
    url_png_logo?: string;
    location?: string;
    social?: {
      twitter_handle?: string;
      telegram_handle?: string;
      facebook_handle?: string;
      youtube_handle?: string;
      twitch_handle?: string;
      discord_handle?: string;
      github_handle?: string;
      patreon_handle?: string;
      linkedin_handle?: string;
      ada_handle?: string;
    };
    company?: {
      name?: string;
      addr?: string;
      city?: string;
      country?: string;
      company_id?: string;
      vat_id?: string;
    };
    about?: {
      me?: string;
      server?: string;
      company?: string;
    };
  };
};
