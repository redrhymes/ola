// TODO: SAMPLE CONTENT FROM THE DESIGN. Only genuine reviews that the
// customers have permitted you to publish may be shown. Replace before launch.
export type Review = {
  id: string;
  name: string;
  text: string;
  avatarKey: "avatar-1" | "avatar-2" | "avatar-3";
  reviewUrl?: string;
  source: "google";
};

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Aarav S.",
    text: "Great experience at the showroom. The team explained all the models clearly and helped me choose the right scooter for my needs. Very supportive throughout the process.",
    avatarKey: "avatar-1",
    reviewUrl: "", // TODO: real Google review link.
    source: "google",
  },
  {
    id: "review-2",
    name: "Priya M.",
    text: "Took a test ride at this dealership and had a really good experience. The staff was knowledgeable and patient, and gave detailed answers to all my questions. Highly recommend visiting if you’re planning to go electric.",
    avatarKey: "avatar-2",
    reviewUrl: "", // TODO: real Google review link.
    source: "google",
  },
  {
    id: "review-3",
    name: "Rohit K.",
    text: "Smooth booking process and excellent customer support. The team helped with documentation and made everything easy. Happy with my purchase and the overall experience at the showroom.",
    avatarKey: "avatar-3",
    reviewUrl: "", // TODO: real Google review link.
    source: "google",
  },
];
