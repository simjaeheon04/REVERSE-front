import type { ReactNode } from "react";
import * as S from "./AuthShell.styles";
import Logo from "../../common/Logo";
import LogoImage from "../../../assets/logos/Logo_2.png";

type AuthShellProps = {
  title: string;
  children: ReactNode;
};

export default function AuthShell({ title, children }: AuthShellProps) {
  return (
    <S.Frame>
      <S.Inner>
        <S.TopArea>
          <Logo src={LogoImage} size={44} />
          <S.Title>{title}</S.Title>
        </S.TopArea>

        {children}
      </S.Inner>
    </S.Frame>
  );
}
