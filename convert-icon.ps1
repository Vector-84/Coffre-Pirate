Add-Type -AssemblyName System.Drawing

$inputPath = Join-Path $PSScriptRoot 'images.jfif'
$outputPath = Join-Path $PSScriptRoot 'icon.png'

if (-Not (Test-Path $inputPath)) {
    Write-Error "Le fichier 'images.jfif' est introuvable."
    exit 1
}

try {
    $image = [System.Drawing.Image]::FromFile($inputPath)
    $image.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $image.Dispose()
    Write-Host '✅ images.jfif converti en icon.png'
} catch {
    Write-Error "Erreur lors de la conversion : $_"
    exit 1
}
