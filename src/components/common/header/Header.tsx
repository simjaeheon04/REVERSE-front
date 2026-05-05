import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import Logo from "../Logo";
import LogoImage from "../../../assets/logos/Header_logo.png";
import BannerLogo from "../../../assets/logos/baner.png";
import type { HeaderProps } from "./Header.types";

export default function Header({
  menus,
  logo = "REVERSE",
  loginText = "LOGIN",
  loginDisabled = false,
  canAccessAdmin = false,
  onLogoClick,
  onLoginClick,
}: HeaderProps) {
  const navigate = useNavigate();
  const [hoveredMenuKey, setHoveredMenuKey] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const filteredMenus = menus
    .map((menu) => ({
      ...menu,
      sections: menu.sections
        ?.map((section) => ({
          ...section,
          items: section.items.filter(
            (item) => canAccessAdmin || !item.path?.startsWith("/admin")
          ),
        }))
        .filter((section) => section.items.length > 0),
    }))
    .filter((menu) => canAccessAdmin || !menu.path?.startsWith("/admin"));

  const handleNavigate = (path?: string) => {
    if (!path) {
      return;
    }

    navigate(path);
    setIsMegaMenuOpen(false);
    setHoveredMenuKey(null);

    const [, hash] = path.split("#");

    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Logo onClick={onLogoClick}>
          {logo && <Logo src={LogoImage} size={240} alt="logo" />}
        </S.Logo>

        <S.RightArea>
          <S.NavArea
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => {
              setIsMegaMenuOpen(false);
              setHoveredMenuKey(null);
            }}
          >
            <S.Nav>
              {filteredMenus.map((menu) => (
                <S.MenuItem
                  key={menu.key}
                  onMouseEnter={() => setHoveredMenuKey(menu.key)}
                >
                  <S.MenuButton
                    type="button"
                    $active={hoveredMenuKey === menu.key}
                    onClick={() => handleNavigate(menu.path)}
                  >
                    {menu.label}
                  </S.MenuButton>
                </S.MenuItem>
              ))}
            </S.Nav>

            {isMegaMenuOpen && (
              <S.MegaMenuWrap>
                <S.MegaMenuInner>
                  {filteredMenus.map((menu) => (
                    <S.Column key={menu.key}>
                      <S.ColumnTitle>{menu.label}</S.ColumnTitle>

                      {menu.sections?.map((section) => (
                        <S.Section key={`${menu.key}-${section.title}`}>
                          <S.SectionHeading>
                            <S.SectionIcon
                              src={BannerLogo}
                              alt=""
                              aria-hidden="true"
                            />
                            <S.SectionTitle>{section.title}</S.SectionTitle>
                          </S.SectionHeading>

                          {section.items.length > 0 && (
                            <S.SubItemList>
                              {section.items.map((item) => (
                                <S.SubItem key={item.label}>
                                  <S.SubItemButton
                                    type="button"
                                    disabled={!item.path}
                                    onClick={() => handleNavigate(item.path)}
                                  >
                                    {item.label}
                                  </S.SubItemButton>
                                </S.SubItem>
                              ))}
                            </S.SubItemList>
                          )}
                        </S.Section>
                      ))}
                    </S.Column>
                  ))}
                </S.MegaMenuInner>
              </S.MegaMenuWrap>
            )}
          </S.NavArea>

          <S.LoginButton
            type="button"
            onClick={onLoginClick}
            disabled={loginDisabled}
          >
            {loginText}
          </S.LoginButton>
        </S.RightArea>
      </S.Container>
    </S.Wrapper>
  );
}
