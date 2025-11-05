export const generateInvoice = () => {
  const invoiceNumber = `INV${new Date().toISOString().slice(0, 10).replace(/-/g, "")}${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

  return invoiceNumber;
};
