# case-checker.ps1
$errors = @()

# Get all .jsx files
$files = Get-ChildItem -Recurse -Filter *.jsx

foreach ($file in $files) {
    $content = Get-Content $file.FullName
    foreach ($line in $content) {
        if ($line -match 'from\s+"(.+?)"') {
            $importPath = $Matches[1]
            
            # Resolve relative path
            $fullPath = Join-Path $file.DirectoryName ($importPath -replace '/','\')
            
            # Check with or without .jsx extension
            $fullPath1 = $fullPath
            $fullPath2 = "$fullPath.jsx"
            
            if (-not (Test-Path $fullPath1) -and -not (Test-Path $fullPath2)) {
                $errors += "Mismatch in $($file.FullName): '$importPath' does not exist"
            }
        }
    }
}

if ($errors.Count -eq 0) {
    Write-Host "✅ All imports match filenames!"
} else {
    Write-Host "⚠️ Case or path mismatches found:"
    $errors | ForEach-Object { Write-Host $_ }
}
