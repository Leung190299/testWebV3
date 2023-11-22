namespace feedBackModal {
  interface FeedbackParams {
    FullName?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
    Feedback?: string;
  }

  interface response {
    code?: number;
    message?: string;
    request_id?: string;
    totalRecords?: number;
    result?: null;
    extra?: null;
  }
}
