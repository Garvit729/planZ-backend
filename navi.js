import bcrypt from 'bcrypt';
async function hashPassword() {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash('hero7217', salt);
  console.log(passwordHash);
}
hashPassword();