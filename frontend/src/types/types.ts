export interface ActionButtonProps {
  icon: React.ElementType;
  text: string;
  className: string;
}

export interface SectionHeaderProps {
  pathLink: string;
  pathText: string;
  title: string;
  description: string;
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
