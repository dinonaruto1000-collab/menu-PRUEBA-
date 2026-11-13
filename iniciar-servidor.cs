using System;
using System.Diagnostics;
using System.IO;
using System.Threading;

class Program
{
    static void Main()
    {
        Console.Title = "Delimenu Maison - Servidor de Desarrollo";

        // Obtener el directorio donde se encuentra este ejecutable
        string projectDir = AppDomain.CurrentDomain.BaseDirectory;
        Directory.SetCurrentDirectory(projectDir);

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("==================================================");
        Console.WriteLine("   DELIMENU MAISON - INICIANDO SERVIDOR LOCAL     ");
        Console.WriteLine("==================================================");
        Console.ResetColor();
        Console.WriteLine();
        Console.WriteLine("Directorio del proyecto: " + projectDir);
        Console.WriteLine("Iniciando 'pnpm dev' (o 'npm run dev')...");
        Console.WriteLine("Se abrira automaticamente el navegador en unos segundos.");
        Console.WriteLine();

        // Hilo en segundo plano para abrir el navegador tras 3.5 segundos
        Thread browserThread = new Thread(() =>
        {
            Thread.Sleep(3500);
            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = "http://localhost:3000",
                    UseShellExecute = true
                });
            }
            catch
            {
                // Si falla abrir el navegador, no interrumpir el servidor
            }
        });
        browserThread.IsBackground = true;
        browserThread.Start();

        // Lanzar el servidor en cmd
        try
        {
            ProcessStartInfo psi = new ProcessStartInfo
            {
                FileName = "cmd.exe",
                // Ejecuta pnpm dev, y si no existe pnpm prueba npm run dev
                Arguments = "/c \"where pnpm >nul 2>&1 && pnpm dev || npm run dev\"",
                WorkingDirectory = projectDir,
                UseShellExecute = false
            };

            using (Process process = Process.Start(psi))
            {
                process.WaitForExit();
            }
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine();
            Console.WriteLine("Error al ejecutar el servidor: " + ex.Message);
            Console.ResetColor();
            Console.WriteLine("Presiona cualquier tecla para salir...");
            Console.ReadKey();
        }
    }
}

