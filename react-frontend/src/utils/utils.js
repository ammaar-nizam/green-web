export const dateFormat = (dateInput) => {
    const date = new Date(dateInput);

  // Get day, month and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}