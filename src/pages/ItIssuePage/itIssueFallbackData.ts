import issueImage from "../../assets/images/project-study.jpg";
import type { ItIssue } from "../../services/itIssueApi";

export const FALLBACK_IT_ISSUES: ItIssue[] = Array.from({ length: 6 }, (_, index) => ({
  id: `fallback_${index + 1}`,
  title: `IT 이슈 ${index + 1}`,
  imageUrl: issueImage,
  sourceUrl: "https://news.google.com/search?q=IT%20technology",
}));
