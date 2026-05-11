export interface BoardAttachment {
  id: number;
  fileName: string;
  downloadUrl: string;
}

export interface BoardComment {
  id: number;
  author: string;
  createdAt: string;
  content: string;
  depth?: number;
}

export interface BoardPost {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
  attachments?: BoardAttachment[];
  comments: BoardComment[];
}

export const BOARD_POSTS: BoardPost[] = [
  {
    id: 1,
    title: "자유 게시판 첫 글입니다",
    author: "부원 아이디",
    createdAt: "2026.04.30",
    content: `게시글 본문 내용입니다.

동아리 게시판 상세 페이지 연결을 먼저 확인할 수 있도록 더미 데이터로 구성해두었습니다.
나중에 API가 붙으면 이 영역은 게시글 상세 응답으로 바꾸면 됩니다.

본문이 길어져도 레이아웃이 유지되는지 같이 보기 위해 줄바꿈도 조금 넣어두었습니다.
감사합니다.`,
    likeCount: 23,
    commentCount: 4,
    attachments: [
      {
        id: 1,
        fileName: "reverse-board-guide.pdf",
        downloadUrl: "https://example.com/reverse-board-guide.pdf",
      },
      {
        id: 2,
        fileName: "reverse-board-template.png",
        downloadUrl: "https://example.com/reverse-board-template.png",
      },
    ],
    comments: [
      {
        id: 101,
        author: "soo840",
        createdAt: "2026.04.30",
        content: "글을 정말 잘 쓰셨네요. Wow....!!",
      },
      {
        id: 102,
        author: "부원 아이디",
        createdAt: "2026.04.30",
        content: "감사합니다 헤헤",
        depth: 1,
      },
      {
        id: 103,
        author: "부원 아이디",
        createdAt: "2026.04.30",
        content: "아니 왜 님이 감사해요",
        depth: 2,
      },
      {
        id: 104,
        author: "부원 아이디",
        createdAt: "2026.04.30",
        content: "더가 더 좋음, 내 글 보러 오셈",
      },
    ],
  },
  {
    id: 2,
    title: "대외활동 정보 공유합니다",
    author: "admin01",
    createdAt: "2026.05.03",
    content: `대외활동 관련 임시 게시글입니다.

게시글 목록에서 클릭했을 때 서로 다른 상세 페이지로 연결되는지 확인하기 위한 더미 글입니다.`,
    likeCount: 11,
    commentCount: 2,
    comments: [
      {
        id: 201,
        author: "member01",
        createdAt: "2026.05.03",
        content: "좋은 정보 감사합니다!",
      },
      {
        id: 202,
        author: "guest01",
        createdAt: "2026.05.04",
        content: "지원 기간도 같이 알려주시면 좋을 것 같아요.",
      },
    ],
  },
];

export const getBoardPostById = (postId: number) =>
  BOARD_POSTS.find((post) => post.id === postId) ?? null;

