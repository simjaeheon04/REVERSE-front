import { axiosInstance } from "./axiosInstance";

export type VoteListItem = {
  voteId: number;
  userId: string;
  title: string;
  deadline: string | null;
  isClosed: boolean;
  optionCount: number;
  totalVoteCount: number;
  createdDate: string;
};

export type VoteListPage = {
  content: VoteListItem[];
  totalPages: number;
  totalElements: number;
  number: number;
};

export type VoteOption = {
  optionId: number;
  optionText: string;
  sortOrder: number;
  voteCount: number;
};

export type VoteDetail = {
  voteId: number;
  userId: string;
  title: string;
  content: string | null;
  deadline: string | null;
  isMultiple: boolean;
  isClosed: boolean;
  createdDate: string;
  modifiedDate: string | null;
  myVotedOptionId: number | null;
  options: VoteOption[];
};

export type VoteCreatePayload = {
  title: string;
  content?: string;
  deadline?: string;
  isMultiple?: boolean;
  options: string[];
};

export type VoteMutationResponse = {
  status: string;
  message: string;
  voteId?: number;
};

export type VoteListParams = {
  page?: number;
  size?: number;
};

export const getVotes = async (
  params: VoteListParams = {}
): Promise<VoteListPage> => {
  const response = await axiosInstance.get<VoteListPage>("/api/votes", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
    },
  });

  return {
    content: Array.isArray(response.data.content) ? response.data.content : [],
    totalPages: response.data.totalPages ?? 0,
    totalElements: response.data.totalElements ?? 0,
    number: response.data.number ?? params.page ?? 0,
  };
};

export const getVoteDetail = async (voteId: number): Promise<VoteDetail> => {
  const response = await axiosInstance.get<VoteDetail>(`/api/votes/${voteId}`);
  return {
    ...response.data,
    content: response.data.content ?? "",
    deadline: response.data.deadline ?? null,
    modifiedDate: response.data.modifiedDate ?? null,
    myVotedOptionId: response.data.myVotedOptionId ?? null,
    options: Array.isArray(response.data.options) ? response.data.options : [],
  };
};

export const createVote = async (
  payload: VoteCreatePayload
): Promise<VoteMutationResponse> => {
  const response = await axiosInstance.post<VoteMutationResponse>(
    "/api/votes",
    payload
  );
  return response.data;
};

export const updateVote = async (
  voteId: number,
  payload: VoteCreatePayload
): Promise<VoteMutationResponse> => {
  const response = await axiosInstance.patch<VoteMutationResponse>(
    `/api/votes/${voteId}`,
    payload
  );
  return response.data;
};

export const deleteVote = async (
  voteId: number
): Promise<VoteMutationResponse> => {
  const response = await axiosInstance.delete<VoteMutationResponse>(
    `/api/votes/${voteId}`
  );
  return response.data;
};

export const submitVote = async (
  voteId: number,
  optionId: number
): Promise<VoteMutationResponse> => {
  const response = await axiosInstance.post<VoteMutationResponse>(
    `/api/votes/${voteId}/vote`,
    { optionId }
  );
  return response.data;
};

export const cancelVote = async (
  voteId: number
): Promise<VoteMutationResponse> => {
  const response = await axiosInstance.delete<VoteMutationResponse>(
    `/api/votes/${voteId}/vote`
  );
  return response.data;
};
