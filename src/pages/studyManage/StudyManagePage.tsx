import { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  createStudyPost,
  createStudyRecruitment,
  deleteStudyPost,
  deleteStudyRecruitment,
  forceEndStudy,
  kickStudyMember,
  updateStudyMemberStatus,
  updateStudyPost,
  type StudyMemberStatusPayload,
} from "../../services/studyApi";
import {
  deleteCreatedStudyPost,
  getCreatedStudyPosts,
} from "../StudyPage/studyStorage";
import type { StudyPost } from "../StudyPage/studyDummyData";
import * as S from "../clubIntroManage/ClubIntroManagePage.styles";

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      if (typeof record.message === "string" && record.message.trim()) {
        return record.message;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const toJsonText = (value: unknown) => JSON.stringify(value ?? null, null, 2);

export default function StudyManagePage() {
  const [studyTitle, setStudyTitle] = useState("");
  const [studyContent, setStudyContent] = useState("");
  const [maxMembers, setMaxMembers] = useState("5");
  const [studyId, setStudyId] = useState("");
  const [forceReason, setForceReason] = useState("");

  const [postStudyId, setPostStudyId] = useState("");
  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postFiles, setPostFiles] = useState<File[]>([]);

  const [memberStudyId, setMemberStudyId] = useState("");
  const [memberUserId, setMemberUserId] = useState("");
  const [memberStatus, setMemberStatus] =
    useState<StudyMemberStatusPayload["status"]>("approved");
  const [kickMemberId, setKickMemberId] = useState("");
  const [kickReason, setKickReason] = useState("");
  const [createdStudies, setCreatedStudies] = useState<StudyPost[]>(() =>
    getCreatedStudyPosts()
  );

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<unknown>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshCreatedStudies = () => {
    setCreatedStudies(getCreatedStudyPosts());
  };

  const runAction = async (successMessage: string, action: () => Promise<unknown>) => {
    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await action();

      setResponse(result ?? { status: "success" });
      setMessage(successMessage);
    } catch (error) {
      setResponse(null);
      setMessage(getApiErrorMessage(error, "요청 처리에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateStudy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studyTitle.trim() || !studyContent.trim()) {
      setMessage("스터디명과 내용을 입력해 주세요.");
      return;
    }

    void runAction("스터디 모집이 생성되었습니다.", () =>
      createStudyRecruitment({
        title: studyTitle.trim(),
        content: studyContent.trim(),
        maxMembers: Number(maxMembers) || 5,
      })
    );
  };

  const handleDeleteStudy = async () => {
    if (!studyId.trim()) {
      setMessage("스터디 ID를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      const result = await deleteStudyRecruitment(studyId.trim());
      const removedLocalStudy = deleteCreatedStudyPost(studyId.trim());

      refreshCreatedStudies();
      setResponse(result ?? { status: "success", removedLocalStudy });
      setMessage("스터디 모집이 삭제되었습니다.");
    } catch (error) {
      const removedLocalStudy = deleteCreatedStudyPost(studyId.trim());

      if (removedLocalStudy) {
        refreshCreatedStudies();
        setResponse({ removedLocalStudy: true });
        setMessage("임시 작성 스터디는 삭제했습니다. 서버 삭제는 실패했습니다.");
        return;
      }

      setResponse(null);
      setMessage(getApiErrorMessage(error, "스터디 모집 삭제에 실패했습니다."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForceEndStudy = () => {
    if (!studyId.trim()) {
      setMessage("스터디 ID를 입력해 주세요.");
      return;
    }

    void runAction("스터디가 강제 종료되었습니다.", () =>
      forceEndStudy(studyId.trim(), { reason: forceReason.trim() || undefined })
    );
  };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostFiles(Array.from(event.target.files ?? []));
  };

  const handleCreatePost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!postStudyId.trim() || !postTitle.trim() || !postContent.trim()) {
      setMessage("스터디 ID, 자료 제목, 자료 내용을 입력해 주세요.");
      return;
    }

    void runAction("스터디 게시글 자료가 생성되었습니다.", () =>
      createStudyPost(postStudyId.trim(), {
        title: postTitle.trim(),
        content: postContent.trim(),
        files: postFiles,
      })
    );
  };

  const handleUpdatePost = () => {
    if (!postStudyId.trim() || !postId.trim()) {
      setMessage("스터디 ID와 게시글 ID를 입력해 주세요.");
      return;
    }

    void runAction("스터디 게시글 자료가 수정되었습니다.", () =>
      updateStudyPost(postStudyId.trim(), postId.trim(), {
        title: postTitle.trim() || undefined,
        content: postContent.trim() || undefined,
      })
    );
  };

  const handleDeletePost = () => {
    if (!postStudyId.trim() || !postId.trim()) {
      setMessage("스터디 ID와 게시글 ID를 입력해 주세요.");
      return;
    }

    void runAction("스터디 게시글 자료가 삭제되었습니다.", () =>
      deleteStudyPost(postStudyId.trim(), postId.trim())
    );
  };

  const handleMemberStatus = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!memberStudyId.trim() || !memberUserId.trim()) {
      setMessage("스터디 ID와 유저 ID를 입력해 주세요.");
      return;
    }

    void runAction("스터디 멤버 상태가 처리되었습니다.", () =>
      updateStudyMemberStatus(memberStudyId.trim(), memberUserId.trim(), {
        status: memberStatus,
      })
    );
  };

  const handleKickMember = () => {
    if (!memberStudyId.trim() || !kickMemberId.trim()) {
      setMessage("스터디 ID와 멤버 ID를 입력해 주세요.");
      return;
    }

    void runAction("스터디 멤버가 강제 추방되었습니다.", () =>
      kickStudyMember(memberStudyId.trim(), kickMemberId.trim(), {
        reason: kickReason.trim() || undefined,
      })
    );
  };

  return (
    <S.Page>
      <S.Shell>
        <S.Header>
          <S.Eyebrow>스터디 관리자</S.Eyebrow>
          <S.Title>스터디 관리</S.Title>
          <S.Description>
            스터디 모집, 게시글 자료, 멤버 승인/거절과 관리자 강제 처리를 관리합니다.
          </S.Description>
        </S.Header>

        <S.Grid>
          <S.Card>
            <S.CardTitle>스터디 모집 생성</S.CardTitle>
            <S.CardText>
              <code>POST /api/studies</code>로 스터디 모집 정보를 등록합니다.
            </S.CardText>

            <S.Form onSubmit={handleCreateStudy}>
              <S.Field>
                <S.FieldLabel>스터디명</S.FieldLabel>
                <S.Input
                  value={studyTitle}
                  onChange={(event) => setStudyTitle(event.target.value)}
                  placeholder="예: React Study"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>내용</S.FieldLabel>
                <S.TextArea
                  value={studyContent}
                  onChange={(event) => setStudyContent(event.target.value)}
                  placeholder="스터디 소개와 모집 내용을 입력해 주세요."
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>최대 인원</S.FieldLabel>
                <S.Input
                  type="number"
                  min="1"
                  value={maxMembers}
                  onChange={(event) => setMaxMembers(event.target.value)}
                />
              </S.Field>
              <S.PrimaryButton type="submit" disabled={isSubmitting}>
                모집 생성
              </S.PrimaryButton>
            </S.Form>
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 모집 삭제 / 강제 종료</S.CardTitle>
            <S.CardText>
              일반 삭제와 관리자 강제 종료 요청을 같은 ID 입력값으로 처리합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>스터디 ID</S.FieldLabel>
              <S.Input
                value={studyId}
                onChange={(event) => setStudyId(event.target.value)}
                placeholder="예: 10"
              />
            </S.Field>
            <S.Field>
              <S.FieldLabel>강제 종료 사유</S.FieldLabel>
              <S.Input
                value={forceReason}
                onChange={(event) => setForceReason(event.target.value)}
                placeholder="선택 입력"
              />
            </S.Field>
            <S.ButtonRow>
              <S.DangerButton type="button" onClick={() => void handleDeleteStudy()}>
                모집 삭제
              </S.DangerButton>
              <S.DangerButton type="button" onClick={handleForceEndStudy}>
                강제 종료
              </S.DangerButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>임시 작성 스터디</S.CardTitle>
            <S.CardText>
              작성 페이지에서 화면 확인용으로 추가된 스터디입니다. ID를 눌러 삭제 입력값에
              넣을 수 있습니다.
            </S.CardText>

            <S.ButtonRow>
              <S.SecondaryButton type="button" onClick={refreshCreatedStudies}>
                목록 새로고침
              </S.SecondaryButton>
            </S.ButtonRow>

            {createdStudies.length ? (
              <S.ButtonRow>
                {createdStudies.map((study) => (
                  <S.SecondaryButton
                    key={study.id}
                    type="button"
                    onClick={() => setStudyId(String(study.id))}
                  >
                    {study.id}. {study.title}
                  </S.SecondaryButton>
                ))}
              </S.ButtonRow>
            ) : (
              <S.StatusText>임시 작성 스터디가 없습니다.</S.StatusText>
            )}
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 게시글 자료 생성</S.CardTitle>
            <S.CardText>
              <code>POST /api/studies/{`{studyId}`}/posts</code>에 multipart form-data로
              자료를 등록합니다.
            </S.CardText>

            <S.Form onSubmit={handleCreatePost}>
              <S.Field>
                <S.FieldLabel>스터디 ID</S.FieldLabel>
                <S.Input
                  value={postStudyId}
                  onChange={(event) => setPostStudyId(event.target.value)}
                  placeholder="예: 10"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>자료 제목</S.FieldLabel>
                <S.Input
                  value={postTitle}
                  onChange={(event) => setPostTitle(event.target.value)}
                  placeholder="자료 제목"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>자료 내용</S.FieldLabel>
                <S.TextArea
                  value={postContent}
                  onChange={(event) => setPostContent(event.target.value)}
                  placeholder="자료 내용"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>첨부 파일</S.FieldLabel>
                <S.Input type="file" multiple onChange={handleFilesChange} />
              </S.Field>
              <S.PrimaryButton type="submit" disabled={isSubmitting}>
                자료 생성
              </S.PrimaryButton>
            </S.Form>
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 게시글 자료 수정 / 삭제</S.CardTitle>
            <S.CardText>
              게시글 ID를 함께 입력해 자료 수정 또는 삭제 요청을 보냅니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>게시글 ID</S.FieldLabel>
              <S.Input
                value={postId}
                onChange={(event) => setPostId(event.target.value)}
                placeholder="예: 101"
              />
            </S.Field>
            <S.ButtonRow>
              <S.PrimaryButton type="button" onClick={handleUpdatePost}>
                자료 수정
              </S.PrimaryButton>
              <S.DangerButton type="button" onClick={handleDeletePost}>
                자료 삭제
              </S.DangerButton>
            </S.ButtonRow>
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 멤버 승인 / 거절</S.CardTitle>
            <S.CardText>
              참여 신청 유저를 승인 또는 거절 상태로 처리합니다.
            </S.CardText>

            <S.Form onSubmit={handleMemberStatus}>
              <S.Field>
                <S.FieldLabel>스터디 ID</S.FieldLabel>
                <S.Input
                  value={memberStudyId}
                  onChange={(event) => setMemberStudyId(event.target.value)}
                  placeholder="예: 10"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>유저 ID</S.FieldLabel>
                <S.Input
                  value={memberUserId}
                  onChange={(event) => setMemberUserId(event.target.value)}
                  placeholder="예: 25"
                />
              </S.Field>
              <S.Field>
                <S.FieldLabel>처리 상태</S.FieldLabel>
                <S.Select
                  value={memberStatus}
                  onChange={(event) =>
                    setMemberStatus(event.target.value as StudyMemberStatusPayload["status"])
                  }
                >
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                </S.Select>
              </S.Field>
              <S.PrimaryButton type="submit" disabled={isSubmitting}>
                상태 처리
              </S.PrimaryButton>
            </S.Form>
          </S.Card>

          <S.Card>
            <S.CardTitle>스터디 멤버 강제 추방</S.CardTitle>
            <S.CardText>
              관리자 권한으로 특정 스터디 멤버를 강제 추방합니다.
            </S.CardText>

            <S.Field>
              <S.FieldLabel>멤버 ID</S.FieldLabel>
              <S.Input
                value={kickMemberId}
                onChange={(event) => setKickMemberId(event.target.value)}
                placeholder="예: 33"
              />
            </S.Field>
            <S.Field>
              <S.FieldLabel>추방 사유</S.FieldLabel>
              <S.Input
                value={kickReason}
                onChange={(event) => setKickReason(event.target.value)}
                placeholder="선택 입력"
              />
            </S.Field>
            <S.DangerButton type="button" onClick={handleKickMember}>
              강제 추방
            </S.DangerButton>
          </S.Card>
        </S.Grid>

        <S.Card style={{ marginTop: 24 }}>
          <S.CardTitle>요청 결과</S.CardTitle>
          {message ? <S.StatusText>{message}</S.StatusText> : null}
          <S.CodeBlock>{toJsonText(response)}</S.CodeBlock>
        </S.Card>
      </S.Shell>
    </S.Page>
  );
}
