import re
import camelot
from io import BytesIO
from constants import DATE_PATTERN_REGEX


def extract_table_from_pdf_file(file: bytes) -> list[list[str]]:
    pdf_stream = BytesIO(file)
    tables = camelot.read_pdf(
        pdf_stream, pages="all", flavor="stream", suppress_stdout=True
    )
    rows: list[list[str]] = []

    for table in tables:
        df = table.df

        for _, row in df.iterrows():
            if re.match(DATE_PATTERN_REGEX, str(row[0]).strip()):
                rows.append(row.tolist())

    return rows
