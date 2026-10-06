from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parent
SOURCE_ROOT = ROOT / "品牌官方公开资料"
PROJECT_ROOT = ROOT / "维修手册蒸馏库" / "books" / "official-motorcycle-service-manuals"
TEXT_ROOT = PROJECT_ROOT / "source_text"


def selected_pdfs() -> list[Path]:
    files: list[Path] = []
    files.extend((SOURCE_ROOT / "钱江_QJMOTOR" / "官方RMI维修手册").rglob("*.pdf"))
    for path in (SOURCE_ROOT / "凯越_KOVE").rglob("*.pdf"):
        if "维修资料" in str(path.parent):
            files.append(path)
    for path in (SOURCE_ROOT / "升仕_ZONTES").rglob("*.pdf"):
        if "维修手册" in str(path.parent) or "通用诊断资料" in str(path.parent):
            files.append(path)
    return sorted(set(files), key=lambda p: str(p).casefold())


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest().upper()


def safe_stem(path: Path) -> str:
    return re.sub(r'[<>:"/\\|?*]', "_", path.stem)


def extract_pdf(pdf: Path, text_path: Path) -> tuple[int, int, int]:
    reader = PdfReader(str(pdf), strict=False)
    parts: list[str] = []
    for page_number, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text(extraction_mode="layout") or ""
        except Exception:
            text = page.extract_text() or ""
        parts.append(f"\n\n===== PAGE {page_number} =====\n\n{text}")
    combined = "".join(parts).lstrip()
    text_path.write_text(combined, encoding="utf-8", newline="\n")
    return len(reader.pages), len(combined), combined.count("\n") + 1


def main() -> None:
    TEXT_ROOT.mkdir(parents=True, exist_ok=True)
    pdfs = selected_pdfs()
    manifest: list[dict[str, object]] = []

    for index, pdf in enumerate(pdfs, start=1):
        relative = pdf.relative_to(SOURCE_ROOT)
        brand = relative.parts[0]
        group = relative.parts[1]
        brand_out = TEXT_ROOT / brand
        brand_out.mkdir(parents=True, exist_ok=True)
        text_path = brand_out / f"{safe_stem(pdf)}.txt"

        if (
            not text_path.exists()
            or text_path.stat().st_mtime < pdf.stat().st_mtime
            or text_path.stat().st_size < 1000
        ):
            pages, chars, lines = extract_pdf(pdf, text_path)
        else:
            content = text_path.read_text(encoding="utf-8")
            pages = content.count("===== PAGE ")
            chars = len(content)
            lines = content.count("\n") + 1

        manifest.append(
            {
                "id": f"{index:02d}",
                "brand": brand,
                "group": group,
                "title": pdf.stem,
                "source_pdf": str(relative).replace("\\", "/"),
                "source_pdf_absolute": str(pdf),
                "source_sha256": sha256(pdf),
                "pages": pages,
                "pdf_bytes": pdf.stat().st_size,
                "extracted_text": str(text_path.relative_to(PROJECT_ROOT)).replace("\\", "/"),
                "text_chars": chars,
                "text_lines": lines,
            }
        )
        print(f"[{index}/{len(pdfs)}] {brand} / {pdf.name} -> {chars} chars", flush=True)

    manifest_path = TEXT_ROOT / "manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n"
    )
    catalog_lines = [
        "# 官方维修手册来源清单",
        "",
        "生成时间：2026-09-11  ",
        "用途：记录每份蒸馏原料的来源、页数、哈希与文本抽取状态。",
        "",
        "| ID | 品牌 | 分组 | 手册 | 页数 | 抽取字符 | 状态 |",
        "|---:|---|---|---|---:|---:|---|",
    ]
    for item in manifest:
        status = "视觉附件" if int(item["text_chars"]) < 1000 else "可全文检索"
        pdf_link = Path(str(item["source_pdf_absolute"])).as_posix()
        catalog_lines.append(
            f'| {item["id"]} | {item["brand"]} | {item["group"]} | '
            f'[{item["title"]}](<{pdf_link}>) | {item["pages"]} | '
            f'{item["text_chars"]:,} | {status} |'
        )
    catalog_lines.extend(
        [
            "",
            "## 校验说明",
            "",
            "- `manifest.json` 保存每份 PDF 的 SHA-256；源文件发生变化时可识别版本漂移。",
            "- 文本按 `===== PAGE N =====` 分页，可把蒸馏结论回指到 PDF 页码。",
            "- 纯文本不足 1,000 字符的辐条/电路类图纸标记为视觉附件，关键尺寸必须回看 PDF 图面。",
            "- 旋转表格或图中文字可能抽取不完整；扭矩、间隙、电路定义等高风险数据必须复核原 PDF。",
            "",
        ]
    )
    (PROJECT_ROOT / "SOURCE_CATALOG.md").write_text(
        "\n".join(catalog_lines), encoding="utf-8", newline="\n"
    )
    print(f"Extraction complete: {len(manifest)} files -> {manifest_path}", flush=True)


if __name__ == "__main__":
    main()
