import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import * as S from "./MyActivityManagePage.styles";

export type MyActivityItem = {
  id: number;
  title: string;
  meta?: string;
  editable?: boolean;
  detailPath?: string;
  editPath?: string;
};

type MyActivityManagePageProps = {
  title: string;
  description: string;
  summaryLabel: string;
  summaryIcon: string;
  sectionLabel: string;
  writeLabel: string;
  writePath: string;
  deleteTitle: string;
  deleteDescription: string;
  emptyText: string;
  items: MyActivityItem[];
};

export default function MyActivityManagePage({
  title,
  description,
  summaryLabel,
  summaryIcon,
  sectionLabel,
  writeLabel,
  writePath,
  deleteTitle,
  deleteDescription,
  emptyText,
  items,
}: MyActivityManagePageProps) {
  const navigate = useNavigate();
  const [list, setList] = useState(items);
  const [deleteTarget, setDeleteTarget] = useState<MyActivityItem | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) {
      return;
    }

    setList((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <>
      <S.Page>
        <S.Frame>
          <S.Hero>
            <S.HeroTitle>{title}</S.HeroTitle>
            <S.HeroText>{description}</S.HeroText>
          </S.Hero>

          <S.SummaryBar>
            <S.SummaryInfo>
              <S.SummaryIcon aria-hidden="true">{summaryIcon}</S.SummaryIcon>
              <div>
                <S.SummaryValue>{list.length}</S.SummaryValue>
                <S.SummaryLabel>{summaryLabel}</S.SummaryLabel>
              </div>
            </S.SummaryInfo>
            <S.SummaryAction>
              <S.ActionButton type="button" onClick={() => navigate(writePath)}>
                <span aria-hidden="true">↗</span>
                {writeLabel}
              </S.ActionButton>
            </S.SummaryAction>
          </S.SummaryBar>

          <S.SectionHeader>
            <span aria-hidden="true">⌄</span>
            <span>{sectionLabel}</span>
          </S.SectionHeader>

          {list.length ? (
            <S.List>
              {list.map((item) => (
                <S.ItemCard key={item.id}>
                  <S.ItemInfo>
                    <S.ItemTitle>{item.title}</S.ItemTitle>
                    {item.meta ? <S.ItemMeta>{item.meta}</S.ItemMeta> : null}
                  </S.ItemInfo>

                  <S.ItemActions>
                    {item.editable && item.editPath ? (
                      <S.SmallButton type="button" onClick={() => navigate(item.editPath ?? "")}>
                        수정
                      </S.SmallButton>
                    ) : null}
                    {item.editable ? (
                      <S.SmallButton type="button" onClick={() => setDeleteTarget(item)}>
                        삭제
                      </S.SmallButton>
                    ) : null}
                    {!item.editable && item.detailPath ? (
                      <S.ArrowButton type="button" onClick={() => navigate(item.detailPath ?? "")}>
                        ›
                      </S.ArrowButton>
                    ) : null}
                  </S.ItemActions>
                </S.ItemCard>
              ))}
            </S.List>
          ) : (
            <S.EmptyPanel>{emptyText}</S.EmptyPanel>
          )}
        </S.Frame>
      </S.Page>
      <Footer />

      {deleteTarget ? (
        <S.ModalOverlay>
          <S.ModalCard role="dialog" aria-modal="true">
            <S.ModalCloseButton type="button" onClick={() => setDeleteTarget(null)}>
              ×
            </S.ModalCloseButton>
            <S.ModalTitle>{deleteTitle}</S.ModalTitle>
            <S.ModalText>{deleteDescription}</S.ModalText>
            <S.ModalActions>
              <S.ModalSecondaryButton type="button" onClick={() => setDeleteTarget(null)}>
                취소
              </S.ModalSecondaryButton>
              <S.ModalPrimaryButton type="button" onClick={handleDelete}>
                확인
              </S.ModalPrimaryButton>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalOverlay>
      ) : null}
    </>
  );
}
