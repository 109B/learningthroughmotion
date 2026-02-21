export type SiteImageDefinition = {
  key: string;
  label: string;
  group: string;
  hint?: string;
  defaultUrl: string;
};

export type SiteImageOverride = {
  key: string;
  imageUrl: string;
  updatedAt: string;
};

export type SiteImageOverridesFile = {
  updatedAt: string;
  version: number;
  overrides: SiteImageOverride[];
};

export const SITE_IMAGE_DEFINITIONS: SiteImageDefinition[] = [
  {
    key: "header_logo_default",
    label: "Header logo (default)",
    group: "Brand",
    hint: "Main logo in top navigation.",
    defaultUrl: "/images/logo.png",
  },
  {
    key: "header_logo_hover",
    label: "Header logo (hover)",
    group: "Brand",
    hint: "Smile icon shown on logo hover.",
    defaultUrl: "/images/smile.png",
  },
  {
    key: "brand_badge_logo",
    label: "Footer builder badge icon",
    group: "Brand",
    hint: "Small circular icon in Built by 1Zero9 badge.",
    defaultUrl: "/images/109-logo-circle1.png",
  },
  {
    key: "home_carousel_fallback_1",
    label: "Home carousel fallback 1",
    group: "Home",
    defaultUrl: "/images/heromain.jpg",
  },
  {
    key: "home_carousel_fallback_2",
    label: "Home carousel fallback 2",
    group: "Home",
    defaultUrl: "/images/heromain.png",
  },
  {
    key: "home_carousel_fallback_3",
    label: "Home carousel fallback 3",
    group: "Home",
    defaultUrl: "/images/comingsoon.png",
  },
  {
    key: "home_gallery_1",
    label: "Home gallery image 1",
    group: "Home",
    hint: "Used as fallback hero image on /our-programmes.",
    defaultUrl:
      "https://files.websitebuilder.prositehosting.co.uk/ae/64/ae646bd3-1933-4338-8a5a-d352aca1f094.jpg",
  },
  {
    key: "home_gallery_2",
    label: "Home gallery image 2",
    group: "Home",
    defaultUrl:
      "https://files.websitebuilder.prositehosting.co.uk/15/e7/15e79d3c-e414-4c25-9be7-30a97047ccf6.jpg",
  },
  {
    key: "home_gallery_3",
    label: "Home gallery image 3",
    group: "Home",
    defaultUrl:
      "https://files.websitebuilder.prositehosting.co.uk/b6/71/b6716c98-d7e1-4d8a-b990-5d64f5dabf48.jpg",
  },
  {
    key: "home_gallery_4",
    label: "Home gallery image 4",
    group: "Home",
    defaultUrl:
      "https://files.websitebuilder.prositehosting.co.uk/da/0d/da0d3491-6e95-449d-b35e-be2b1b7570f3.jpeg",
  },
];
