export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed." });
  }

  const { name, email, phone, address, password, image } = req.body;

  if (!name || !email || !phone || !address || !password) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // تشفير الباسورد
  const bcrypt = await import("bcryptjs");
  const hashedPassword = bcrypt.hashSync(password, 10);

  // اتصال بقاعدة البيانات MySQL
  const mysql = await import("mysql2/promise");

  try {
    const connection = await mysql.createConnection({
      host: "sql108.infinityfree.com",
      user: "if0_39201647",
      password: "ma2006sh2006",
      database: "if0_39201647_speedorder_users",
    });

    await connection.execute(
      `INSERT INTO users (full_name, email, phone, address, password, image, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [name, email, phone, address, hashedPassword, image || ""]
    );

    await connection.end();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({ error: "Database error" });
  }
}
