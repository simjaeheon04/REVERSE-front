import type { ReactNode } from "react";
import * as S from "./AuthShell.styles";
import Logo from "../../common/Logo";
import LogoImage from "../../../assets/logos/auth-log.png";

type AuthShellProps = {
  title: string;
  children: ReactNode;
};

export default function AuthShell({ title, children }: AuthShellProps) {
  const titleWidth = Math.max(title.length * 34, 120);

  return (
    <S.Frame>
      <S.Inner>
        <S.TopArea>
          <Logo src={LogoImage} size={64} />
          <S.Title
            role='img'
            aria-label={title}
            viewBox={`0 0 ${titleWidth} 32`}
            width={titleWidth}
            height='32'
          >
            <defs>
              <filter
                id='auth-title-inner-shadow'
                x='-50%'
                y='-50%'
                width='200%'
                height='200%'
                colorInterpolationFilters='sRGB'
              >
                <feFlood floodOpacity='0' result='background-fix' />
                <feBlend
                  in='SourceGraphic'
                  in2='background-fix'
                  mode='normal'
                  result='shape'
                />
                <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                  result='hard-alpha'
                />
                <feOffset dy='4' />
                <feGaussianBlur stdDeviation='4' />
                <feComposite
                  in2='hard-alpha'
                  operator='arithmetic'
                  k2='-1'
                  k3='1'
                />
                <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                />
                <feBlend in2='shape' mode='normal' result='effect1_innerShadow' />
              </filter>
            </defs>
            <text
              x='50%'
              y='50%'
              dominantBaseline='central'
              textAnchor='middle'
            >
              {title}
            </text>
          </S.Title>
        </S.TopArea>

        {children}
      </S.Inner>
    </S.Frame>
  );
}
