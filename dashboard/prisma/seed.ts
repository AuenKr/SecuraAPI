import prisma from "./../src/db";
import * as bcrypt from 'bcrypt';

async function seedGuestUser() {
  const user = {
    name: "Guest",
    email: "guest@user.com",
    password: "123456789"
  }
  const hashedPass = await bcrypt.hash(user.password, 10);
  const result = await prisma.user.upsert({
    where: {
      email: user.email
    },
    update: {
      name: user.name,
      password: hashedPass
    },
    create: {
      email: user.email,
      name: user.name,
      password: hashedPass
    }
  })
  return result;
}


async function main() {
  await seedGuestUser();
}

main().then((data) => {
  console.log("data seed completed")
  console.log(data);
})