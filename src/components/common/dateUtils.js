export const formatDateLabel = (value) => {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const isValidDateValue = (value) => {
  if (!value) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return !Number.isNaN(date.getTime());
};

export const isDueDateValid = (issueDate, dueDate) => {
  if (!issueDate || !dueDate) return true;
  return dueDate >= issueDate;
};

export const todayIso = () => new Date().toISOString().slice(0, 10);
