export const WHATSAPP_NUMBER = '919XXXXXXXXX'; // Replace with actual number e.g. 919876543210

export function generateWhatsAppMessage(items, customer, totalPrice) {
  const itemLines = items
    .map((item, i) => {
      const lineTotal = (item.price * item.qty).toLocaleString('en-IN');
      return `${i + 1}. ${item.name} — ${item.selectedQuantity} × ${item.qty} = ₹${lineTotal}`;
    })
    .join('\n');

  return `Hi Pathu's Kitchen! 🙏

I would like to place an order:

${itemLines}

*Total Amount: ₹${totalPrice.toLocaleString('en-IN')}*

───────────────────
*Delivery Details:*
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
City: ${customer.city}
Pincode: ${customer.pincode}
───────────────────

Please confirm my order. Thank you! 😊`;
}

export function openWhatsApp(message, phone = WHATSAPP_NUMBER) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
