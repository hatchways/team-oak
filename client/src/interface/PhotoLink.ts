export interface PhotoLinkSuccess {
  url: string;
}

export interface PhotoLink {
  error?: { message: string };
  success?: PhotoLinkSuccess;
}
