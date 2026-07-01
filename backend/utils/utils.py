import re


def clean_transaction(text):
    text = text.upper()

    # Remove long numbers
    text = re.sub(r"\d{5,}", "", text)

    # Remove card metadata
    text = re.sub(
        r"\b(CARD|VISA|MASTERCARD|DEBIT|CREDIT|POS|REF)\b\s*[:\-]?\s*\w*", "", text
    )

    # Remove card masks
    text = re.sub(r"\*{2,}\d{2,4}", "", text)

    # Remove common banking prefixes
    text = re.sub(r"^(COMPRA|PAGAMENTO|TRANSFERENCIA|TRANSFERÊNCIA)\s+", "", text)

    # Remove trailing bank codes
    text = re.sub(r"\s+(PAYM|CL|RE|MB|ATM|TPA)\b", "", text)

    # Remove trailing "/xx"
    text = re.sub(r"\s*/\d+$", "", text)

    # Normalize spaces
    text = re.sub(r"\s+", " ", text).strip()

    # Convert back to title case
    return text.title()
