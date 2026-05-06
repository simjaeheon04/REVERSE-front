import * as S from "./Footer.styles";
import footerLogo from "../../../assets/logos/Logo_5.png";

const footerMenus = ["About Us", "활동 및 참여", "정보 및 교류", "게시판"];

const footerPolicies = [
  "Privacy Policy",
  "Terms of Service",
  "Cookies Settings",
];

export default function Footer() {
  return (
    <S.Footer>
      <S.Inner>
        <S.TopRow>
          <S.TopSpacer />

          <S.Nav>
            {footerMenus.map((menu) => (
              <S.NavButton key={menu} type='button'>
                {menu}
              </S.NavButton>
            ))}
          </S.Nav>

          <S.IconButton
            type='button'
            aria-label='Instagram'
            onClick={() =>
              window.open("https://www.instagram.com/nsu_reverse/", "_blank")
            }
          >
            <S.InstagramIcon viewBox='0 0 24 24' fill='none'>
              <rect
                x='5.25'
                y='5.25'
                width='13.5'
                height='13.5'
                rx='3.75'
                stroke='currentColor'
                strokeWidth='1.5'
              />
              <circle
                cx='12'
                cy='12'
                r='3.2'
                stroke='currentColor'
                strokeWidth='1.5'
              />
              <circle cx='16.5' cy='7.5' r='1' fill='currentColor' />
            </S.InstagramIcon>
          </S.IconButton>
        </S.TopRow>

        <S.BottomBlock>
          <S.BrandRow>
            <S.LogoButton type='button' aria-label='REVERSE home'>
              <S.LogoImage src={footerLogo} alt='REVERSE logo' />
            </S.LogoButton>

            <S.Divider />
          </S.BrandRow>

          <S.BottomRow>
            <S.CopyText>© 2024 Relume. All rights reserved.</S.CopyText>

            <S.PolicyList>
              {footerPolicies.map((item) => (
                <S.PolicyButton key={item} type='button'>
                  {item}
                </S.PolicyButton>
              ))}
            </S.PolicyList>
          </S.BottomRow>
        </S.BottomBlock>
      </S.Inner>
    </S.Footer>
  );
}
