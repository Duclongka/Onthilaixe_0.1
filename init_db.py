#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
File khởi tạo Cơ sở dữ liệu SQLite cho hệ thống sát hạch 600 câu hỏi lái xe.
Tương thích với Python 3 (sqlite3 tích hợp sẵn).
"""

import sqlite3
import json
import os

DB_FILENAME = "driving_exam.sqlite"

def init_database():
    print(f"[*] Đang khởi tạo cơ sở dữ liệu SQLite: {DB_FILENAME}...")
    conn = sqlite3.connect(DB_FILENAME)
    cursor = conn.cursor()

    # Tạo bảng questions theo đúng đặc tả yêu cầu
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY,
        chapter INTEGER NOT NULL,
        chapter_name TEXT NOT NULL,
        question_text TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_answer INTEGER NOT NULL,
        image_url TEXT,
        is_serious_violation INTEGER NOT NULL DEFAULT 0,
        explanation TEXT
    );
    """)

    # Tạo index tối ưu hóa truy vấn
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_chapter ON questions(chapter);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_serious ON questions(is_serious_violation);")

    conn.commit()
    print("[+] Bảng 'questions' đã được tạo thành công.")
    
    # Kiểm tra số lượng bản ghi hiện có
    cursor.execute("SELECT COUNT(*) FROM questions;")
    count = cursor.fetchone()[0]
    print(f"[i] Hiện có {count} câu hỏi trong cơ sở dữ liệu.")
    
    conn.close()
    return DB_FILENAME

if __name__ == "__main__":
    init_database()
