import fs from "fs";
import path from "path";

export async function GET() {
  const avatarsDirectory = path.join(process.cwd(), "public/images/avatars");
  const files = fs.readdirSync(avatarsDirectory);

  // Filtrando apenas arquivos .svg
  const avatars = files.filter((file) => file.endsWith(".svg"));

  return new Response(JSON.stringify(avatars), {
    headers: { "Content-Type": "application/json" },
  });
}
