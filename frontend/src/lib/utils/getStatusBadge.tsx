import StatusBadge from "../../components/ui/StatusBadge";
import { badgeConfig } from "../../data/badgeConfig";

const getStatusBadge = (status: string, label: string) => {
  const config = badgeConfig[status as keyof typeof badgeConfig];

  if (!config) return null;

  return (
    <StatusBadge
      icon={config.icon}
      label={label}
      className={config.className}
    />
  );
};

export default getStatusBadge;
