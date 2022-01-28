export interface StripeLinkSuccess {
  accountLink: {
    object: string;
    created: string;
    expires_at: string;
    url: string;
  };
}

export interface StripeLink {
  error?: { message: string };
  success?: StripeLinkSuccess;
}
