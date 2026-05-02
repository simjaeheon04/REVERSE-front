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
  loginDisabled?: boolean;
  onLogoClick?: () => void;
  onLoginClick?: () => void;
}
