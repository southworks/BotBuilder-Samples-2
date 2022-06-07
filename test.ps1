function UpSearchFolder {
  param ([String] $path, [String] $file)

  while ($path -and !(Test-Path (Join-Path $path $file))) {
    $path = Split-Path $path -Parent
  }

  return $path
}

$paths = @("C:\repos\BotBuilder-Samples\samples\csharp_dotnetcore\02.echo-bot\Bots\EchoBot.cs" -split " ")
$rootFolder = "C:\repos\BotBuilder-Samples\samples"
$pkg = "appsettings.json"

$result = $paths | ForEach-Object { UpSearchFolder -path $_ -file $pkg } | Get-Unique | ForEach-Object {
  $folder = $_
  return @{ 
    name = $folder.Substring($folder.IndexOf($rootFolder) + $rootFolder.Length);
    folder = $folder;
  } 
}

"Generated matrix:"
ConvertTo-Json @($result)

$matrix = ConvertTo-Json -Compress @($result)

$matrix