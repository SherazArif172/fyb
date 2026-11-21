/* Mock data mirrored from the Figma designs. Replace with API calls once the backend exists. */

export type PublishedProject = {
  slug: string;
  title: string;
  summary: string;
  area: string;
  author: string;
  year: number;
  cover: string;
  supervisor: string;
};

export const publishedProjects: PublishedProject[] = [
  {
    slug: "blockchain-degree-verification",
    title: "Blockchain-based Degree Verification",
    summary: "A tamper-proof system for employers to check university degrees on a permissioned chain.",
    area: "Blockchain",
    author: "Ayesha Khan",
    year: 2026,
    cover: "/covers/blockchain.jpg",
    supervisor: "Dr. Farah Naz",
  },
  {
    slug: "dengue-outbreak-forecasting",
    title: "Dengue Outbreak Forecasting",
    summary: "Forecasting weekly dengue cases in Lahore from weather and hospital data.",
    area: "Data Science",
    author: "Hassan Ali",
    year: 2026,
    cover: "/covers/dengue.jpg",
    supervisor: "Dr. Fatima Noor",
  },
  {
    slug: "speech-to-text-punjabi",
    title: "Speech-to-Text for Punjabi",
    summary: "An open speech recognition model trained on 300 hours of Shahmukhi Punjabi.",
    area: "NLP",
    author: "Sara Butt",
    year: 2026,
    cover: "/covers/speech.jpg",
    supervisor: "Dr. Ahmed Raza",
  },
  {
    slug: "fake-news-detection-urdu",
    title: "Fake News Detection in Urdu Media",
    summary: "A labelled Urdu headline dataset and transformer models for fake news detection.",
    area: "Machine Learning",
    author: "Usman Tariq",
    year: 2026,
    cover: "/covers/fake-news.jpg",
    supervisor: "Dr. Imran Shah",
  },
  {
    slug: "wheat-disease-detection",
    title: "Wheat Disease Detection from Leaf Images",
    summary: "A mobile-ready CNN that spots rust and blight from a single leaf photo.",
    area: "Computer Vision",
    author: "Maryam Khalid",
    year: 2026,
    cover: "/covers/wheat.jpg",
    supervisor: "Dr. Fatima Noor",
  },
  {
    slug: "student-dropout-prediction",
    title: "Student Dropout Prediction",
    summary: "Early-warning model for at-risk university students using LMS activity.",
    area: "Machine Learning",
    author: "Bilal Hussain",
    year: 2025,
    cover: "/covers/dropout.jpg",
    supervisor: "Dr. Ahmed Raza",
  },
];

export const researchAreas = [
  { name: "Machine Learning", count: 34 },
  { name: "Computer Vision", count: 26 },
  { name: "NLP", count: 22 },
  { name: "Internet of Things", count: 18 },
  { name: "Data Science", count: 16 },
  { name: "Blockchain", count: 5 },
];

export const getProject = (slug: string) => publishedProjects.find((p) => p.slug === slug);
