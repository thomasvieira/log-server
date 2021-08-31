const { secret } = process.env;
const { expiresIn } = process.env;

const authConfig = { secret, expiresIn };

export default authConfig;
