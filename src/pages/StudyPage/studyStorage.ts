import { STUDY_POSTS, type StudyPost } from "./studyDummyData";

const STORAGE_KEY = "reverse-study-posts";

const readCreatedStudies = (): StudyPost[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? (parsedValue as StudyPost[]) : [];
  } catch {
    return [];
  }
};

const writeCreatedStudies = (studies: StudyPost[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
};

export const getAllStudyPosts = (): StudyPost[] => {
  return [...readCreatedStudies(), ...STUDY_POSTS];
};

export const createStudyPost = (study: StudyPost) => {
  const createdStudies = readCreatedStudies();
  writeCreatedStudies([study, ...createdStudies]);
};
