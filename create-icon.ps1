Add-Type -AssemblyName System.Drawing

$bitmap = New-Object System.Drawing.Bitmap 192, 192
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.Clear([System.Drawing.Color]::FromArgb(139, 69, 19))

$goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(184, 134, 11))
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$blackBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
$blackPen = New-Object System.Drawing.Pen([System.Drawing.Color]::Black, 3)
$yellowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 215, 0))

# Coffre
$graphics.FillRectangle($goldBrush, 40, 80, 112, 60)
$graphics.DrawRectangle($blackPen, 40, 80, 112, 60)

# Couvercle du coffre
$graphics.FillEllipse($goldBrush, 40, 60, 112, 40)
$graphics.DrawEllipse($blackPen, 40, 60, 112, 40)

# Crâne
$graphics.FillEllipse($whiteBrush, 78, 30, 36, 36)
$graphics.DrawEllipse($blackPen, 78, 30, 36, 36)

# Yeux
$graphics.FillEllipse($blackBrush, 83, 38, 6, 6)
$graphics.FillEllipse($blackBrush, 103, 38, 6, 6)

# Pièces d'or
$graphics.FillEllipse($yellowBrush, 50, 150, 20, 20)
$graphics.FillEllipse($yellowBrush, 86, 155, 20, 20)
$graphics.FillEllipse($yellowBrush, 122, 150, 20, 20)

$bitmap.Save('icon.png', [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
Write-Host '✅ Icon PNG 192x192 créée!'
