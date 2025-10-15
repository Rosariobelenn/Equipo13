import { BADGE_COLOR_VARIANT } from "../../constants/badgeColorVariant";
import type {
  SectionHeaderActionButton,
  SectionHeaderBadge,
} from "../../types/common.types";

export const getBadgeClasses = (
  variant: SectionHeaderBadge["variant"] = "yellow"
) => {
  return BADGE_COLOR_VARIANT[variant];
};

export const getButtonClasses = (
  variant: SectionHeaderActionButton["variant"] = "primary"
) => {
  const BADGE_COLOR_VARIANT = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
  };
  return BADGE_COLOR_VARIANT[variant];
};
