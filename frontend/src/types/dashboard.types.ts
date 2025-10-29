type ButtonStyle = "primary" | "secondary";

export interface ActionCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonText: string;
  buttonStyle: ButtonStyle;
  navigateTo: string;
}

export type HelpItemProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  bgColor: string;
  title: string;
  subtitle: string;
};

export interface ActivityItemProps {
  color: string;
  title: string;
  timestamp: string;
}

