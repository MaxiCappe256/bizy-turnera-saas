import * as bcrypt from 'bcrypt'

export async function generarHash() {
  const nuevaPassword = "";
  const saltRounds = 10;
  const hashedPW = await bcrypt.hash(nuevaPassword, saltRounds);
  console.log("Tu nuevo hash es:", hashedPW);
}
