export const getProgressPercentage = (status: string): number => {
  const percentages: Record<string, number> = {
    pending_review: 0,
    under_review: 60,
    approved: 100,
    rejected: 100,
  };
  return percentages[status] || 0;
};
