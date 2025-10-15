import type { RequestDetailsTabs } from "./request.types";

export interface ActionButtonProps {
  icon: React.ElementType;
  text: string;
  className: string;
}

export interface SectionHeaderBadge {
  text: string;
  variant?: "yellow" | "green" | "blue" | "red" | "gray";
}

export interface SectionHeaderActionButton {
  text: string;
  icon?: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}

export interface SectionHeaderProps {
  backLink: {
    path: string;
    text: string;
  };
  title: string;
  subtitle?: string;
  description?: string;
  badge?: SectionHeaderBadge;
  actionButton?: SectionHeaderActionButton;
}

export interface StatusBadgeProps {
  icon: React.ElementType;
  label: string;
  className: string;
}

export interface StatusCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  bgColor: string;
  label: string;
  value: string;
}

export interface CurrentStatusBannerProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface Tab {
  id: RequestDetailsTabs;
  label: string;
}

export interface TabsNavigationProps {
  activeTab: RequestDetailsTabs;
  onTabChange: (tab: RequestDetailsTabs) => void;
  tabs: Tab[];
}
