export interface Question {
  id: string;
  question: string;
  options: readonly string[];
}

export interface ClientConfig {
  name: string;
  questions: readonly Question[];
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
  couponImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  socialUrls: {
    [key: string]: {
      url: string;
      show: boolean;
    };
  };
  reviewUrls: {
    [key: string]: {
      url: string;
      show: boolean;
    };
  };
  customReviewUrls?: {
    url: string;
    label: string;
  }[];
}
