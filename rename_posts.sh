#!/bin/bash
# rename_posts.sh
# Renames Jekyll post files based on the post_dates.csv mapping
#
# Usage:
#   chmod +x rename_posts.sh
#   ./rename_posts.sh
#
# This script:
# 1. Reads post_dates.csv
# 2. Renames files from 2025-12-14_slug.md to REAL-DATE-slug.md
# 3. Updates the date in front matter

POSTS_DIR="_posts"
CSV_FILE="post_dates.csv"

if [ ! -d "$POSTS_DIR" ]; then
    echo "Error: $POSTS_DIR directory not found!"
    exit 1
fi

if [ ! -f "$CSV_FILE" ]; then
    echo "Error: $CSV_FILE not found!"
    exit 1
fi

echo "======================================"
echo "NetJoints Post Date Fixer"
echo "======================================"
echo ""

count=0
skipped=0

# Read CSV file (skip comments and empty lines)
while IFS=',' read -r old_filename new_date source || [ -n "$old_filename" ]; do
    # Skip comments and empty lines
    [[ "$old_filename" =~ ^#.*$ ]] && continue
    [[ -z "$old_filename" ]] && continue
    
    # Check if file exists
    old_path="$POSTS_DIR/$old_filename"
    if [ ! -f "$old_path" ]; then
        echo "SKIP: $old_filename (not found)"
        ((skipped++))
        continue
    fi
    
    # Extract slug from old filename (remove date prefix)
    slug=$(echo "$old_filename" | sed 's/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}[_-]//' | sed 's/\.md$//')
    
    # Create new filename
    new_filename="${new_date}-${slug}.md"
    new_path="$POSTS_DIR/$new_filename"
    
    # Skip if same name
    if [ "$old_filename" == "$new_filename" ]; then
        echo "SAME: $old_filename"
        continue
    fi
    
    # Update front matter date
    if grep -q "^date:" "$old_path"; then
        # Replace existing date
        sed -i "s/^date:.*$/date: $new_date/" "$old_path"
    elif grep -q "^---" "$old_path"; then
        # Add date after first ---
        sed -i "0,/^---$/s/^---$/---\ndate: $new_date/" "$old_path"
    fi
    
    # Rename file
    mv "$old_path" "$new_path"
    echo "RENAMED: $old_filename -> $new_filename [$source]"
    ((count++))
    
done < "$CSV_FILE"

echo ""
echo "======================================"
echo "Summary:"
echo "  Renamed: $count files"
echo "  Skipped: $skipped files"
echo "======================================"
