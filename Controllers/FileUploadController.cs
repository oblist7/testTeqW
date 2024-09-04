using Microsoft.AspNetCore.Mvc;

namespace repos.Controllers;

[ApiController]
[Route("[controller]")]
public class FileUploadController : ControllerBase
{
    private readonly ILogger<FileUploadController> _logger;

    public FileUploadController(ILogger<FileUploadController> logger)
    {
        _logger = logger;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> FileUpload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var filePath = Path.Combine("Uploads", file.FileName);

        // Убедитесь, что папка "Uploads" существует
        if (!Directory.Exists("Uploads"))
        {
            Directory.CreateDirectory("Uploads");
        }

        // Сохранение файла на диск
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new { FilePath = filePath });
    }
}
