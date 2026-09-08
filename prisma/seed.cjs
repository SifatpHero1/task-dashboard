const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // পাসওয়ার্ড এনক্রিপ্ট করা হচ্ছে
  const password = await bcrypt.hash("admin123", 10);
  
  // ডাটাবেসে Admin ইউজার সেভ করা হচ্ছে
  await prisma.user.upsert({
    where: { email: "admin@task.com" },
    update: {},
    create: { 
      email: "admin@task.com", 
      password: password, 
      role: "ADMIN" 
    },
  });
  console.log("✅ Admin user created successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());