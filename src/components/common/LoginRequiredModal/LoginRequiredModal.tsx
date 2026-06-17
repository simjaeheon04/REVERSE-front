import * as S from "./LoginRequiredModal.styles";

type LoginRequiredModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
};

export default function LoginRequiredModal({
  isOpen,
  onConfirm,
  title = "로그인 후 이용해 주세요.",
  description = "로그인한 회원만 이용할 수 있습니다.",
  confirmText = "확인",
}: LoginRequiredModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <S.Overlay role="presentation">
      <S.Dialog role="dialog" aria-modal="true" aria-labelledby="login-required-title">
        <S.Title id="login-required-title">{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.ConfirmButton type="button" onClick={onConfirm}>
          {confirmText}
        </S.ConfirmButton>
      </S.Dialog>
    </S.Overlay>
  );
}
