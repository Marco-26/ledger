import re
from io import BytesIO

import camelot

from constants import DATE_PATTERN_REGEX


def extract_table_from_pdf(file: bytes) -> list:
    pdf_stream = BytesIO(file)
    tables = camelot.read_pdf(
        pdf_stream, pages="all", flavor="stream", suppress_stdout=True
    )
    rows = []

    for table in tables:
        df = table.df

        for _, row in df.iterrows():
            if re.match(DATE_PATTERN_REGEX, str(row[0]).strip()):
                rows.append(row.tolist())

    return rows
