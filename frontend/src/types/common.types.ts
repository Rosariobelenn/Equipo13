import type { CreditApplication } from "./credit.types";
import type { RequestDetailsTabs } from "./request.types";

export interface ActionButtonProps {
  icon: React.ElementType;
  text: string;
  className: string;
  onClick?: () => void;
}

export interface SectionHeaderBadge {
  text: string;
  variant?: "yellow" | "gray";
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
  value?: string;
  applications?: CreditApplication[];
}

export interface CurrentStatusBannerProps {
  progress: number;
  status: string;
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

export interface OperatorProps {
  fullName: string;
  position: string;
  email: string;
  phoneNumber: string;
}

export interface OperatorItemProps {
  assignedOperator: OperatorProps;
}

export interface RequestsDataErrorProps {
  title: string;
  onRetry?: () => void;
}

export type StepItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export interface DigitalSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export interface ActionButtonWithModalProps {
  amount: number;
}
