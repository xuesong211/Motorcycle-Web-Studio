from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent
CANDIDATES = (
    ROOT
    / "维修手册蒸馏库"
    / "books"
    / "official-motorcycle-service-manuals"
    / "candidates"
)

RULES = {
    "frameworks.md": ["id", "title", "type", "source_chapter", "source_quote", "summary", "tags"],
    "principles.md": ["id", "title", "type", "source_chapter", "source_quote", "summary", "tags"],
    "cases.md": ["id", "title", "type", "source_chapter", "source_quote", "summary", "bound_to", "outcome", "tags"],
    "counter-examples.md": [
        "id",
        "title",
        "type",
        "source_chapter",
        "source_quote",
        "failure_mode",
        "mechanism",
        "warning_signs",
        "bound_to",
        "tags",
    ],
    "glossary.md": [
        "id",
        "term",
        "type",
        "source_chapter",
        "author_definition",
        "key_distinction",
        "why_it_matters",
        "tags",
    ],
}


def blocks(text: str) -> list[str]:
    starts = [m.start() for m in re.finditer(r"(?m)^- id:\s*", text)]
    return [text[start : starts[i + 1] if i + 1 < len(starts) else len(text)] for i, start in enumerate(starts)]


def main() -> int:
    errors: list[str] = []
    total = 0
    for name, fields in RULES.items():
        path = CANDIDATES / name
        if not path.exists():
            print(f"PENDING {name}")
            continue
        text = path.read_text(encoding="utf-8")
        items = blocks(text)
        total += len(items)
        ids: list[str] = []
        for number, block in enumerate(items, start=1):
            match = re.search(r"(?m)^- id:\s*([^\s]+)", block)
            item_id = match.group(1) if match else f"#{number}"
            ids.append(item_id)
            for field in fields:
                if field == "id":
                    continue
                if not re.search(rf"(?m)^\s{{2}}{re.escape(field)}:\s*", block):
                    errors.append(f"{name}:{item_id} missing {field}")
            if "source_chapter" in fields and not re.search(r"PDF\s*第?\s*\d+\s*页", block, re.I):
                errors.append(f"{name}:{item_id} missing PDF page anchor")
        duplicates = sorted({item_id for item_id in ids if ids.count(item_id) > 1})
        if duplicates:
            errors.append(f"{name} duplicate ids: {', '.join(duplicates)}")
        print(f"OK {name}: {len(items)} candidates")

    print(f"TOTAL {total}")
    if errors:
        print("ERRORS")
        for error in errors:
            print(f"- {error}")
        return 1
    print("VALIDATION PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
