export interface MegaMenuItem {
  label: string;
  path?: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

export interface HeaderMenuItem {
  label: string;
  key: string;
  sections?: MegaMenuSection[];
  path?: string;
}

export interface HeaderProps {
  menus: HeaderMenuItem[];
  logo?: string;
  loginText?: string;
  myPageText?: string;
  loginDisabled?: boolean;
  canAccessAdmin?: boolean;
  onLogoClick?: () => void;
  onMyPageClick?: () => void;
  onLoginClick?: () => void;
}
